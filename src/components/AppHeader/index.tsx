import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';

import logo from 'assets/common/logo.png';
import { ReactComponent as Profile } from 'assets/tabMenu/profile.svg';
import { ReactComponent as Transactions } from 'assets/tabMenu/transactions.svg';
import { ReactComponent as Statistics } from 'assets/tabMenu/statistics.svg';
import { useAppDispatch } from 'hooks/react-redux.hook';
import { logOut } from 'store/reducers/user.reducer';
import LanguageSwitcher from 'components/LanguageSwitcher';
import CustomToggle from 'components/CustomToggle';

import './styles.scss';

const AppHeader = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logOut());
    history.push('/authorization');
  };

  return (
    <header>
      <Container>
        <Row>
          <Col md="3" xs="6" className="logo">
            <Link to="/">
              <img src={logo} alt="app logo" />
              Billionstracker
            </Link>
          </Col>
          <Col md="6" xs="12" className="menu order-1 order-md-0">
            <ul className="m-0 p-0">
              <li>
                <NavLink to="/home">
                  <Profile />
                  {t('Profile')}
                </NavLink>
              </li>
              <li>
                <NavLink to="/createTransaction">
                  <Transactions />
                  {t('New transaction')}
                </NavLink>
              </li>
              <li>
                <NavLink to="/statistics">
                  <Statistics />
                  {t('Statistics')}
                </NavLink>
              </li>
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
                  className="d-flex justify-content-around languagesController"
                >
                  <LanguageSwitcher />
                </Dropdown.Item>
                <Dropdown.Item
                  as="span"
                  onClick={() => history.push('/balance')}
                >
                  {t('balance')}
                </Dropdown.Item>
                <Dropdown.Item
                  as="span"
                  onClick={() => history.push('/categories')}
                >
                  {t('categories')}
                </Dropdown.Item>
                <Dropdown.Item as="span" onClick={() => history.push('/guide')}>
                  {t('usage guide')}
                </Dropdown.Item>
                <Dropdown.Item href="https://t.me/qeorqe" target="_blank">
                  {t('Support')}{' '}
                </Dropdown.Item>
                <Dropdown.Item as="span" onClick={handleLogout}>
                  {t('Log out')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default AppHeader;
