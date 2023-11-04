import React, { ForwardedRef, useRef } from 'react';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as Yup from 'yup';
import { Field, FieldProps, Formik, FormikProps } from 'formik';
import { TypeaheadRef } from 'react-bootstrap-typeahead';

import { CurrencyOption } from 'features/currency';
import {
  Balance,
  balanceData,
  createBalanceThunk,
  updateBalanceThunk,
} from 'features/balance';
import SelectCurrencyTypeahead from 'features/currency/components/SelectCurrencyTypeahead';
import { getCurrencyLabel } from 'features/currency/utils/getCurrencyLabel';

type BalanceFormProps = {
  buttonText: string;
  balance?: Balance;
  onSuccess?: () => void;
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
  onSuccess = () => {},
}) => {
  const typeaheadRef = useRef<TypeaheadRef>();
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
    try {
      const payload = { balance: values as Partial<Balance> };

      if (balance) {
        await dispatch(updateBalanceThunk(payload));
        onSuccess();
      } else {
        await dispatch(createBalanceThunk(payload));
        resetForm();
        typeaheadRef.current?.clear();
      }
    } catch (err) {
      console.log(err);
    }
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
            {({ field }: FieldProps) => (
              <FormGroup className="mb-4 position-relative">
                <SelectCurrencyTypeahead
                  id="currency-typeahead"
                  ref={typeaheadRef as ForwardedRef<TypeaheadRef>}
                  onChange={(selectedOptions) =>
                    setFieldValue(
                      'currency',
                      (selectedOptions as CurrencyOption[])[0]?.value ?? '',
                    )
                  }
                  isInvalid={Boolean(touched.currency && errors.currency)}
                  value={getCurrencyLabel(field.value)}
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
