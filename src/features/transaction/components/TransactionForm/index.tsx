import React, { Dispatch, SetStateAction } from 'react';
import { Button, Col, FormControl, FormGroup, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  CreateTransactionPayload,
  Transaction,
  TransactionFormData,
  TransactionType,
} from 'features/transaction/types';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';

import CustomSelect from 'components/Shared/CustomSelect';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  createTransactionThunk,
  transactionData,
  updateTransactionThunk,
} from 'features/transaction/index';
import { userData } from 'features/user';
import { categoryData } from 'features/category';
import { balanceData } from 'features/balance';
import RevalidateFormOnTypeChange from 'features/transaction/components/RevalidateFormOnTypeChange';
import {
  formatPayloadForExchange,
  formatPayloadForProfitOrExpense,
  transformTransactionIntoFormData,
} from 'features/transaction/components/TransactionForm/utils';

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

const TransactionForm: React.FC<TransactionFormProps> = ({
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
    categoryId: Yup.string().test(
      'requiredIfNotExchange',
      'Category is required',
      (value) => {
        if (selectedTransactionType !== 'exchange') {
          return Boolean(value);
        }

        return true;
      },
    ),
    date: Yup.date().required('Date is required'),
    balanceId: Yup.string().required('Balance is required'),
    balanceId2: Yup.string().test(
      'requiredIfExchange',
      'Balance is required',
      (value) => {
        if (selectedTransactionType === 'exchange') {
          return Boolean(value);
        }

        return true;
      },
    ),
  });

  return (
    <Formik
      initialValues={
        transaction
          ? transformTransactionIntoFormData(transaction, balances, categories)
          : initialValues
      }
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      render={({
        errors,
        touched,
        handleSubmit,
        setFieldValue,
        values,
        validateField,
      }: FormikProps<TransactionFormData>) => {
        const updateDropdownValue = (name: string) => (val: string) => {
          setFieldValue(name, val);
          validateField(name);
        };

        return (
          <Form onSubmit={handleSubmit}>
            <RevalidateFormOnTypeChange
              selectedType={selectedTransactionType}
              transaction={transaction}
            />
            <Row>
              <Col xs="12" lg={isModal ? '12' : '7'} className="mx-auto  mt-3">
                <Row>
                  <Col xs="12" sm={isModal ? '12' : '4'}>
                    <p className="mb-1 fs-5 text-center w-100 white-space-nowrap">
                      {t(
                        selectedTransactionType === 'exchange'
                          ? 'select balance (send)'
                          : 'select balance',
                      )}
                      :
                    </p>
                    <Field name="balanceId">
                      {({ field: { value, name } }: FieldProps) => (
                        <FormGroup className="mb-4 position-relative w-100">
                          <CustomSelect
                            defaultButtonText={t('select balance')}
                            defaultButtonValue=""
                            data={balances.map((balance) => ({
                              _id: balance._id,
                              name: balance.name,
                            }))}
                            selectedValue={value}
                            setSelectedValue={
                              updateDropdownValue(name) as Dispatch<
                                SetStateAction<string>
                              >
                            }
                          />
                          <FormControl.Feedback
                            type="invalid"
                            className={`position-absolute ${
                              touched.balanceId && 'd-block'
                            }`}>
                            {errors?.balanceId && t(errors.balanceId)}
                          </FormControl.Feedback>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>

                  {selectedTransactionType === 'exchange' && (
                    <Col xs="12" sm={isModal ? '12' : '4'}>
                      <p className="mb-1 fs-5 text-center w-100 white-space-nowrap">
                        {t('select balance (receive)')}:
                      </p>
                      <Field name="balanceId2">
                        {({ field: { value, name } }: FieldProps) => (
                          <FormGroup className="mb-4 position-relative w-100">
                            <CustomSelect
                              defaultButtonText={t('select balance')}
                              defaultButtonValue=""
                              data={balances.map((balance) => ({
                                _id: balance._id,
                                name: balance.name,
                                disabled: balance._id === values.balanceId,
                              }))}
                              selectedValue={value}
                              setSelectedValue={
                                updateDropdownValue(name) as Dispatch<
                                  SetStateAction<string>
                                >
                              }
                            />
                            <FormControl.Feedback
                              type="invalid"
                              className={`position-absolute ${
                                touched.balanceId2 && 'd-block'
                              }`}>
                              {errors?.balanceId2 && t(errors.balanceId2)}
                            </FormControl.Feedback>
                          </FormGroup>
                        )}
                      </Field>
                    </Col>
                  )}

                  {selectedTransactionType !== 'exchange' && (
                    <Col xs="12" sm={isModal ? '12' : '4'}>
                      <p className="mb-1 fs-5 text-center w-100 white-space-nowrap">
                        {t('Select category')}:
                      </p>
                      <Field name="categoryId">
                        {({ field: { value, name } }: FieldProps) => (
                          <FormGroup className="mb-4 position-relative w-100">
                            <CustomSelect
                              defaultButtonText={t('Select category')}
                              defaultButtonValue=""
                              data={categories
                                .filter(
                                  (category) =>
                                    category.categoryType ===
                                    selectedTransactionType,
                                )
                                .map((category) => ({
                                  _id: category._id!,
                                  name: category.name,
                                }))}
                              selectedValue={value}
                              setSelectedValue={
                                updateDropdownValue(name) as Dispatch<
                                  SetStateAction<string>
                                >
                              }
                            />
                            <FormControl.Feedback
                              type="invalid"
                              className={`position-absolute ${
                                touched.categoryId && 'd-block'
                              }`}>
                              {errors?.categoryId && t(errors.categoryId)}
                            </FormControl.Feedback>
                          </FormGroup>
                        )}
                      </Field>
                    </Col>
                  )}

                  <Col xs="12" sm={isModal ? '12' : '4'}>
                    <p className="mb-1 fs-5 text-center w-100">
                      {t('select date')}:
                    </p>
                    <Field name="date">
                      {({ field: { value, name, onChange } }: FieldProps) => (
                        <FormGroup className="mb-4 position-relative w-100">
                          <DatePicker
                            selected={value}
                            onChange={(newDate) => {
                              setFieldValue(name, newDate || new Date());
                              onChange(name);
                            }}
                            className="form-control"
                            wrapperClassName="w-100"
                            dateFormat="dd/MM/yyyy"
                            locale={lang}
                            onFocus={(e) => (e.target.readOnly = true)}
                            maxDate={new Date()}
                          />
                          <FormControl.Feedback
                            type="invalid"
                            className="position-absolute">
                            {errors?.date && t(errors.date as string)}
                          </FormControl.Feedback>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>

                <Row>
                  <Col xs={selectedTransactionType === 'exchange' ? 12 : 6}>
                    <p className="mb-1 fs-5">{t('Name the transaction')}:</p>
                    <Field name="title">
                      {({ field }: FieldProps) => (
                        <FormGroup className="mb-4 position-relative">
                          <FormControl
                            {...field}
                            placeholder={t('Transaction title')}
                            isInvalid={Boolean(touched.title && errors.title)}
                          />
                          <FormControl.Feedback
                            type="invalid"
                            className="position-absolute">
                            {errors?.title && t(errors.title)}
                          </FormControl.Feedback>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>

                  <Col xs={6}>
                    <p className="mb-1  fs-5">
                      {t(
                        selectedTransactionType === 'exchange'
                          ? 'send'
                          : 'Transaction sum',
                      )}
                      :
                    </p>
                    <Field name="sum">
                      {({ field }: FieldProps) => (
                        <FormGroup className="mb-4 position-relative">
                          <FormControl
                            {...field}
                            type="number"
                            placeholder={t('Transaction sum')}
                            isInvalid={Boolean(touched.sum && errors.sum)}
                          />
                          <FormControl.Feedback
                            type="invalid"
                            className="position-absolute">
                            {errors?.sum && t(errors.sum)}
                          </FormControl.Feedback>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>

                  {selectedTransactionType === 'exchange' && (
                    <Col xs="6">
                      <p className="mb-1 fs-5">{t('receive')}:</p>
                      <Field name="sum2">
                        {({ field }: FieldProps) => (
                          <FormGroup className="mb-4 position-relative">
                            <FormControl
                              {...field}
                              type="number"
                              placeholder={t('Transaction sum')}
                              isInvalid={Boolean(touched.sum2 && errors.sum2)}
                            />
                            <FormControl.Feedback
                              type="invalid"
                              className="position-absolute">
                              {errors?.sum2 && t(errors.sum2)}
                            </FormControl.Feedback>
                          </FormGroup>
                        )}
                      </Field>
                    </Col>
                  )}
                </Row>

                <Row>
                  <Col xs="12" className="mt-3 text-center">
                    <p className="fs-5 mb-1">{t('Submit transaction')}:</p>
                    <Button
                      type="submit"
                      variant="warning"
                      className="w300Px text-white"
                      disabled={isLoadingTransactions}>
                      {t('Submit')}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        );
      }}
    />
  );
};

export default TransactionForm;
