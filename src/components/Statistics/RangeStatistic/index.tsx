import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
//@ts-ignore
//todo: learn how to work when there is no ts for library
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import Loader from 'components/Loader';
import Diagram from 'components/Statistics/Diagram';
import { List } from 'components/Statistics/List';
import { useAppSelector } from 'hooks/react-redux.hook';
import { statisticData, userData } from 'store/selectors';
import { getStatisticsForBalanceType } from 'types/statistic.type';
import CustomSelect from 'components/CustomSelect';

import './styles.scss';

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
  const { lang, user } = useAppSelector(userData);

  const { isStatisticsForBalanceLoading } = useAppSelector(statisticData);
  const { balances } = useAppSelector((state) => state.balanceData);

  const [useDiagram, setUseDiagram] = useState<boolean>(true);

  return (
    <>
      <Row className='d-flex justify-content-center text-center white-space-nowrap'>
        <Col xs={12} md={6} lg={3}>
          <p className='fs-5 mb-1 fw-bold text-center'>{t('Select range')}:</p>
          <DateRangePicker
            onChange={setMonthsRange}
            maxDetail='year'
            value={monthsRange}
            locale={lang}
            calendarIcon={null}
            clearIcon={null}
            format='MM.y'
            minDetail='year'
            minDate={new Date(user.created)}
            maxDate={new Date()}
            className='data-range-picker'
          />
        </Col>
        <Col xs={12} md={6} lg={3} className="max-width-220">
          <p className='fs-5 mb-1 fw-bold text-center white-space-nowrap'>
            {t('select balance')}
          </p>
          <CustomSelect
            defaultButtonText={t('select balance')}
            defaultButtonValue=''
            data={balances.map((balance) => ({
              _id: balance._id,
              name: balance.name,
            }))}
            selectedValue={balance}
            setSelectedValue={setBalance}
            fieldToSelect='name'
          />
        </Col>
      </Row>
      {
        statisticsForRange ? (
          <div className='rangeHolder mt-3 text-center' data-tip='chart'>
            {statisticsForRange.totallySpent > 0 && (
              <div className='rangeHolderControls mb-3'>
                <Button
                  size='sm'
                  className={`mx-2 ${useDiagram ? 'text-white' : ''}`}
                  variant={useDiagram ? 'warning' : 'outline-warning'}
                  onClick={() => setUseDiagram(true)}
                >
                  {t('Pie chart')}
                </Button>
                <Button
                  size='sm'
                  className={useDiagram ? '' : 'text-white'}
                  variant={useDiagram ? 'outline-warning' : 'warning'}
                  onClick={() => setUseDiagram(false)}
                >
                  {t('List')}
                </Button>
              </div>
            )}
            {isStatisticsForBalanceLoading ? (
              <Loader />
            ) : (
              <>
                <p className='fw-bold'>
                  {t('Spent during this period')}:
                  <span className='fst-italic yellowText'>
                {' '}
                    {statisticsForRange.totallySpent}
              </span>
                </p>
                {useDiagram ? (
                  <Diagram
                    totalSpent={statisticsForRange.totallySpent}
                    statisticForRange={statisticsForRange.expensesInRange}
                  />
                ) : (
                  <List
                    totalSpent={statisticsForRange.totallySpent}
                    statisticForRange={statisticsForRange.expensesInRange}
                  />
                )}
              </>
            )}
          </div>
        ) : (
          <div
            className='d-flex justify-content-center align-items-center h-100 fw-bold my-3 my-md-0 '>
            <p>{t('Some of your statistic will be here')}</p>
          </div>
        )
      }
    </>
  )
    ;
};

export default RangeStatistic;
