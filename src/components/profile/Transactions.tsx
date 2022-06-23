import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux.hook';
import {
  getAllUserTransactions,
  resetTransactions,
} from '../../store/reducers/transaction.reducer';
import { transactionData } from '../../store/selectors';
import Transaction from './Transaction';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Loader from '../Loader';

const Transactions = () => {
  const { isTransactionsloading, transactions, numberOfTransactions } =
    useAppSelector(transactionData);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const LIMIT = 10;
  const [numberToSkip, setNumberToSkip] = useState<number>(10);

  const getAllTransactions = () => {
    dispatch(
      getAllUserTransactions({ limit: LIMIT, numberToSkip: numberToSkip }),
    );
    setNumberToSkip(LIMIT + numberToSkip);
  };

  if (isTransactionsloading && !numberOfTransactions) {
    return <Loader />;
  }

  return (
    <div className="mt-4">
      {numberOfTransactions ? (
        <>
          <p className="text-center fw-bold fs-4">{t('Your transactions')}</p>
          {transactions.map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} />
          ))}

          {isTransactionsloading && <Loader />}

          {numberToSkip <= numberOfTransactions && (
            <Button
              disabled={isTransactionsloading}
              variant="warning"
              className="mt-4 mx-auto d-block text-white"
              onClick={getAllTransactions}
            >
              {t('Load more')}
            </Button>
          )}
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100 fw-bold my-3 mt-3">
          <p>{t('There is no transactions yet')}</p>
        </div>
      )}
    </div>
  );
};

export default Transactions;
