import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
//@ts-ignore
//todo: This library has an awful typing, but check it once in a while
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import Loader from 'components/Loader';
import { useAppSelector } from 'hooks/react-redux.hook';
import { statisticData, userData } from 'store/selectors';
import { getStatisticsForBalanceType } from 'types/statistic.type';
import CustomSelect from 'components/CustomSelect';
import RangeStatisticsItem from 'components/Statistics/RangeStatisticsItem';

import './styles.scss';
import { useHistory } from 'react-router-dom';

type propsType = {
  statisticsForRange: getStatisticsForBalanceType | null;
  setMonthsRange: React.Dispatch<React.SetStateAction<Date[]>>;
  monthsRange: Date[];
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
  const { t } = useTranslation();
  const { push } = useHistory();

  const { lang, user } = useAppSelector(userData);
  const { isStatisticsForBalanceLoading } = useAppSelector(statisticData);
  const { balances } = useAppSelector((state) => state.balanceData);
  const [dateRangeMaxDetail, setDateRangeMaxDetail] = useState<
    'year' | 'month'
  >('year');

  const handleCreateTransaction = () => push('createTransaction');

  return (
    <>
      <Row className="d-flex justify-content-center text-center white-space-nowrap">
        <Col xs={12} sm={6} lg={4} className="max-width-220">
          <p className="mb-1 fw-bold text-center">{t('Select range')}:</p>
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
          />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="max-width-220 mx-md-2 mt-2 mt-sm-0">
          <p className="mb-1 fw-bold text-center">{t('range detail')}:</p>
          <Form.Control
            as="select"
            value={dateRangeMaxDetail}
            onChange={(event) =>
              setDateRangeMaxDetail(event.target.value as 'year' | 'month')
            }>
            <option value="year">{t('year')}</option>
            <option value="month">{t('month')}</option>
          </Form.Control>
        </Col>
        <Col xs={12} lg={4} className="max-width-220 mt-2 mt-sm-0">
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
                  statisticsForRange={statisticsForRange}
                  type="expense"
                />
              </Col>
              <Col xs={12} md={6}>
                <RangeStatisticsItem
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
