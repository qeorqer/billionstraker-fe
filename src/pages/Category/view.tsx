import { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import CategoriesList from 'features/category/components/CategoriesList';
import CategoryForm from 'features/category/components/CategoryForm';

type CategoryPageViewProps = {
  t: (text: string) => string;
};

const CategoryPageView: FC<CategoryPageViewProps> = ({ t }) => (
  <Container className="py-4">
    <CategoriesList />
    <Row className="text-center">
      <Col xs="12" lg="5" className="mb-3 mb-lg-0 mx-auto">
        <p className="fs-5 fw-bold">{t('add new category')}:</p>
        <CategoryForm buttonText="create" />
      </Col>
    </Row>
  </Container>
);

export default CategoryPageView;
