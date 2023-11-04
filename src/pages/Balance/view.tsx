import React, { Dispatch, SetStateAction } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { Balance } from 'features/balance/types';
import BalancesList from 'features/balance/components/BalancesList';
import BalanceForm from 'features/balance/components/BalanceForm';

type BalancePageViewProps = {
  t: (text: string) => string;
  hasBalances: boolean;
};

const BalancePageView: React.FC<BalancePageViewProps> = ({
  t,
  hasBalances,
}) => (
  <Container className="py-4">
    <p className="fs-4 fw-bold text-center py-2">
      {t(hasBalances ? 'all your balances' : 'your balances will be here')}
    </p>
    <BalancesList withMenu />
    <Row>
      <Col xs="12" lg="6" className="mb-3 mb-lg-0 mx-auto">
        <p className="fs-5 fw-bold text-center">{t('add new balance')}:</p>
        <BalanceForm buttonText="create" />
      </Col>
    </Row>
  </Container>
);

export default BalancePageView;
