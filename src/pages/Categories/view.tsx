import React, { Dispatch, SetStateAction } from 'react';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';

import { categoriesTypes, categoryType } from '../../types/category.type';
import CategoriesList from '../../components/Categories/CategoriesList';

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
  handleAddCategory,
  categoryType,
  setCategoryType,
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
      <CategoriesList
        categories={categories}
      />
      <Row className="text-center">
        <Col xs="12" lg="5" className="mb-3 mb-lg-0 mx-auto">
          <p className="fs-5 fw-bold">{t('add new category')}:</p>
          <FormControl
            type="text"
            placeholder={t('name the category')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3"
          />
          <div className="d-flex justify-content-center mb-3">
            <div className="w-50 text-center">
              <Button
                variant={
                  categoryType === 'expense' ? 'danger' : 'outline-danger'
                }
                onClick={() => setCategoryType('expense')}
                className="w-50"
              >
                {t('expense')}
              </Button>
            </div>
            <div className="w-50 text-center">
              <Button
                variant={
                  categoryType === 'profit' ? 'success' : 'outline-success'
                }
                onClick={() => setCategoryType('profit')}
                className="w-50"
              >
                {t('income')}
              </Button>
            </div>
          </div>
          <Button
            variant="warning"
            className="w300Px text-white"
            onClick={handleAddCategory}
          >
            {t('create')}
          </Button>
        </Col>
      </Row>
    </Container>
  </>
);

export default Categories;
