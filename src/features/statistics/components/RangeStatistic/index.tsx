import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import Loader from 'components/Shared/Loader';
import { useAppSelector } from 'store/hooks';
import { statisticsData } from 'features/statistics/store/selector';
import { userData } from 'features/user';
import { StatisticsForBalance } from 'features/statistics/types';
import CustomSelect from 'components/Shared/CustomSelect';
import RangeStatisticsItem from 'features/statistics/components/RangeStatisticsItem';
import { balanceData } from 'features/balance';

import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import './styles.scss';

type propsType = {
  statisticsForRange: StatisticsForBalance | null;
  setMonthsRange: React.Dispatch<React.SetStateAction<[Date, Date]>>;
  monthsRange: [Date, Date];
  balance: string;
  setBalance: Dispatch<SetStateAction<string>>;
};

const RangeStatistic: FC<propsType> = ({
  statisticsForRange,
  monthsRange,
  setMonthsRange,
  balance,
  setBalance,
}) => {
  const [dateRangeMaxDetail, setDateRangeMaxDetail] = useState<
    'year' | 'month'
  >('year');
  const [isDateRangeOpen, setIsDateRangeOpen] = useState<boolean>(false);

  const { t } = useTranslation();
  const { push } = useHistory();

  const { lang, user } = useAppSelector(userData);
  const { isStatisticsForBalanceLoading } = useAppSelector(statisticsData);
  const { balances } = useAppSelector(balanceData);

  const handleCreateTransaction = () => push('createTransaction');

  return (
    <>
      <Row className="d-flex justify-content-center text-center white-space-nowrap">
        <Col xs={12} sm={6} lg={4} className="max-width-220 p-1">
          <p className="mb-1 fw-bold text-center">{t('Select range')}:</p>
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
            onClick={() => setIsDateRangeOpen(true)}
            onCalendarClose={() => setIsDateRangeOpen(false)}
            className="data-range-picker w-100 cursor-pointer"
            onFocus={(e: any) => (e.target.readOnly = true)}
            isOpen={isDateRangeOpen}
          />
        </Col>
        <Col xs={12} sm={6} lg={4} className="max-width-220 p-1">
          <p className="mb-1 fw-bold text-center">{t('range detail')}:</p>
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
        <Col xs={12} lg={4} className="max-width-220 p-1">
          <p className="mb-1 fw-bold text-center white-space-nowrap">
            {t('select balance')}
          </p>
          <CustomSelect
            defaultButtonText={t('select balance')}
            defaultButtonValue=""
            data={balances.map((balance) => ({
              _id: balance._id,
              name: balance.name,
            }))}
            selectedValue={balance}
            setSelectedValue={setBalance}
            fieldToSelect="name"
          />
        </Col>
      </Row>
      {statisticsForRange ? (
        <Row className="rangeHolder mt-3 text-center">
          {isStatisticsForBalanceLoading ? (
            <Loader />
          ) : (
            <>
              <Col xs={12} md={6} className="mb-5 mb-md-0">
                <RangeStatisticsItem
                  selectedBalance={balance}
                  monthsRange={monthsRange}
                  statisticsForRange={statisticsForRange}
                  type="expense"
                />
              </Col>
              <Col xs={12} md={6}>
                <RangeStatisticsItem
                  selectedBalance={balance}
                  monthsRange={monthsRange}
                  statisticsForRange={statisticsForRange}
                  type="income"
                />
              </Col>
            </>
          )}
        </Row>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100 fw-bold my-3 flex-column">
          <p className="mb-2">{t('Some of your statistic will be here')}</p>
          <Button
            variant="warning"
            className="w300Px text-white"
            onClick={handleCreateTransaction}>
            {t('create transaction')}
          </Button>
        </div>
      )}
    </>
  );
};

export default RangeStatistic;
