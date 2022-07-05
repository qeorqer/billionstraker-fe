import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import {
  getAllUserTransactions,
  resetTransactions,
} from 'store/reducers/transaction.reducer';
import { categoryData, transactionData } from 'store/selectors';
import Transaction from 'components/Profile/Transaction';
import Loader from 'components/Loader';
import { getCategories } from 'store/reducers/category.reducer';
import { categoryType } from 'types/category.type';
import { balanceType } from 'types/balance.type';

import { transactionTypesToShow, transactionTypesToShowType } from './utils';

const Transactions = () => {
  const {
    isTransactionsloading,
    transactions,
    numberOfTransactions,
  } = useAppSelector(transactionData);
  const { categories } = useAppSelector(categoryData);
  const { balances } = useAppSelector(state => state.balanceData);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const LIMIT = 10;
  const [numberToSkip, setNumberToSkip] = useState<number>(LIMIT);
  const [categoriesToShow, setCategoriesToShow] = useState<string[]>([]);
  const [shownTransactionsTypes, setShownTransactionsTypes] = useState<transactionTypesToShowType>('all transactions');
  const [balancesToShow, setBalancesToShow] = useState<string[]>([]);


  const getAllTransactions = () => {
    dispatch(
      getAllUserTransactions({ limit: LIMIT, numberToSkip: numberToSkip }),
    );
    setNumberToSkip(LIMIT + numberToSkip);
  };


  useEffect(() => {
    dispatch(getCategories());
    dispatch(resetTransactions());
    dispatch(getAllUserTransactions({ limit: LIMIT, numberToSkip: 0 }));
  }, []);


  if (isTransactionsloading && !numberOfTransactions) {
    return <Loader />;
  }

  return (
    <div className='mt-4'>
      {numberOfTransactions ? (
        <>
          <p className='text-center fw-bold fs-4'>{t('apply filters')}</p>
          <div className='mb-3 d-flex'>
            <Form.Select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setShownTransactionsTypes(e.target.value as transactionTypesToShowType)
              }
            >
              {transactionTypesToShow &&
              transactionTypesToShow.map((type: transactionTypesToShowType, index) => (
                <option key={index} value={type}>
                  {t(type)}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setShownTransactionsTypes(e.target.value as transactionTypesToShowType)
              }
              className='mx-3'
            >
              <option value="all">
                {t('show all')}
              </option>
              {categories &&
              categories.map((category: categoryType) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setShownTransactionsTypes(e.target.value as transactionTypesToShowType)
              }
            >
              <option value="all">
                {t('show all')}
              </option>
              {balances &&
              balances.map((balance: balanceType) => (
                <option key={balance._id} value={balance.name}>
                  {balance.name}
                </option>
              ))}
            </Form.Select>

          </div>
          <p className='text-center fw-bold fs-4'>{t('Your transactions')}</p>
          {transactions.map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} />
          ))}

          {isTransactionsloading && <Loader />}

          {numberToSkip <= numberOfTransactions && (
            <Button
              disabled={isTransactionsloading}
              variant='warning'
              className='mt-4 mx-auto d-block text-white'
              onClick={getAllTransactions}
            >
              {t('Load more')}
            </Button>
          )}
        </>
      ) : (
        <div
          className='d-flex justify-content-center align-items-center h-100 fw-bold my-3 mt-3'>
          <p>{t('There is no transactions yet')}</p>
        </div>
      )}
    </div>
  );
};

export default Transactions;
