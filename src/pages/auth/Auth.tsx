import React, { useState } from 'react';
import SignUpForm from '../../components/auth/Signnup';
import LoginForm from '../../components/auth/Login';

import logo from '../../images/logo.png';
import './auth.scss';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Form } from 'formik';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/header/LanguageSwitcher';

const Auth = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(true);
  const { t } = useTranslation();

  return (
    <section className="signUp align-items-md-center d-flex">
      <Container>
        <Row className="h-100">
          <Col xs="12" sm="6" className="text-center">
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
                  className="my-2 cursor-pointer"
                >
                  {t('New to billionstracker')}? <span>{t('Sign up')}</span>
                </p>
              </>
            ) : (
              <>
                <h2>{t('Sign up')}</h2>
                <SignUpForm />
                <p
                  onClick={() => setShowSignIn(true)}
                  className="my-2 cursor-pointer"
                >
                  {t('Already on billionstracker')}? <span>{t('Sign in')}</span>
                </p>
              </>
            )}
            <div
              className="d-flex justify-content-around languagesController pb-3"
              style={{ width: '100px', margin: '0 auto' }}
            >
              <LanguageSwitcher />
            </div>
          </Col>
        </Row>
      </Container>
      {/*<div className='col m6 s12 center-align'>*/}
    </section>
  );
};

export default Auth;
