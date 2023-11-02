import React, { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import StatisticsDiagram from 'features/statistics/components/StatisticsDiagram';
import { StatisticsList } from 'features/statistics/components/StatisticsList';
import { StatisticsForBalance } from 'features/statistics/types';
import { formattingSum } from 'features/transaction/utils/formattingSum';

import 'features/statistics/components/RangeStatisticsItem/styles.scss';

type propsType = {
  statisticsForRange: StatisticsForBalance;
  type: 'expense' | 'income';
  selectedBalance: string;
  monthsRange: Date[];
};

const RangeStatisticsItem: FC<propsType> = ({
  statisticsForRange,
  type,
  selectedBalance,
  monthsRange,
}) => {
  const { t } = useTranslation();
  const [useDiagram, setUseDiagram] = useState<boolean>(true);

  const fieldsToUse = {
    totalValue:
      type === 'expense'
        ? statisticsForRange.totallySpent
        : statisticsForRange.totallyEarned,
    statisticsInRange:
      type === 'expense'
        ? statisticsForRange.expensesInRange
        : statisticsForRange.profitsInRange,
  };

  return (
    <>
      {fieldsToUse.totalValue > 0 && (
        <div className="rangeHolderControls mb-3">
          <Button
            size="sm"
            className={`mx-2 ${useDiagram ? 'text-white' : ''}`}
            variant={useDiagram ? 'warning' : 'outline-warning'}
            onClick={() => setUseDiagram(true)}>
            {t('Pie chart')}
          </Button>
          <Button
            size="sm"
            className={useDiagram ? '' : 'text-white'}
            variant={useDiagram ? 'outline-warning' : 'warning'}
            onClick={() => setUseDiagram(false)}>
            {t('List')}
          </Button>
        </div>
      )}
      <p className="fw-bold">
        {t(
          type === 'expense'
            ? 'Spent during this period'
            : 'Earned during this period',
        )}
        :
        <span className="fst-italic yellowText">
          {' '}
          {formattingSum(fieldsToUse.totalValue)}
        </span>
      </p>
      {useDiagram ? (
        <StatisticsDiagram
          totalSpent={fieldsToUse.totalValue}
          statisticForRange={fieldsToUse.statisticsInRange}
        />
      ) : (
        <StatisticsList
          selectedBalance={selectedBalance}
          monthsRange={monthsRange}
          totalSpent={fieldsToUse.totalValue}
          statisticForRange={fieldsToUse.statisticsInRange}
        />
      )}
    </>
  );
};

export default RangeStatisticsItem;
