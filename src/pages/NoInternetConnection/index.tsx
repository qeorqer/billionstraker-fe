import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';

import logo from 'assets/common/logo.png';

import './styles.scss';

const NoInternetConnectionPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="vh-100">
      <Row className="h-100">
        <Col xs={12} className="no-internet">
          <Stack
            gap={3}
            className="justify-content-center align-items-center h-100">
            <img src={logo} alt="app logo" />
            <p className="fs-5 fw-bold mb-0 text-center">
              {t('No internet connection')}
            </p>
            <Button variant="outline-warning" onClick={() => {}}>
              {t('Try again')}
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default NoInternetConnectionPage;
