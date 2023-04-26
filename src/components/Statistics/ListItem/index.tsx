import React, { FC } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { formattingNumber } from 'utils/formattingNumber';
import { listForRangeItem } from 'components/Statistics/List';

import './styles.scss';

type propsType = {
  listItem: listForRangeItem;
  selectedBalance: string;
  monthsRange: Date[];
};

const ListItem: FC<propsType> = ({
  listItem,
  selectedBalance,
  monthsRange,
}) => {
  const { push } = useHistory();

  const handleItemClick = () => {
    push({
      pathname: '/statistics',
      search: `?balance=${selectedBalance}&dateFrom=${monthsRange[0].toISOString()}&dateTo=${monthsRange[1].toISOString()}`,
    });
    push({
      pathname: '/home',
      search: `?balance=${selectedBalance}&category=${
        listItem.title
      }&dateFrom=${monthsRange[0].toISOString()}&dateTo=${monthsRange[1].toISOString()}`,
    });
  };

  return (
    <Card
      className="mb-3 mx-auto text-center statisticsListItem cursor-pointer"
      bg="light"
      text="dark"
      onClick={handleItemClick}>
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
