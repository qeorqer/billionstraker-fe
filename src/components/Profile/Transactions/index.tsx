import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';

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
import CustomSelect from 'components/CustomSelect';

const Transactions = () => {
  const { isTransactionsloading, transactions, numberOfTransactions } =
    useAppSelector(transactionData);
  const { categories } = useAppSelector(categoryData);
  const { balances } = useAppSelector((state) => state.balanceData);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const LIMIT = 10;
  const [numberToSkip, setNumberToSkip] = useState<number>(LIMIT);
  const [categoriesToShow, setCategoriesToShow] = useState<string>('all');
  const [shownTransactionsTypes, setShownTransactionsTypes] =
    useState<transactionTypesToShowType>('all transactions');
  const [balancesToShow, setBalancesToShow] = useState<string>('all');

  const handleLoadMore = () => {
    if (!isTransactionsloading) {
      dispatch(
        getAllUserTransactions({
          limit: LIMIT,
          numberToSkip: numberToSkip,
          filteringOptions: {
            shownTransactionsTypes,
            categoriesToShow:
              categoriesToShow === 'all' ? [] : [categoriesToShow],
            balancesToShow: balancesToShow === 'all' ? [] : [balancesToShow],
          },
        }),
      );
      setNumberToSkip(LIMIT + numberToSkip);
    }
  };

  useEffect(() => {
    setNumberToSkip(LIMIT);

    if (shownTransactionsTypes === 'exchange') {
      setCategoriesToShow('all');
      setBalancesToShow('all');
    }

    if (!isTransactionsloading) {
      dispatch(resetTransactions());
      dispatch(
        getAllUserTransactions({
          limit: LIMIT,
          numberToSkip: 0,
          filteringOptions: {
            shownTransactionsTypes,
            categoriesToShow:
              categoriesToShow === 'all' ||
              shownTransactionsTypes === 'exchange'
                ? []
                : [categoriesToShow],
            balancesToShow:
              balancesToShow === 'all' || shownTransactionsTypes === 'exchange'
                ? []
                : [balancesToShow],
          },
        }),
      );
    }
  }, [shownTransactionsTypes, categoriesToShow, balancesToShow]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  if (isTransactionsloading && !numberOfTransactions) {
    return <Loader />;
  }

  return (
    <div className="mt-4">
      {!(
        !numberOfTransactions &&
        shownTransactionsTypes === 'all transactions' &&
        !categoriesToShow.length &&
        !balancesToShow.length &&
        !isTransactionsloading
      ) && (
        <>
          <p className="text-center fw-bold fs-4">{t('apply filters')}</p>
          <Row className="mb-3">
            <Col xs="12" sm="4">
              <p className="mb-1 fs-5 text-center w-100 white-space-nowrap">
                {t('transactions types')}:
              </p>
              <CustomSelect
                defaultButtonText={t('show all')}
                defaultButtonValue="all transactions"
                data={transactionTypesToShow.map((type, index) => ({
                  _id: String(index),
                  name: type,
                }))}
                selectedValue={shownTransactionsTypes}
                setSelectedValue={
                  setShownTransactionsTypes as Dispatch<SetStateAction<string>>
                }
                fieldToSelect="name"
                withTranslate
              />
            </Col>
            <Col xs="12" sm="4" className="my-3 my-sm-0">
              <p className="mb-1 fs-5 text-center w-100 white-space-nowrap">
                {t('categories')}:
              </p>
              <CustomSelect
                defaultButtonText={t('show all')}
                defaultButtonValue="all"
                data={categories
                  .filter((category: categoryType) => {
                    if (shownTransactionsTypes === 'all transactions') {
                      return category;
                    }

                    return category.categoryType === shownTransactionsTypes;
                  })
                  .map((category: categoryType) => ({
                    _id: category._id!,
                    name: category.name,
                  }))}
                selectedValue={categoriesToShow}
                setSelectedValue={setCategoriesToShow}
                fieldToSelect="name"
                withTranslate
                disabled={shownTransactionsTypes === 'exchange'}
              />
            </Col>
            <Col xs="12" sm="4">
              <p className="mb-1 fs-5 text-center w-100 white-space-nowrap">
                {t('balances')}:
              </p>
              <CustomSelect
                defaultButtonText={t('show all')}
                defaultButtonValue="all"
                data={balances.map((balance: balanceType) => ({
                  _id: balance._id,
                  name: balance.name,
                }))}
                selectedValue={balancesToShow}
                setSelectedValue={setBalancesToShow}
                fieldToSelect="name"
                withTranslate
                disabled={shownTransactionsTypes === 'exchange'}
              />
            </Col>
          </Row>
        </>
      )}
      {numberOfTransactions ? (
        <>
          <p className="text-center fw-bold fs-4">{t('Your transactions')}</p>
          <InfiniteScroll
            loadMore={handleLoadMore}
            hasMore={numberToSkip <= numberOfTransactions}
            loader={<Loader />}
          >
            {transactions.map((transaction) => (
              <Transaction key={transaction._id} transaction={transaction} />
            ))}
          </InfiniteScroll>
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
