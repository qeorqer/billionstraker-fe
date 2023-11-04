import React from 'react';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as Yup from 'yup';
import { Field, FieldProps, Formik, FormikProps } from 'formik';

import { CurrencyOption } from 'features/currency';
import {
  Balance,
  balanceData,
  createBalanceThunk,
  updateBalanceThunk,
} from 'features/balance';
import SelectCurrencyTypeahead from 'features/currency/components/SelectCurrencyTypeahead';

type BalanceFormProps = {
  buttonText: string;
  balance?: Balance;
};

type BalanceFormFields = {
  name: string;
  amount: number | '';
  currency: string;
};

const initialValues: BalanceFormFields = {
  name: '',
  amount: '',
  currency: '',
};

const BalanceForm: React.FC<BalanceFormProps> = ({
  buttonText,
  balance = null,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { balances, isLoadingBalances } = useAppSelector(balanceData);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Balance name is required')
      .test('unique-name', 'Name must be unique', (value) => {
        if (!balance) {
          return !balances.some(({ name }) => name === value);
        }

        return true;
      }),
    amount: Yup.number()
      .positive('Must be a positive value')
      .required('Amount value is required'),
    currency: Yup.string().required('Currency is required'),
  });

  const onSubmit = async (
    values: BalanceFormFields,
    { resetForm }: { resetForm: () => void },
  ) => {
    const payload = { balance: values as Partial<Balance> };

    if (balance) {
      await dispatch(updateBalanceThunk(payload));
    } else {
      await dispatch(createBalanceThunk(payload));
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={balance ?? initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      render={({
        errors,
        touched,
        handleSubmit,
        setFieldValue,
        resetForm,
      }: FormikProps<BalanceFormFields>) => (
        <Form onSubmit={handleSubmit}>
          <Field name="name">
            {({ field }: FieldProps) => (
              <FormGroup className="mb-4 position-relative">
                <FormControl
                  {...field}
                  placeholder={t('name the balance')}
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

          <Field name="amount">
            {({ field }: FieldProps) => (
              <FormGroup className="mb-4 position-relative">
                <FormControl
                  {...field}
                  type="number"
                  placeholder={t('set amount')}
                  isInvalid={Boolean(touched.amount && errors.amount)}
                />
                <FormControl.Feedback
                  type="invalid"
                  className="position-absolute">
                  {errors?.amount && t(errors.amount)}
                </FormControl.Feedback>
              </FormGroup>
            )}
          </Field>

          <Field name="currency">
            {() => (
              <FormGroup className="mb-4 position-relative">
                <SelectCurrencyTypeahead
                  onChange={(selectedOptions) =>
                    setFieldValue(
                      'currency',
                      (selectedOptions as CurrencyOption[])[0]?.value ?? '',
                    )
                  }
                  isInvalid={Boolean(touched.currency && errors.currency)}
                />
                <FormControl.Feedback
                  type="invalid"
                  className="position-absolute">
                  {errors?.currency && t(errors.currency)}
                </FormControl.Feedback>
              </FormGroup>
            )}
          </Field>

          <div className="text-center">
            <Button
              type="submit"
              variant="warning"
              className="w300Px text-white"
              disabled={isLoadingBalances}>
              {t(buttonText)}
            </Button>
          </div>
        </Form>
      )}
    />
  );
};

export default BalanceForm;
