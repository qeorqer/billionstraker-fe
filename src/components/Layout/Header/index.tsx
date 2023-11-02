import React, { FC } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';

import logo from 'assets/common/logo.png';
import { ReactComponent as Profile } from 'assets/tabMenu/profile.svg';
import { ReactComponent as Transactions } from 'assets/tabMenu/transactions.svg';
import { ReactComponent as Statistics } from 'assets/tabMenu/statistics.svg';
import { useAppDispatch } from 'store/hooks';
import LanguageSwitcher from 'components/Shared/LanguageSwitcher';
import CustomToggle from 'components/Shared/CustomToggle';
import { logOutThunk } from 'features/user';

import './styles.scss';

type DropdownMenuItem = {
  title: string;
  actions: {
    onClick?: () => void;
    href?: string;
    target?: string;
  };
};

type TabMenuItem = {
  title: string;
  link: string;
  Component: FC;
};

const tabMenuItems: TabMenuItem[] = [
  {
    title: 'Profile',
    Component: Profile,
    link: '/home',
  },
  {
    title: 'New transaction',
    Component: Transactions,
    link: '/createTransaction',
  },
  {
    title: 'Statistics',
    Component: Statistics,
    link: '/statistics',
  },
];

const Header = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(logOutThunk({ refreshToken }));
    history.push('/authorization');
  };

  const dropdownMenuItems: DropdownMenuItem[] = [
    {
      title: 'balances',
      actions: {
        onClick: () => history.push('/balance'),
      },
    },
    {
      title: 'categories',
      actions: {
        onClick: () => history.push('/categories'),
      },
    },
    {
      title: 'usage guide',
      actions: {
        onClick: () => history.push('/guide'),
      },
    },
    {
      title: 'Support',
      actions: {
        href: 'https://t.me/qeorqe',
        target: '_blank',
      },
    },
    {
      title: 'Log out',
      actions: {
        onClick: handleLogout,
      },
    },
  ];

  return (
    <header>
      <Container>
        <Row className="align-items-center">
          <Col md="3" xs="6" className="logo">
            <Link to="/">
              <img src={logo} alt="app logo" />
              Billionstracker
            </Link>
          </Col>
          <Col md="6" xs="12" className="menu order-1 order-md-0">
            <ul className="m-0 p-0">
              {tabMenuItems.map(({ title, Component, link }) => (
                <li key={title}>
                  <NavLink to={link}>
                    <Component />
                    {t(title)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Col>
          <Col md="3" xs="6">
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              />
              <Dropdown.Menu variant="dark">
                <Dropdown.Item
                  as="span"
                  className="d-flex justify-content-around languagesController">
                  <LanguageSwitcher />
                </Dropdown.Item>
                {dropdownMenuItems.map(({ title, actions }) => (
                  <Dropdown.Item as="span" key={title} {...actions}>
                    {t(title)}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
