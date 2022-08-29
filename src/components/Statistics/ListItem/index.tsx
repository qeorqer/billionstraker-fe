import React, { FC } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { formattingNumber } from 'utils/formattingNumber';
import { listForRangeItem } from 'components/Statistics/List';

type propsType = {
  listItem: listForRangeItem;
};

const ListItem: FC<propsType> = ({ listItem }) => {
  return (
    <Card
      className="mb-3 mx-auto fw-bold text-center"
      bg="light"
      text="dark"
    >
      <Card.Body>
        <Row>
          <Col xs="4" sm="4" className="mb-2 mb-sm-0">
            {listItem.title}
          </Col>
          <Col xs="4" sm="4">
            {formattingNumber(listItem.value)}
          </Col>
          <Col xs="4" sm="4">
            {listItem.percentage}%
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ListItem;
