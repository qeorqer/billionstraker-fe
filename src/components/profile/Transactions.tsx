import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks/react-redux.hook";
import { getAllUserTransactions, resetTransactions } from '../../store/reducers/transaction.reducer';
import { transactionData } from "../../store/selectors";
import Transaction from './Transaction';
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Transactions = () => {
  const { loading, transactions, numberOfTransactions } = useAppSelector(transactionData)
  const dispatch = useAppDispatch()
  const {t} = useTranslation()
  const LIMIT = 10;
  const [numberToSkip, setNumberToSkip] = useState<number>(0)

  const getAllTransactions = () => {
    dispatch(getAllUserTransactions({ limit: LIMIT, numberToSkip: numberToSkip }))
    setNumberToSkip(LIMIT + numberToSkip)
  }

  useEffect(() => {
    dispatch(resetTransactions())
    getAllTransactions()
  }, [])

  if (loading) {
    return <div className='mt-3'><h1 className='text-center'>Loading...</h1></div>
  }

  return (
    <div className='mt-4'>
      {
        numberOfTransactions ? (
          <>
            <p className='text-center fw-bold fs-4'>{t('Your transactions')}</p>
            {
              transactions.map((transaction) => <Transaction key={transaction._id} transaction={transaction}/>)
            }

            {numberToSkip <= numberOfTransactions &&
            <Button
              disabled={loading}
              variant='warning'
              className='mt-4 mx-auto d-block text-white'
              onClick={getAllTransactions}
            >{t('Load more')}</Button>
            }
          </>
        ) : (
          <div className='d-flex justify-content-center align-items-center h-100 fw-bold my-3 mt-3'>
            <p>{t('There is no transactions yet')}</p>
          </div>
        )
      }


    </div>
  );
}

export default Transactions;