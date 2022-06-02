import React, { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import Loader from '../loader/Loader';
import Diagram from './Diagram';
import { List } from './List';
//@ts-ignore
//todo: learn how to work when there is no ts for library
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { useAppSelector } from '../../hooks/react-redux.hook';
import { useTranslation } from 'react-i18next';
import { statisticData } from '../../store/selectors';
import { statisticForRangeType } from '../../types/statistic.type';
import './rangeStatistic.scss';

type propsType = {
  statisticForRange: statisticForRangeType;
  setMonthsRange: React.Dispatch<React.SetStateAction<Date[]>>;
  monthsRange: Date[];
};

const RangeStatistic: FC<propsType> = ({
  statisticForRange,
  monthsRange,
  setMonthsRange,
}) => {
  const { t } = useTranslation();
  const { isStatisticForRangeLoading } = useAppSelector(statisticData);
  const [useDiagram, setUseDiagram] = useState<boolean>(true);

  return (
    <>
      <p className="fs-5 mb-0 fw-bold text-center">{t('Select range')}:</p>
      <div className="d-flex justify-content-center">
        <DateRangePicker
          onChange={setMonthsRange}
          maxDetail="year"
          value={monthsRange}
          locale="en"
          calendarIcon={null}
          clearIcon={null}
          format="MM.y"
          minDetail="year"
          minDate={new Date(2021, 3, 1)}
          maxDate={new Date()}
        />
      </div>
      <div className="rangeHolder mt-3 text-center" data-tip="chart">
        {statisticForRange.totalSpent > 0 && (
          <div className="rangeHolderControls mb-3">
            <Button
              size="sm"
              className={`mx-2 ${useDiagram ? 'text-white' : ''}`}
              variant={useDiagram ? 'warning' : 'outline-warning'}
              onClick={() => setUseDiagram(true)}
            >
              {t('Pie chart')}
            </Button>
            <Button
              size="sm"
              className={useDiagram ? '' : 'text-white'}
              variant={useDiagram ? 'outline-warning' : 'warning'}
              onClick={() => setUseDiagram(false)}
            >
              {t('List')}
            </Button>
          </div>
        )}
        {isStatisticForRangeLoading ? (
          <Loader />
        ) : (
          <>
            <p className="fw-bold">
              {t('Spent during this period')}:
              <span className="fst-italic yellowText">
                {' '}
                {statisticForRange.totalSpent}
              </span>
            </p>
            {useDiagram ? (
              <Diagram
                totalSpent={statisticForRange.totalSpent}
                statisticForRange={statisticForRange.transactionsInRange}
              />
            ) : (
              <List
                totalSpent={statisticForRange.totalSpent}
                statisticForRange={statisticForRange.transactionsInRange}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default RangeStatistic;
