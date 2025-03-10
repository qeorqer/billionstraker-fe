import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import logo from 'assets/common/logo.png';
import LanguageSwitcher from 'components/Shared/LanguageSwitcher';

import './styles.scss';
import AuthForm from 'features/authorization/components/AuthForm/authForm';

type propsType = {
  t: (text: string) => string;
};

const AuthorizationPageView: React.FC<propsType> = ({ t }) => (
  <section className="signUp align-items-md-center d-flex">
    <Container>
      <Row className="h-100">
        <Col xs="12" sm="6" className="text-center mt-5 mt-sm-0">
          <img src={logo} alt="logo" />
          <h1 className="yellowText">Billionstracker</h1>
          <p>{t('Powerful app for controlling your budget')}</p>
        </Col>
        <Col xs="12" sm="6" className="authFormContainer mt-sm-3">
          <AuthForm />
          <p>
            <NavLink to="/about" className="fw-bold fs-6">
              {t('what is this')}
            </NavLink>
          </p>
          <div
            className="d-flex justify-content-around languagesController pb-3"
            style={{ width: '100px', margin: '0 auto' }}
          >
            <LanguageSwitcher />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default AuthorizationPageView;
