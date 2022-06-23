import React, { FC } from 'react';
import { Row } from 'react-bootstrap';

import Balance from 'components/Profile/Balance';
import GeneralStatistic from 'components/Profile/GeneralStatistic';

const UserInfo: FC = () => (
  <Row>
    <Balance />
    <GeneralStatistic />
  </Row>
);

export default UserInfo;
