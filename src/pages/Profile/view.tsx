import React from 'react';
import { Container } from 'react-bootstrap';

import UserInfo from 'components/Profile/UserInfo';
import Transactions from 'components/Profile/Transactions';

import './styles.scss';

const Profile = () => (
    <Container className="py-4">
      <UserInfo />
      <Transactions />
    </Container>
  );

export default Profile;
