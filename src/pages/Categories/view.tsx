import React, { Dispatch, SetStateAction } from 'react';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';

import { categoriesTypes, categoryType } from 'types/category.type';
import CategoriesList from 'components/Categories/CategoriesList';
import CategoryForm from 'components/Categories/CategoryForm';

type propsType = {
  t: (text: string) => string;
  categories: categoryType[];
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  categoryType: string;
  setCategoryType: Dispatch<SetStateAction<categoriesTypes>>;
  handleAddCategory: () => void;
};

const Categories: React.FC<propsType> = ({
  t,
  categories,
  name,
  setName,
  categoryType,
  setCategoryType,
  handleAddCategory,
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
          />
        </Col>
      </Row>
    </Container>
  </>
);

export default Categories;
