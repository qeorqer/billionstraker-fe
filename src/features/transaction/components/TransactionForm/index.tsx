import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CreateTransactionPayload,
  Transaction,
  TransactionFormData,
  TransactionType,
} from 'features/transaction/types';
import * as Yup from 'yup';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  createTransactionThunk,
  transactionData,
  updateTransactionThunk,
} from 'features/transaction';
import { userData } from 'features/user';
import { Category, categoryData } from 'features/category';
import { balanceData } from 'features/balance';
import RevalidateFormOnTypeChange from 'features/transaction/components/RevalidateFormOnTypeChange';
import {
  formatPayloadForExchange,
  formatPayloadForProfitOrExpense,
  transformTransactionIntoFormData,
} from 'features/transaction/components/TransactionForm/utils';
import { Button, Grid, NumberInput, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';

type TransactionFormProps = {
  selectedTransactionType: TransactionType;
  transaction?: Transaction | null;
  isModal?: boolean;
  onSuccess?: () => void;
};

const initialValues: TransactionFormData = {
  title: '',
  sum: '',
  sum2: '',
  categoryId: '',
  date: new Date(),
  balanceId: '',
  balanceId2: '',
};

const TransactionForm: FC<TransactionFormProps> = ({
  selectedTransactionType,
  transaction = null,
  isModal = false,
  onSuccess = () => {},
}) => {
  const { categories } = useAppSelector(categoryData);
  const { balances } = useAppSelector(balanceData);
  const { lang } = useAppSelector(userData);
  const { isLoadingTransactions } = useAppSelector(transactionData);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onSubmit = async (
    values: TransactionFormData,
    {
      setFieldValue,
    }: {
      setFieldValue: (field: string, value: any, validate: boolean) => void;
    },
  ) => {
    const payload: CreateTransactionPayload | null =
      selectedTransactionType === 'exchange'
        ? formatPayloadForExchange({
            values,
            balances,
            selectedTransaction: transaction,
          })
        : formatPayloadForProfitOrExpense({
            values,
            balances,
            categories,
            type: selectedTransactionType,
            selectedTransaction: transaction,
          });

    if (!payload) {
      return null;
    }

    try {
      if (transaction) {
        await dispatch(updateTransactionThunk(payload));
        onSuccess();
      } else {
        await dispatch(createTransactionThunk(payload));

        ['title', 'sum', 'sum2'].map((name) => setFieldValue(name, '', false));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    sum: Yup.number()
      .min(0, 'Must be a positive value')
      .required('Sum is required'),
    sum2: Yup.number()
      .test('requiredIfExchange', 'Sum is required', (value) => {
        if (selectedTransactionType === 'exchange') {
          return Boolean(value);
        }

        return true;
      })
      .test('mustBePositive', 'Must be a positive value', (value) => {
        if (selectedTransactionType === 'exchange') {
          return Boolean(value && value >= 0);
        }

        return true;
      }),
    categoryId: Yup.string()
      .nullable()
      .test('requiredIfNotExchange', 'Category is required', (value) => {
        if (selectedTransactionType !== 'exchange') {
          return Boolean(value);
        }

        return true;
      }),
    date: Yup.date().required('Date is required'),
    balanceId: Yup.string().nullable().required('Balance is required'),
    balanceId2: Yup.string()
      .nullable()
      .test('requiredIfExchange', 'Balance is required', (value) => {
        if (selectedTransactionType === 'exchange') {
          return Boolean(value);
        }

        return true;
      }),
  });

  return (
    <Formik
      initialValues={
        transaction
          ? transformTransactionIntoFormData(transaction, balances, categories)
          : initialValues
      }
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({
        errors,
        touched,
        handleSubmit,
        setFieldValue,
        values,
        validateField,
      }: FormikProps<TransactionFormData>) => {
        const updateDropdownValue = (name: string) => (val: string | null) => {
          setFieldValue(name, val);
          validateField(name);
        };

        return (
          <Form onSubmit={handleSubmit}>
            <RevalidateFormOnTypeChange
              selectedType={selectedTransactionType}
              transaction={transaction}
            />
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, sm: isModal ? 12 : 4 }}>
                <Field name="balanceId">
                  {({ field: { value, name: fieldName } }: FieldProps) => (
                    <Select
                      clearable
                      size="md"
                      value={value}
                      w="100%"
                      label={t(
                        selectedTransactionType === 'exchange'
                          ? 'select balance (send)'
                          : 'select balance',
                      )}
                      placeholder={t('select balance')}
                      data={balances.map(({ name, _id }) => ({
                        label: name,
                        value: _id,
                      }))}
                      error={
                        touched.balanceId && errors.balanceId
                          ? t(errors.balanceId)
                          : null
                      }
                      onChange={
                        updateDropdownValue(fieldName) as Dispatch<
                          SetStateAction<string | null>
                        >
                      }
                    />
                  )}
                </Field>
              </Grid.Col>
              {selectedTransactionType === 'exchange' ? (
                <Grid.Col span={{ base: 12, sm: isModal ? 12 : 4 }}>
                  <Field name="balanceId2">
                    {({ field: { value, name: fieldName } }: FieldProps) => (
                      <Select
                        clearable
                        size="md"
                        value={value}
                        w="100%"
                        label={t('select balance (receive)')}
                        placeholder={t('select balance')}
                        data={balances.map(({ name, _id }) => ({
                          value: _id,
                          label: name,
                          disabled: _id === values.balanceId,
                        }))}
                        error={
                          touched.balanceId2 && errors.balanceId2
                            ? t(errors.balanceId2)
                            : null
                        }
                        onChange={
                          updateDropdownValue(fieldName) as Dispatch<
                            SetStateAction<string | null>
                          >
                        }
                      />
                    )}
                  </Field>
                </Grid.Col>
              ) : (
                <Grid.Col span={{ base: 12, sm: isModal ? 12 : 4 }}>
                  <Field name="categoryId">
                    {({ field: { value, name: fieldName } }: FieldProps) => (
                      <Select
                        clearable
                        size="md"
                        value={value}
                        w="100%"
                        label={t('Select category')}
                        placeholder={t('Select category')}
                        data={categories
                          .filter(
                            (category: Category) =>
                              category.categoryType === selectedTransactionType,
                          )
                          .map((category: Category) => ({
                            value: category._id!,
                            label: category.name,
                          }))}
                        error={
                          touched.categoryId && errors.categoryId
                            ? t(errors.categoryId)
                            : null
                        }
                        onChange={
                          updateDropdownValue(fieldName) as Dispatch<
                            SetStateAction<string | null>
                          >
                        }
                      />
                    )}
                  </Field>
                </Grid.Col>
              )}

              <Grid.Col span={{ base: 12, sm: isModal ? 12 : 4 }}>
                <Field name="date">
                  {({ field }: FieldProps) => (
                    <DateInput
                      {...field}
                      size="md"
                      label={t('select date')}
                      onChange={(date) => setFieldValue('date', date)}
                      locale={lang}
                      placeholder="Date input"
                      maxDate={new Date()}
                    />
                  )}
                </Field>
              </Grid.Col>
              <Grid.Col span={6}>
                <Field name="sum">
                  {({ field }: FieldProps) => (
                    <NumberInput
                      {...field}
                      size="md"
                      label={t(
                        selectedTransactionType === 'exchange'
                          ? 'send'
                          : 'Transaction sum',
                      )}
                      onChange={(sum) => setFieldValue('sum', sum)}
                      placeholder={t(
                        selectedTransactionType === 'exchange'
                          ? 'send'
                          : 'Transaction sum',
                      )}
                      error={touched.sum && errors.sum ? t(errors.sum) : null}
                      allowNegative={false}
                      hideControls
                    />
                  )}
                </Field>
              </Grid.Col>

              {selectedTransactionType === 'exchange' && (
                <Grid.Col span={6}>
                  <Field name="sum2">
                    {({ field }: FieldProps) => (
                      <NumberInput
                        {...field}
                        size="md"
                        label={t('receive')}
                        onChange={(sum) => setFieldValue('sum2', sum)}
                        placeholder={t('receive')}
                        error={
                          touched.sum2 && errors.sum2 ? t(errors.sum2) : null
                        }
                        allowNegative={false}
                        hideControls
                      />
                    )}
                  </Field>
                </Grid.Col>
              )}
              <Grid.Col span={selectedTransactionType === 'exchange' ? 12 : 6}>
                <Field name="title">
                  {({ field }: FieldProps) => (
                    <TextInput
                      {...field}
                      size="md"
                      label={t('Name the transaction')}
                      placeholder={t('Transaction title')}
                      error={
                        touched.title && errors.title ? t(errors.title) : null
                      }
                    />
                  )}
                </Field>
              </Grid.Col>
              <Grid.Col span={12} ta="center">
                <Button
                  type="submit"
                  disabled={isLoadingTransactions}
                  maw="320px"
                  w="100%">
                  {transaction ? t('update') : t('Submit')}
                </Button>
              </Grid.Col>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TransactionForm;
