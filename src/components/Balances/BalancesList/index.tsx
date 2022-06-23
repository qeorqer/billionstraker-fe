import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { balanceType } from 'types/balance.type';

type propTypes = {
  balances: balanceType[];
};

const BalancesList: React.FC<propTypes> = ({ balances }) => {
  const { t } = useTranslation();

  if (!balances.length) {
    return null;
  }

  return (
    <Row className="mb-3  justify-content-center d-flex">
      {balances.map((balance) => (
        <Col xs={12} lg={3} md={4} sm={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>{balance.name}</Card.Title>
              <Card.Text>{`${t('balance')}: ${balance.amount}`}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BalancesList;
