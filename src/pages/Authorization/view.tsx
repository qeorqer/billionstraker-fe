import React, { Dispatch, SetStateAction } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import LoginForm from 'components/LogInForm';
import SignUpForm from 'components/SignUpForm';
import logo from 'assets/common/logo.png';
import LanguageSwitcher from 'components/LanguageSwitcher';

import './styles.scss';

type propsType = {
  t: (text: string) => string;
  showSignIn: boolean;
  setShowSignIn: Dispatch<SetStateAction<boolean>>;
};

const Authorization: React.FC<propsType> = ({
  t,
  setShowSignIn,
  showSignIn,
}) => (
  <section className="signUp align-items-md-center d-flex">
    <Container>
      <Row className="h-100">
        <Col xs="12" sm="6" className="text-center mt-5 mt-sm-0">
          <img src={logo} alt="logo" />
          <h1 className="yellowText">Billionstracker</h1>
          <p>{t('Powerful app for controlling your budget')}</p>
        </Col>
        <Col xs="12" sm="6" className="authFormContainer mt-sm-3">
          {showSignIn ? (
            <>
              <h2>{t('Sign in')}</h2>
              <LoginForm />
              <p
                onClick={() => setShowSignIn(false)}
                className="my-2 cursor-pointer">
                {t('New to billionstracker')}? <span>{t('Sign up')}</span>
              </p>
            </>
          ) : (
            <>
              <h2>{t('Sign up')}</h2>
              <SignUpForm />
              <p
                onClick={() => setShowSignIn(true)}
                className="my-2 cursor-pointer">
                {t('Already on billionstracker')}? <span>{t('Sign in')}</span>
              </p>
            </>
          )}
          <p>
            <NavLink to="/about" className="fw-bold fs-6">
              {t('what is this')}
            </NavLink>
          </p>
          <div
            className="d-flex justify-content-around languagesController pb-3"
            style={{ width: '100px', margin: '0 auto' }}>
            <LanguageSwitcher />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Authorization;
