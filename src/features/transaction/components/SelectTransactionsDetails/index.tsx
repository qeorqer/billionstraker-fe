import { Col, Row, Stack } from 'react-bootstrap';
import CustomSelect from 'components/Shared/CustomSelect';
import { Category, categoryData } from 'features/category';
import { Balance, balanceData } from 'features/balance';
import { transactionTypesToShow } from 'features/transaction/components/TransactionsList/utils';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { useAppSelector } from 'store/hooks';
import { transactionData } from 'features/transaction/store/selector';
import { TransactionTypesToShow } from 'features/transaction/types';
import { useTranslation } from 'react-i18next';
import { userData } from 'features/user';

type SelectTransactionsDetailsProps = {
  shownTransactionsTypes: TransactionTypesToShow;
  setShownTransactionsTypes: Dispatch<SetStateAction<TransactionTypesToShow>>;
  categoriesToShow: string;
  balancesToShow: string;
  setCategoriesToShow: Dispatch<SetStateAction<string>>;
  setBalancesToShow: Dispatch<SetStateAction<string>>;
  setMonthsRange: React.Dispatch<React.SetStateAction<[Date, Date]>>;
  monthsRange: [Date, Date];
};

const SelectTransactionsDetails: FC<SelectTransactionsDetailsProps> = ({
  shownTransactionsTypes,
  categoriesToShow,
  balancesToShow,
  setCategoriesToShow,
  setBalancesToShow,
  setShownTransactionsTypes,
  setMonthsRange,
  monthsRange,
}) => {
  const [isDateRangeOpen, setIsDateRangeOpen] = useState<boolean>(false);
  const [dateRangeMaxDetail, setDateRangeMaxDetail] = useState<
    'year' | 'month'
  >('year');

  const { lang, user } = useAppSelector(userData);
  const { balances } = useAppSelector(balanceData);
  const { categories } = useAppSelector(categoryData);
  const { t } = useTranslation();
  const { isLoadingTransactions, transactions, numberOfTransactions } =
    useAppSelector(transactionData);

  if (
    !numberOfTransactions &&
    shownTransactionsTypes === 'all transactions' &&
    !categoriesToShow.length &&
    !balancesToShow.length &&
    !isLoadingTransactions
  ) {
    return null;
  }

  return (
    <Stack gap={1}>
      <p className="text-center fw-bold fs-4 mb-0">{t('apply filters')}</p>
      <Row className="mb-3 align-items-center justify-content-center">
        <Col xs="6" sm="4" className="max-width-220 p-1">
          <p className="mb-1 fs-6 text-center w-100 white-space-nowrap">
            {t('categories')}:
          </p>
          <CustomSelect
            defaultButtonText={t('show all')}
            defaultButtonValue="all"
            data={categories
              .filter((category: Category) => {
                if (shownTransactionsTypes === 'all transactions') {
                  return category;
                }

                return category.categoryType === shownTransactionsTypes;
              })
              .map((category: Category) => ({
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
            {t('balances')}:
          </p>
          <CustomSelect
            defaultButtonText={t('show all')}
            defaultButtonValue="all"
            data={balances.map((balance: Balance) => ({
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
            autoFocus={false}
            onChange={(newValue) => setMonthsRange(newValue as [Date, Date])}
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
    </Stack>
  );
};

export default SelectTransactionsDetails;
