import React, { FC, useEffect } from 'react'
import { Row } from 'react-bootstrap';
import Balance from "./Balance";
import GeneralStatistic from "./GeneralStatistic";

const UserInfo: FC = () => (
    <Row>
      <Balance/>
      <GeneralStatistic/>
    </Row>
  )

export default UserInfo