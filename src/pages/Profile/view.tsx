import React from 'react';
import { Container } from 'react-bootstrap';

import Transactions from 'components/Profile/Transactions';
import BalancesList from 'components/Balances/BalancesList';

import './styles.scss';
import { balanceType } from 'types/balance.type';

type propsTypes = {
  balances: balanceType[];
  t: (text: string) => string;
}

const Profile: React.FC<propsTypes> = ({ balances, t }) => (
  <Container className='py-4'>
    {balances.length && (
      <p
        className='fs-4 fw-bold text-center py-2'
      >
        {t('all your balances')}
      </p>
    )}
    <BalancesList />
    <Transactions />
  </Container>
);

export default Profile;
