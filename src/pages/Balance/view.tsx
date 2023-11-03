import React, { Dispatch, SetStateAction } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { Balance } from 'features/balance/types';
import BalancesList from 'features/balance/components/BalancesList';
import BalanceForm from 'features/balance/components/BalanceForm';

type BalancePageViewProps = {
  t: (text: string) => string;
  balances: Balance[];
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  amount: string | number;
  handleChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddBalance: () => void;
};

const BalancePageView: React.FC<BalancePageViewProps> = ({
  t,
  balances,
  name,
  setName,
  amount,
  handleChangeAmount,
  handleAddBalance,
}) => (
  <Container className="py-4">
    <p className="fs-4 fw-bold text-center py-2">
      {t(!balances.length ? 'all your balances' : 'your balances will be here')}
    </p>
    <BalancesList withMenu />
    <Row className="text-center">
      <Col xs="12" lg="6" className="mb-3 mb-lg-0 mx-auto">
        <p className="fs-5 fw-bold">{t('add new balance')}:</p>
        <BalanceForm
          name={name}
          setName={setName}
          amount={amount}
          handleChangeAmount={handleChangeAmount}
          handleSubmit={handleAddBalance}
          buttonText="create"
        />
      </Col>
    </Row>
  </Container>
);

export default BalancePageView;
