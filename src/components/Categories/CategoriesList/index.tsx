import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { categoryType } from 'types/category.type';

type propTypes = {
  categories: categoryType[];
};

const CategoriesList: React.FC<propTypes> = ({ categories }) => {
  const { t } = useTranslation();

  if (!categories.length) {
    return null;
  }

  return (
    <Row className="mb-3  justify-content-center d-flex">
      {categories.map((category) => (
        <Col xs={12} lg={3} md={4} sm={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>{category.name}</Card.Title>
              <Card.Text>{`${t('category type')}: ${t(
                category.categoryType,
              )}`}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CategoriesList;
