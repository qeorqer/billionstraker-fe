import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as Yup from 'yup';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { TextInput, Button, Stack, Autocomplete } from '@mantine/core';

import { currenciesLabelsList } from 'features/currency';
import {
  Balance,
  balanceData,
  createBalanceThunk,
  updateBalanceThunk,
} from 'features/balance';
import { updateUserThunk, userData } from 'features/user';

import { getCurrencyLabel } from 'features/currency/utils/getCurrencyLabel';
import { getCurrencyValue } from 'features/currency/utils/getCurrencyValue';
import styles from './styles.module.css';
import NumberInputWithCalc from 'features/transaction/components/NumberInputWithCalc';

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

const BalanceForm: FC<BalanceFormProps> = ({
  buttonText,
  balance = null,
  onSuccess = () => {},
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { balances, isLoadingBalances } = useAppSelector(balanceData);
  const { user } = useAppSelector(userData);

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
      .min(0, 'Must be a positive value')
      .required('Amount value is required'),
    currency: Yup.string()
      .nullable(true)
      .oneOf(currenciesLabelsList, 'Must be a value from the list')
      .required('Currency is required'),
  });

  const onSubmit = async (
    values: BalanceFormFields,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      const payload = {
        balance: {
          ...values,
          currency: getCurrencyValue(values.currency)!,
        } as Partial<Balance>,
      };

      if (balance) {
        await dispatch(updateBalanceThunk(payload));
        onSuccess();
      } else {
        await dispatch(createBalanceThunk(payload));

        if (!user?.preferredCurrency) {
          await dispatch(
            updateUserThunk({
              updatedFields: {
                preferredCurrency: values.currency,
              },
            }),
          );
        }

        resetForm();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={
        balance
          ? { ...balance, currency: getCurrencyLabel(balance.currency)! }
          : initialValues
      }
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({
        errors,
        touched,
        handleSubmit,
        setFieldValue,
      }: FormikProps<BalanceFormFields>) => (
        <Form onSubmit={handleSubmit} className={styles.form}>
          <Stack>
            <Field name="name">
              {({ field }: FieldProps) => (
                <TextInput
                  {...field}
                  size="md"
                  placeholder={t('name the balance')}
                  error={touched.name && errors.name ? t(errors.name) : null}
                />
              )}
            </Field>

            <Field name="amount">
              {(fieldObj: FieldProps) => (
                <NumberInputWithCalc
                  label={t('set amount')}
                  placeholder={t('set amount')}
                  error={
                    touched.amount && errors.amount ? t(errors.amount) : null
                  }
                  fieldObj={fieldObj}
                  setValue={(value: number | '') => {
                    setFieldValue('amount', value);
                  }}
                />
              )}
            </Field>

            <Field name="currency">
              {({ field }: FieldProps) => (
                <Autocomplete
                  {...field}
                  size="md"
                  placeholder={t('select currency')}
                  error={
                    touched.currency && errors.currency
                      ? t(errors.currency)
                      : null
                  }
                  onChange={(selected) =>
                    setFieldValue('currency', selected ?? '')
                  }
                  comboboxProps={{ zIndex: 1000 }}
                  data={currenciesLabelsList}
                />
              )}
            </Field>

            <Button type="submit" disabled={isLoadingBalances}>
              {t(buttonText)}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default BalanceForm;
