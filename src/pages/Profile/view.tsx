import React from 'react';
import { Container } from 'react-bootstrap';

import Transactions from 'components/Profile/Transactions';
import BalancesList from 'components/Balances/BalancesList';

import './styles.scss';

const Profile = () => (
    <Container className="py-4">
      <BalancesList />
      <Transactions />
    </Container>
  );

export default Profile;
