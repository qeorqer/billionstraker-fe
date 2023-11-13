import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Col, FormControl, FormGroup, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  CreateTransactionPayload,
  Transaction,
  TransactionType,
} from 'features/transaction/types';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';

import CustomSelect from 'components/Shared/CustomSelect';
import { Balance } from 'features/balance/types';
import { Category } from 'features/category/types';
import { useAppSelector } from 'store/hooks';
import { transactionData } from 'features/transaction/index';
import { userData } from 'features/user';
import { categoryData } from 'features/category';
import {
  balanceData,
  createBalanceThunk,
  updateBalanceThunk,
} from 'features/balance';
import * as Yup from 'yup';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';

type CreateTransactionProps = {
  selectedTransactionType: TransactionType;
  handleSubmit: (transaction: CreateTransactionPayload | null) => void;
  defaultValues?: Transaction | null;
  isModal?: boolean;
  isEdit?: boolean;
};

const initialValues: CreateTransactionPayload = {
  transaction: {
    title: '',
    sum: null as unknown as number,
    sumToSubtract: undefined,
    category: '',
    date: new Date(),
    balance: '',
    balanceToSubtract: '',
    transactionType: 'expense',
  },
  balanceId: '',
  balanceToSubtractId: undefined,
};

const validationSchema = Yup.object().shape({
  transaction: Yup.object()
    .shape({
      title: Yup.string().required('Title is required'),
      sum: Yup.number()
        .min(0, 'Must be a positive value')
        .nullable(true)
        .required('Sum is required'),
      sumToSubtract: Yup.number()
        .nullable(true)
        .min(0, 'Must be a positive value'),
      category: Yup.string(),
      date: Yup.date().required('Date is required'),
      balance: Yup.string().required('Balance is required'),
      balanceToSubtract: Yup.string(),
      transactionType: Yup.string().oneOf(['expense', 'profit', 'exchange']),
    })
    .required('Transaction is required'),
  balanceId: Yup.string(),
  balanceToSubtractId: Yup.string(),
});

