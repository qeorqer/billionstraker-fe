import React from 'react';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Field, FieldProps, Formik, FormikProps } from 'formik';

import { Category, CategoryType } from 'features/category/types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { categoryData } from 'features/category/store/selector';
import { Balance } from 'features/balance';
import {
  createCategoryThunk,
  updateCategoryThunk,
} from 'features/category/store/thunks';

type CategoryFormProps = {
  buttonText: string;
  category?: Category;
  onSuccess?: () => void;
};

type CategoryFormFields = {
  name: string;
  categoryType: CategoryType;
};

const initialValues: CategoryFormFields = {
  name: '',
  categoryType: 'expense',
};

const CategoryForm: React.FC<CategoryFormProps> = ({
  buttonText,
  category,
  onSuccess,
}) => {
  const { isLoadingCategories, categories } = useAppSelector(categoryData);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Category name is required')
      .test('unique-name', 'Name must be unique', (value) => {
        if (!category) {
          return !categories.some(({ name }) => name === value);
        }

        return true;
      }),
    categoryType: Yup.string()
      .oneOf(['expense', 'profit'], 'Must have correct type')
      .required('Category type is required'),
  });

  const onSubmit = async (
    values: CategoryFormFields,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      const payload = { category: values as Partial<Balance> };

      if (category) {
        await dispatch(updateCategoryThunk(payload));
        if (onSuccess) {
          onSuccess();
        }
      } else {
        await dispatch(createCategoryThunk(payload));
        resetForm();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={category ?? initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      render={({
        errors,
        touched,
        handleSubmit,
        setFieldValue,
      }: FormikProps<CategoryFormFields>) => (
        <Form onSubmit={handleSubmit}>
          <Field name="name">
            {({ field }: FieldProps) => (
              <FormGroup className="mb-4 position-relative">
                <FormControl
                  {...field}
                  placeholder={t('name the category')}
                  isInvalid={Boolean(touched.name && errors.name)}
                />
                <FormControl.Feedback
                  type="invalid"
                  className="position-absolute">
                  {errors?.name && t(errors.name)}
                </FormControl.Feedback>
              </FormGroup>
            )}
          </Field>

          <Field name="categoryType">
            {({ field: { value, name } }: FieldProps) => (
              <FormGroup className="mb-4 position-relative">
                <div className="d-flex justify-content-center mb-3">
                  <div className="w-50 text-center">
                    <Button
                      variant={
                        value === 'expense' ? 'danger' : 'outline-danger'
                      }
                      onClick={() => setFieldValue(name, 'expense')}>
                      {t('expense')}
                    </Button>
                  </div>
                  <div className="w-50 text-center">
                    <Button
                      variant={
                        value === 'profit' ? 'success' : 'outline-success'
                      }
                      onClick={() => setFieldValue(name, 'profit')}>
                      {t('profit')}
                    </Button>
                  </div>
                </div>
                <FormControl.Feedback
                  type="invalid"
                  className="position-absolute">
                  {errors?.categoryType && t(errors.categoryType)}
                </FormControl.Feedback>
              </FormGroup>
            )}
          </Field>

          <div className="text-center">
            <Button
              type="submit"
              variant="warning"
              className="w300Px text-white"
              disabled={isLoadingCategories}>
              {t(buttonText)}
            </Button>
          </div>
        </Form>
      )}
    />
  );
};

export default CategoryForm;
