import React, { FC } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { formattingNumber } from 'utils/formattingNumber';
import { listForRangeItem } from 'components/Statistics/List';

import './styles.scss';

type propsType = {
  listItem: listForRangeItem;
};

const ListItem: FC<propsType> = ({ listItem }) => {
  return (
    <Card
      className="mb-3 mx-auto text-center statisticsListItem"
      bg="light"
      text="dark"
    >
      <Card.Body>
        <Row>
          <Col xs="6" lg="3">
            {formattingNumber(listItem.value)}
          </Col>
          <Col xs="12" lg="6" className="mb-2 mb-sm-0 title">
            {listItem.title}
          </Col>
          <Col xs="6" lg="3">
            {listItem.percentage}%
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ListItem;
