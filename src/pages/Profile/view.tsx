import React from 'react';
import { Container } from 'react-bootstrap';

import Transactions from 'components/Profile/Transactions';
import BalancesList from 'components/Balances/BalancesList';

import './styles.scss';

type propsType = {
  numberOfBalances: number;
  t: (text: string) => string;
};

const Profile: React.FC<propsType> = ({ numberOfBalances, t }) => (
  <Container className="py-4 mb-4 mb-sm-0">
    {Boolean(numberOfBalances) && (
      <p className="fs-4 fw-bold text-center py-2">{t('all your balances')}</p>
    )}
    <BalancesList />
    <Transactions />
  </Container>
);

export default Profile;
