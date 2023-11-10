import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Col, FormControl, Row } from 'react-bootstrap';
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
import { balanceData } from 'features/balance';

type CreateTransactionProps = {
  selectedTransactionType: TransactionType;
  handleSubmit: (transaction: CreateTransactionPayload | null) => void;
  initialValues?: Transaction | null;
  isModal?: boolean;
  isEdit?: boolean;
};

const CreateTransactionForm: React.FC<CreateTransactionProps> = ({
  selectedTransactionType,
  handleSubmit,
  initialValues = null,
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

      if (initialValues?._id) {
        newTransaction._id = initialValues._id;
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

    if (initialValues?._id) {
      newTransaction._id = initialValues._id;
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
    if (initialValues) {
      setTitle(initialValues.title);
      setDate(new Date(initialValues.date));

      if (initialValues.balance) {
        const balanceFromTransaction = balances.find(
          (balance) => balance.name === initialValues.balance,
        );

        if (balanceFromTransaction) {
          setBalanceId(balanceFromTransaction._id);
        }
      }

      if (initialValues.transactionType === 'exchange') {
        setExchangeSum(initialValues.sum);
        setSum(initialValues.sumToSubtract!);

        const exchangeBalanceFromTransaction = balances.find(
          (balance) => balance.name === initialValues.balance,
        );

        if (exchangeBalanceFromTransaction) {
          setExchangeBalanceId(exchangeBalanceFromTransaction._id);
        }

        if (initialValues.balanceToSubtract) {
          const balanceFromTransaction = balances.find(
            (balance) => balance.name === initialValues.balanceToSubtract,
          );

          if (balanceFromTransaction) {
            setBalanceId(balanceFromTransaction._id);
          }
        }
      } else {
        setSum(initialValues.sum);

        const balanceFromTransaction = balances.find(
          (balance) => balance.name === initialValues.balance,
        );

        if (balanceFromTransaction) {
          setBalanceId(balanceFromTransaction._id);
        }
      }

      if (initialValues.category) {
        const categoryFromTransaction = categories.find(
          (category) => category.name === initialValues.category,
        );

        if (categoryFromTransaction?._id) {
          setCategoryId(categoryFromTransaction._id);
        }
      }
    }
  }, [initialValues]);

  return (
    <Row>
      <Col xs="12" lg={isModal ? '12' : '7'} className="mx-auto  mt-3">
        <Row>
          <Col xs="12" sm={isModal ? '12' : '4'} className="d-flex flex-wrap">
            <p className="mb-1 fs-5 text-center w-100 white-space-nowrap">
              {t(
                selectedTransactionType === 'exchange'
                  ? 'select balance (send)'
                  : 'select balance',
              )}
              :
            </p>
            <CustomSelect
              defaultButtonText={t('select balance')}
              defaultButtonValue=""
              data={balances.map((balance) => ({
                _id: balance._id,
                name: balance.name,
              }))}
              selectedValue={balanceId}
              setSelectedValue={setBalanceId}
            />
          </Col>
          <Col xs="12" sm={isModal ? '12' : '4'}>
            {selectedTransactionType === 'exchange' ? (
              <>
                <p className="mb-1 fs-5 text-center w-100 white-space-nowrap">
                  {t('select balance (receive)')}:
                </p>
                <CustomSelect
                  defaultButtonText={t('select balance')}
                  defaultButtonValue=""
                  data={balances.map((balance) => ({
                    _id: balance._id,
                    name: balance.name,
                    disabled: balance._id === balanceId,
                  }))}
                  selectedValue={exchangeBalanceId}
                  setSelectedValue={setExchangeBalanceId}
                />
              </>
            ) : (
              <>
                <p className="mb-1 fs-5 text-center w-100 white-space-nowrap">
                  {t('Select category')}:
                </p>
                <CustomSelect
                  defaultButtonText={t('Select category')}
                  defaultButtonValue=""
                  data={categories
                    .filter(
                      (category) =>
                        category.categoryType === selectedTransactionType,
                    )
                    .map((category) => ({
                      _id: category._id!,
                      name: category.name,
                    }))}
                  selectedValue={categoryId}
                  setSelectedValue={setCategoryId}
                />
              </>
            )}
          </Col>
          <Col xs="12" sm={isModal ? '12' : '4'} className="d-flex flex-wrap">
            <p className="mb-1 fs-5 text-center w-100">{t('select date')}:</p>
            <DatePicker
              selected={date}
              onChange={(newDate) => setDate(newDate || new Date())}
              className="form-control"
              wrapperClassName="w-100"
              dateFormat="dd/MM/yyyy"
              locale={lang}
              onFocus={(e) => (e.target.readOnly = true)}
              maxDate={new Date()}
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col
            xs={selectedTransactionType === 'exchange' ? 12 : 6}
            className="d-flex flex-wrap">
            <p className="mb-1 fs-5">{t('Name the transaction')}:</p>
            <FormControl
              type="text"
              placeholder={t('Transaction title')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col xs={6} className="d-flex flex-wrap">
            <p className="mb-1  fs-5">
              {t(
                selectedTransactionType === 'exchange'
                  ? 'send'
                  : 'Transaction sum',
              )}
              :
            </p>
            <FormControl
              type="number"
              placeholder={t('Transaction sum')}
              value={sum}
              onChange={handleChangeSum(setSum)}
            />
          </Col>

          {selectedTransactionType === 'exchange' && (
            <Col xs="6" className="d-flex flex-wrap">
              <p className="mb-1 fs-5">{t('receive')}:</p>
              <FormControl
                type="number"
                placeholder={t('Transaction sum')}
                value={exchangeSum}
                onChange={handleChangeSum(setExchangeSum)}
              />
            </Col>
          )}
        </Row>

        <Row>
          <Col xs="12" className="mt-3 text-center">
            <p className="fs-5 mb-1">{t('Submit transaction')}:</p>
            <Button
              variant="warning"
              className="w300Px text-white"
              onClick={() => handleSubmit(formatTransactionData())}
              disabled={isLoadingTransactions}>
              {t('Submit')}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

CreateTransactionForm.defaultProps = {
  isModal: false,
  isEdit: false,
  initialValues: null,
};

export default CreateTransactionForm;
