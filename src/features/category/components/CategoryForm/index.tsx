import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Field, FieldProps, Formik, FormikProps } from 'formik';
import { TextInput, Button, Stack, SegmentedControl } from '@mantine/core';

import { Category, CategoryType } from 'features/category/types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { categoryData } from 'features/category/store/selector';
import { Balance } from 'features/balance';
import {
  createCategoryThunk,
  updateCategoryThunk,
} from 'features/category/store/thunks';

import styles from './styles.module.css';

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
      onSubmit={onSubmit}>
      {({
        errors,
        touched,
        handleSubmit,
        setFieldValue,
      }: FormikProps<CategoryFormFields>) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Stack gap="md">
            <Field name="name">
              {({ field }: FieldProps) => (
                <TextInput
                  size="md"
                  {...field}
                  placeholder={t('name the category')}
                  error={touched.name && errors.name ? t(errors.name) : null}
                />
              )}
            </Field>

            <Field name="categoryType">
              {({ field: { value, name } }: FieldProps) => (
                <SegmentedControl
                  size="md"
                  value={value}
                  onChange={(newValue) => setFieldValue(name, newValue)}
                  data={[
                    { value: 'expense', label: t('expense') },
                    { value: 'profit', label: t('profit') },
                  ]}
                />
              )}
            </Field>

            <Button
              type="submit"
              variant="filled"
              fullWidth
              loading={isLoadingCategories}>
              {t(buttonText)}
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default CategoryForm;
