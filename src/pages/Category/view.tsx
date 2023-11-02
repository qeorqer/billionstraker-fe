import React, { Dispatch, SetStateAction } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { CategoryTypes, Category } from 'features/category/types';
import CategoriesList from 'features/category/components/CategoriesList';
import CategoryForm from 'features/category/components/CategoryForm';

type propsType = {
  t: (text: string) => string;
  categories: Category[];
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  categoryType: string;
  setCategoryType: Dispatch<SetStateAction<CategoryTypes>>;
  handleAddCategory: () => void;
  isLoading: boolean;
};

const CategoryPageView: React.FC<propsType> = ({
  t,
  categories,
  name,
  setName,
  categoryType,
  setCategoryType,
  handleAddCategory,
  isLoading,
}) => (
  <>
    <Container className="py-4">
      <p className="fs-4 fw-bold text-center py-2">
        {t(
          categories.length
            ? 'all your categories'
            : 'your categories will be here',
        )}
      </p>
      <CategoriesList categories={categories} />
      <Row className="text-center">
        <Col xs="12" lg="5" className="mb-3 mb-lg-0 mx-auto">
          <p className="fs-5 fw-bold">{t('add new category')}:</p>
          <CategoryForm
            name={name}
            setName={setName}
            categoryType={categoryType}
            setCategoryType={setCategoryType}
            handleSubmit={handleAddCategory}
            buttonText="create"
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </Container>
  </>
);

export default CategoryPageView;
