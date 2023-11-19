import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';

import logo from 'assets/common/logo.png';
import { useAppDispatch } from 'store/hooks';
import LanguageSwitcher from 'components/Shared/LanguageSwitcher';
import CustomToggle from 'components/Shared/CustomToggle';
import { logOutThunk } from 'features/user';
import { UseInstallPWA } from 'features/PWA/hooks/useInstallPWA';

import './styles.scss';
import { tabMenuItems } from './constants';

type DropdownMenuItem = {
  title: string;
  onClick: () => void;
  isShown: boolean;
};

const Header = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const { supportsPWA, installPWA } = UseInstallPWA();

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(logOutThunk({ refreshToken }));
    history.push('/authorization');
  };

  const dropdownMenuItems: DropdownMenuItem[] = [
    {
      title: 'balances',
      onClick: () => history.push('/balance'),
      isShown: true,
    },
    {
      title: 'categories',
      onClick: () => history.push('/category'),
      isShown: true,
    },
    {
      title: 'usage guide',
      onClick: () => history.push('/guide', '_blank'),
      isShown: true,
    },
    {
      title: 'Support',
      onClick: () => window.open('https://t.me/qeorqe', '_blank'),
      isShown: true,
    },
    {
      title: 'install PWA',
      onClick: installPWA,
      isShown: supportsPWA,
    },
    {
      title: 'Log out',
      onClick: handleLogout,
      isShown: true,
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
              <Dropdown.Toggle as={CustomToggle} />
              <Dropdown.Menu variant="dark">
                <Dropdown.Item
                  as="span"
                  className="d-flex justify-content-around languagesController">
                  <LanguageSwitcher />
                </Dropdown.Item>
                {dropdownMenuItems
                  .filter(({ isShown }) => isShown)
                  .map(({ title, onClick }) => (
                    <Dropdown.Item as="span" key={title} onClick={onClick}>
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
