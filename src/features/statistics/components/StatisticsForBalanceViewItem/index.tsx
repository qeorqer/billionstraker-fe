import React, { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import DiagramStatistics from 'features/statistics/components/DiagramStatistics';
import { StatisticsList } from 'features/statistics/components/StatisticsList';
import { Statistics } from 'features/statistics/types';
import { formattingSum } from 'features/transaction/utils/formattingSum';

import './styles.scss';

type propsType = {
  statisticsForRange: Statistics;
  type: 'expense' | 'income';
  selectedBalance: string;
  monthsRange: [Date, Date];
};

const StatisticsForBalanceViewItem: FC<propsType> = ({
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
        ? statisticsForRange.expenses.total
        : statisticsForRange.profits.total,
    statisticsInRange:
      type === 'expense'
        ? statisticsForRange.expenses.categoryRange
        : statisticsForRange.profits.categoryRange,
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
          {` ${formattingSum(fieldsToUse.totalValue)}`}
        </span>
      </p>
      {useDiagram ? (
        <DiagramStatistics
          totallySpent={fieldsToUse.totalValue}
          rangeStatistics={fieldsToUse.statisticsInRange}
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

export default StatisticsForBalanceViewItem;
