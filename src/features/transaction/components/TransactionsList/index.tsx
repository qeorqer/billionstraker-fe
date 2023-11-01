import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';
//@ts-ignore
//todo: This library has an awful typing, but check it once in a while
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { useHistory, useLocation } from 'react-router-dom';

import { categoryData } from 'store/selectors';
import TransactionListItem from 'features/transaction/components/TransactionListItem';
import Loader from 'components/Layout/Loader';
import { getCategories } from 'store/reducers/category.reducer';
import { categoryType } from 'types/category.type';
import { balanceType } from 'types/balance.type';
import { userData } from 'features/user';
import CustomSelect from 'components/CustomSelect';
import {
  TransactionsSections,
  Transaction,
  transactionData,
} from 'features/transaction/index';
import BackToStatisticsButton from 'components/Statistics/BackToStatisticsButton';

import {
  formTransactionsSections,
  transactionTypesToShow,
  transactionTypesToShowType,
} from 'features/transaction/components/TransactionsList/utils';
import 'features/transaction/components/TransactionsList/styles.scss';
import {
  getTransactionsThunk,
  resetTransactions,
} from 'features/transaction/index';

type propsType = {
  setSelectedTransaction: Dispatch<SetStateAction<Transaction | null>>;
};

const TransactionsList: React.FC<propsType> = ({ setSelectedTransaction }) => {
  const { isLoadingTransactions, transactions, numberOfTransactions } =
    useAppSelector(transactionData);
  const { categories } = useAppSelector(categoryData);
  const { lang, user } = useAppSelector(userData);
  const { balances } = useAppSelector((state) => state.balanceData);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { push } = useHistory();
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  const initialBalance = params.get('balance');
  const initialCategory = params.get('category');
  const initialDateFrom = params.get('dateFrom');
  const initialDateTo = params.get('dateTo');

  const LIMIT = 10;
  const [transactionsSections, setTransactionsSections] =
    useState<TransactionsSections>([]);
  const [numberToSkip, setNumberToSkip] = useState<number>(LIMIT);
  const [categoriesToShow, setCategoriesToShow] = useState<string>(
    initialCategory || 'all',
  );
  const [shownTransactionsTypes, setShownTransactionsTypes] =
    useState<transactionTypesToShowType>('all transactions');
  const [balancesToShow, setBalancesToShow] = useState<string>(
    initialBalance || 'all',
  );
  const [monthsRange, setMonthsRange] = useState<Date[]>([
    new Date(initialDateFrom || user.created),
    new Date(initialDateTo || new Date()),
  ]);
  const [dateRangeMaxDetail, setDateRangeMaxDetail] = useState<string>('year');
  const [isDateRangeOpen, setIsDateRangeOpen] = useState<boolean>(false);

  const handleLoadMore = () => {
    if (!isLoadingTransactions) {
      dispatch(
        getTransactionsThunk({
          limit: LIMIT,
          numberToSkip: numberToSkip,
          filteringOptions: {
            shownTransactionsTypes,
            categoriesToShow:
              categoriesToShow === 'all' ? [] : [categoriesToShow],
            balancesToShow: balancesToShow === 'all' ? [] : [balancesToShow],
            from: monthsRange[0],
            to: monthsRange[1],
          },
        }),
      );
      setNumberToSkip(LIMIT + numberToSkip);
    }
  };

  const handleCreateTransaction = () => push('createTransaction');

  useEffect(() => {
    setNumberToSkip(LIMIT);

    if (shownTransactionsTypes === 'exchange') {
      setCategoriesToShow('all');
      setBalancesToShow('all');
    }

    if (!isLoadingTransactions) {
      dispatch(resetTransactions());
      dispatch(
        getTransactionsThunk({
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
            from: monthsRange[0],
            to: monthsRange[1],
          },
        }),
      );
    }
  }, [shownTransactionsTypes, categoriesToShow, balancesToShow, monthsRange]);

  useEffect(() => {
    setTransactionsSections(formTransactionsSections(transactions, lang));
  }, [transactions, lang]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  if (isLoadingTransactions && !numberOfTransactions) {
    return <Loader />;
  }

  return (
    <div className="mt-4">
      {!(
        !numberOfTransactions &&
        shownTransactionsTypes === 'all transactions' &&
        !categoriesToShow.length &&
        !balancesToShow.length &&
        !isLoadingTransactions
      ) && (
        <>
          <p className="text-center fw-bold fs-4">{t('apply filters')}</p>
          <Row className="mb-3 align-items-center justify-content-center">
            <Col xs="6" sm="4" className="max-width-220 p-1">
              <p className="mb-1 fs-6 text-center w-100 white-space-nowrap">
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
            <Col xs="6" sm="4" className="max-width-220  p-1">
              <p className="mb-1 fs-6 text-center w-100 white-space-nowrap">
                {t('balance')}:
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
            <Col xs="6" sm="4" className="max-width-220 p-1">
              <p className="mb-1 fs-6 text-center w-100 white-space-nowrap">
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
            <Col xs="6" sm="6" lg="4" className="max-width-220 p-1">
              <p className="mb-1 fs-6 text-center w-100 white-space-nowrap">
                {t('range detail')}:
              </p>
              <CustomSelect
                defaultButtonText={t('year')}
                defaultButtonValue="year"
                data={[
                  { name: 'year', _id: 'year' },
                  { name: 'month', _id: 'month' },
                ]}
                selectedValue={dateRangeMaxDetail}
                setSelectedValue={
                  setDateRangeMaxDetail as Dispatch<SetStateAction<string>>
                }
                fieldToSelect="name"
                withTranslate
                showDefaultValue={false}
              />
            </Col>
            <Col xs="12" sm="6" lg="4" className="max-width-220  p-1">
              <p className="mb-1 fs-6 text-center w-100 white-space-nowrap">
                {t('Select range')}:
              </p>
              <DateRangePicker
                onChange={setMonthsRange}
                maxDetail={dateRangeMaxDetail}
                value={monthsRange}
                locale={lang}
                calendarIcon={null}
                clearIcon={null}
                format="MM.y"
                minDetail="year"
                minDate={new Date(user.created)}
                maxDate={new Date()}
                className="data-range-picker"
                onFocus={(e: any) => (e.target.readOnly = true)}
                onClick={() => setIsDateRangeOpen(true)}
                onCalendarClose={() => setIsDateRangeOpen(false)}
                isOpen={isDateRangeOpen}
              />
            </Col>
          </Row>
        </>
      )}
      {numberOfTransactions ? (
        <>
          <p className="text-center fw-bold fs-4">{t('Your transactions')}</p>
          <InfiniteScroll
            initialLoad={false}
            loadMore={handleLoadMore}
            hasMore={numberToSkip <= numberOfTransactions}
            loader={<Loader key={0} />}>
            {transactionsSections.map((section) => (
              <React.Fragment key={section.title}>
                <p className="sectionTitle fs-5 w-75 mx-auto">
                  {section.title}
                </p>
                {section.data.map((transaction, index) => (
                  <TransactionListItem
                    key={transaction._id}
                    transaction={transaction}
                    setSelectedTransaction={setSelectedTransaction}
                  />
                ))}
              </React.Fragment>
            ))}
          </InfiniteScroll>
          {initialBalance && initialDateFrom && initialDateTo ? (
            <BackToStatisticsButton />
          ) : null}
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100 fw-bold my-3 mt-3 flex-column">
          <p className="fs-5 mb-2">{t('There is no transactions yet')}</p>
          <Button
            variant="warning"
            className="w300Px text-white"
            onClick={handleCreateTransaction}>
            {t('create transaction')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