const CreateTransactionForm: React.FC<CreateTransactionProps> = ({
  selectedTransactionType,
  handleSubmit,
  defaultValues = null,
  isModal = false,
  isEdit = false,
}) => {
  const { categories } = useAppSelector(categoryData);
  const { balances } = useAppSelector(balanceData);

  const [balanceId, setBalanceId] = useState<string>('');
  const [exchangeBalanceId, setExchangeBalanceId] = useState<string>('');
  const [sum, setSum] = useState<number | string>('');
  const [exchangeSum, setExchangeSum] = useState<number | string>('');
  const [title, setTitle] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());

  const { lang } = useAppSelector(userData);
  const { isLoadingTransactions } = useAppSelector(transactionData);
  const { t } = useTranslation();

  const validateSumReg = /^(0|[1-9]\d*)(\.\d+)?$/;

  const onSubmit = async (
    values: CreateTransactionPayload,
    { resetForm }: { resetForm: () => void },
  ) => {
    console.log(values, 22);
    //
    // try {
    //   const payload = { balance: values as Partial<Balance> };
    //
    //   if (balance) {
    //     await dispatch(updateBalanceThunk(payload));
    //     onSuccess();
    //   } else {
    //     await dispatch(createBalanceThunk(payload));
    //     resetForm();
    //     typeaheadRef.current?.clear();
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleChangeSum =
    (setter: Dispatch<SetStateAction<string | number>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (
        validateSumReg.test(event.target.value) ||
        event.target.value === ''
      ) {
        setter(event.target.value);
      }
    };

  const formatTransactionData = () => {
    const requiredFieldsForExpenseProfit = [sum, title, categoryId, balanceId];
    const requiredFieldsForExchange = [
      sum,
      title,
      balanceId,
      exchangeSum,
      exchangeBalanceId,
    ];
    const requiredFieldsForTransaction =
      selectedTransactionType === 'exchange'
        ? requiredFieldsForExchange
        : requiredFieldsForExpenseProfit;

    if (requiredFieldsForTransaction.some((field) => !field)) {
      toast(t('All fields are required'), {
        type: 'error',
      });

      return null;
    }

    if (selectedTransactionType === 'exchange') {
      const balance = balances.find(
        (balance) => balance._id === exchangeBalanceId,
      );
      const balanceToSubtract = balances.find(
        (balance) => balance._id === balanceId,
      );

      if (!balance || !balanceToSubtract) {
        toast(t('the balance does not exist'), {
          type: 'error',
        });

        return null;
      }

      if (!isEdit && balanceToSubtract.amount < sum) {
        toast(t("You don't have this much"), {
          type: 'error',
        });

        return null;
      }

      const newTransaction: Transaction = {
        title: title,
        sum: Number(exchangeSum),
        sumToSubtract: Number(sum),
        balance: balance.name,
        balanceToSubtract: balanceToSubtract.name,
        transactionType: selectedTransactionType,
        date: date,
      };

      if (defaultValues?._id) {
        newTransaction._id = defaultValues._id;
      }

      setSum('');
      setExchangeSum('');
      setTitle('');

      return {
        transaction: newTransaction,
        balanceId: exchangeBalanceId,
        balanceToSubtractId: balanceId,
      };
    }

    const balance = balances.find((balance) => balance._id === balanceId);
    if (!balance) {
      toast(t('the balance does not exist'), {
        type: 'error',
      });

      return null;
    }

    if (selectedTransactionType === 'expense') {
      if (!isEdit && balance.amount < sum) {
        toast(t("You don't have this much"), {
          type: 'error',
        });

        return null;
      }
    }

    const category = categories.find((category) => category._id === categoryId);

    if (!category) {
      toast(t('there is no category with such id'), {
        type: 'error',
      });

      return null;
    }

    const newTransaction: Transaction = {
      title: title,
      sum: Number(sum),
      category: category.name,
      balance: balance.name,
      date: date,
      transactionType: selectedTransactionType,
    };

    if (defaultValues?._id) {
      newTransaction._id = defaultValues._id;
    }

    setSum('');
    setExchangeSum('');
    setTitle('');

    return {
      transaction: newTransaction,
      balanceId: balanceId,
    };
  };

  useEffect(() => {
    if (defaultValues) {
      setTitle(defaultValues.title);
      setDate(new Date(defaultValues.date));

      if (defaultValues.balance) {
        const balanceFromTransaction = balances.find(
          (balance) => balance.name === defaultValues.balance,
        );

        if (balanceFromTransaction) {
          setBalanceId(balanceFromTransaction._id);
        }
      }

      if (defaultValues.transactionType === 'exchange') {
        setExchangeSum(defaultValues.sum);
        setSum(defaultValues.sumToSubtract!);

        const exchangeBalanceFromTransaction = balances.find(
          (balance) => balance.name === defaultValues.balance,
        );

        if (exchangeBalanceFromTransaction) {
          setExchangeBalanceId(exchangeBalanceFromTransaction._id);
        }

        if (defaultValues.balanceToSubtract) {
          const balanceFromTransaction = balances.find(
            (balance) => balance.name === defaultValues.balanceToSubtract,
          );

          if (balanceFromTransaction) {
            setBalanceId(balanceFromTransaction._id);
          }
        }
      } else {
        setSum(defaultValues.sum);

        const balanceFromTransaction = balances.find(
          (balance) => balance.name === defaultValues.balance,
        );

        if (balanceFromTransaction) {
          setBalanceId(balanceFromTransaction._id);
        }
      }

      if (defaultValues.category) {
        const categoryFromTransaction = categories.find(
          (category) => category.name === defaultValues.category,
        );

        if (categoryFromTransaction?._id) {
          setCategoryId(categoryFromTransaction._id);
        }
      }
    }
  }, [defaultValues]);

  return (
    <Formik
      initialValues={/*defaultValues ??*/ initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      render={({
        errors,
        touched,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        values,
        validateField,
      }: FormikProps<CreateTransactionPayload>) => {
        const updateDropdownValue = (name: string) => (val: string) => {
          setFieldValue(name, val);
          validateField(name);
        };

        return (
          <Form onSubmit={handleSubmit}>
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
                    <Field name="transaction.balance">
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
                            className="position-absolute d-block">
                            {errors?.transaction?.balance &&
                              t(errors.transaction?.balance)}
                          </FormControl.Feedback>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                  <Col xs="12" sm={isModal ? '12' : '4'}>
                    {selectedTransactionType === 'exchange' ? (
                      <>
                        <p className="mb-1 fs-5 text-center w-100 white-space-nowrap">
                          {t('select balance (receive)')}:
                        </p>
                        <Field name="transaction.balanceToSubtract">
                          {({ field: { value, name } }: FieldProps) => (
                            <FormGroup className="mb-4 position-relative w-100">
                              <CustomSelect
                                defaultButtonText={t('select balance')}
                                defaultButtonValue=""
                                data={balances.map((balance) => ({
                                  _id: balance._id,
                                  name: balance.name,
                                  disabled: balance._id === balanceId,
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
                                className="position-absolute d-block">
                                {errors?.transaction?.balanceToSubtract &&
                                  t(errors.transaction?.balanceToSubtract)}
                              </FormControl.Feedback>
                            </FormGroup>
                          )}
                        </Field>
                      </>
                    ) : (
                      <>
                        <p className="mb-1 fs-5 text-center w-100 white-space-nowrap">
                          {t('Select category')}:
                        </p>
                        <Field name="transaction.category">
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
                                className="position-absolute">
                                {errors?.transaction?.category &&
                                  t(errors.transaction?.category)}
                              </FormControl.Feedback>
                            </FormGroup>
                          )}
                        </Field>
                      </>
                    )}
                  </Col>
                  <Col xs="12" sm={isModal ? '12' : '4'}>
                    <p className="mb-1 fs-5 text-center w-100">
                      {t('select date')}:
                    </p>
                    <Field name="transaction.date">
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
                            {errors?.transaction?.date &&
                              t(errors.transaction?.date as string)}
                          </FormControl.Feedback>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col xs={selectedTransactionType === 'exchange' ? 12 : 6}>
                    <p className="mb-1 fs-5">{t('Name the transaction')}:</p>
                    <Field name="transaction.title">
                      {({ field }: FieldProps) => (
                        <FormGroup className="mb-4 position-relative">
                          <FormControl
                            {...field}
                            placeholder={t('Transaction title')}
                            isInvalid={Boolean(
                              touched.transaction?.title &&
                                errors.transaction?.title,
                            )}
                          />
                          <FormControl.Feedback
                            type="invalid"
                            className="position-absolute">
                            {errors?.transaction?.title &&
                              t(errors.transaction?.title)}
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
                    <Field name="transaction.sum">
                      {({ field }: FieldProps) => (
                        <FormGroup className="mb-4 position-relative">
                          <FormControl
                            {...field}
                            type="number"
                            placeholder={t('Transaction sum')}
                            isInvalid={Boolean(
                              touched.transaction?.sum &&
                                errors.transaction?.sum,
                            )}
                          />
                          <FormControl.Feedback
                            type="invalid"
                            className="position-absolute">
                            {errors?.transaction?.sum &&
                              t(errors.transaction?.sum)}
                          </FormControl.Feedback>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>

                  {selectedTransactionType === 'exchange' && (
                    <Col xs="6">
                      <p className="mb-1 fs-5">{t('receive')}:</p>
                      <Field name="transaction.sumToSubtract">
                        {({ field }: FieldProps) => (
                          <FormGroup className="mb-4 position-relative">
                            <FormControl
                              {...field}
                              type="number"
                              placeholder={t('Transaction sum')}
                              isInvalid={Boolean(
                                touched.transaction?.sumToSubtract &&
                                  errors.transaction?.sumToSubtract,
                              )}
                            />
                            <FormControl.Feedback
                              type="invalid"
                              className="position-absolute">
                              {errors?.transaction?.sumToSubtract &&
                                t(errors.transaction?.sumToSubtract)}
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

export default CreateTransactionForm;
