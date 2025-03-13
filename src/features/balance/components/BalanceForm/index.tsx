import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as Yup from 'yup';
import { Field, FieldProps, Formik, FormikProps } from 'formik';
import {
  TextInput,
  NumberInput,
  Button,
  Stack,
  Autocomplete,
} from '@mantine/core';
import { TypeaheadRef } from 'react-bootstrap-typeahead';

import { currenciesList } from 'features/currency';
import {
  Balance,
  balanceData,
  createBalanceThunk,
  updateBalanceThunk,
} from 'features/balance';
import { updateUserThunk, userData } from 'features/user';

import { getCurrencyLabel } from 'features/currency/utils/getCurrencyLabel';
import styles from './styles.module.css';

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
  const typeaheadRef = useRef<TypeaheadRef>();
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
      .oneOf(
        currenciesList.map(({ label }) => label),
        'Must be a value from the list',
      )
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
          currency: currenciesList.find(
            (currency) => currency.label === values.currency,
          )!.value,
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
      onSubmit={onSubmit}>
      {({
        errors,
        touched,
        handleSubmit,
        setFieldValue,
      }: FormikProps<BalanceFormFields>) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Stack gap="md">
            <Field name="name">
              {({ field }: FieldProps) => (
                <TextInput
                  size="md"
                  {...field}
                  placeholder={t('name the balance')}
                  error={touched.name && errors.name ? t(errors.name) : null}
                />
              )}
            </Field>

            <Field name="amount">
              {({ field }: FieldProps) => (
                <NumberInput
                  size="md"
                  {...field}
                  onChange={(value) => setFieldValue('amount', value)}
                  placeholder={t('set amount')}
                  error={
                    touched.amount && errors.amount ? t(errors.amount) : null
                  }
                  allowNegative={false}
                  hideControls
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
                  // todo: refactor
                  value={
                    currenciesList
                      .map(({ label }) => label)
                      .includes(field.value)
                      ? field.value
                      : getCurrencyLabel(field.value)
                  }
                  onChange={(selected) =>
                    setFieldValue('currency', selected ?? '')
                  }
                  comboboxProps={{ zIndex: 1 }}
                  data={currenciesList.map(({ label }) => label)}
                />
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
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default BalanceForm;
