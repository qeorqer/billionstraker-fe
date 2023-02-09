import React, { Dispatch, SetStateAction } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { categoriesTypes } from 'types/category.type';

type propsType = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  categoryType: string;
  setCategoryType: Dispatch<SetStateAction<categoriesTypes>>;
  buttonText: string;
  handleSubmit: () => void;
  isLoading: boolean;
};

const CategoryForm: React.FC<propsType> = ({
  name,
  setName,
  categoryType,
  setCategoryType,
  buttonText,
  handleSubmit,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <Form className="text-center">
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
            variant={categoryType === 'expense' ? 'danger' : 'outline-danger'}
            onClick={() => setCategoryType('expense')}
            className="w-50">
            {t('expense')}
          </Button>
        </div>
        <div className="w-50 text-center">
          <Button
            variant={categoryType === 'profit' ? 'success' : 'outline-success'}
            onClick={() => setCategoryType('profit')}
            className="w-50">
            {t('profit')}
          </Button>
        </div>
      </div>
      <Button
        variant="warning"
        className="w300Px text-white"
        onClick={handleSubmit}
        disabled={isLoading}>
        {t(buttonText)}
      </Button>
    </Form>
  );
};

export default CategoryForm;
