import React, { Dispatch, SetStateAction } from 'react';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';

import { balanceType } from 'types/balance.type';
import BalancesList from 'components/Balances/BalancesList';

type propsType = {
  t: (text: string) => string;
  balances: balanceType[];
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  amount: string | number;
  handleChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddBalance: () => void;
};

const Balances: React.FC<propsType> = ({
  t,
  balances,
  name,
  setName,
  amount,
  handleChangeAmount,
  handleAddBalance,
}) => (
  <>
    <Container className="py-4">
      <p className="fs-4 fw-bold text-center py-2">
        {t(
          balances.length ? 'all your balances' : 'your balances will be here',
        )}
      </p>
      <BalancesList />
      <Row className="text-center">
        <Col xs="12" lg="6" className="mb-3 mb-lg-0 mx-auto">
          <p className="fs-5 fw-bold">{t('add new balance')}:</p>
          <FormControl
            type="text"
            placeholder={t('name the balance')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3"
          />
          <FormControl
            type="number"
            placeholder={t('set amount')}
            value={amount}
            onChange={handleChangeAmount}
            className="mb-3"
          />
          <Button
            variant="warning"
            className="w300Px text-white"
            onClick={handleAddBalance}
          >
            {t('create')}
          </Button>
        </Col>
      </Row>
    </Container>
  </>
);

export default Balances;
