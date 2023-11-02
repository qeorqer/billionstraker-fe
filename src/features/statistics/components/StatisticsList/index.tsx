import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ExpenseIncome } from 'features/statistics/types';
import StatisticsListItem from 'features/statistics/components/StatisticsListItem';

type propsType = {
  statisticForRange: ExpenseIncome[];
  totalSpent: number;
  selectedBalance: string;
  monthsRange: Date[];
};

export type listForRangeItem = {
  title: string;
  value: number;
  percentage: number | string;
};

export const StatisticsList: FC<propsType> = ({
  statisticForRange,
  totalSpent,
  selectedBalance,
  monthsRange,
}) => {
  const { t } = useTranslation();

  const dataForRange: listForRangeItem[] = statisticForRange.map(
    (el, index) => ({
      title: el._id,
      value: el.total,
      percentage: Math.round((100 * el.total) / totalSpent) || '<1',
    }),
  );

  return (
    <div>
      <p style={{ fontSize: '14px' }}>
        {t('click on item to see transactions')}
      </p>
      {dataForRange
        .sort((a, b) => b.value - a.value)
        .map((listItem) => (
          <StatisticsListItem
            key={listItem.title}
            listItem={listItem}
            selectedBalance={selectedBalance}
            monthsRange={monthsRange}
          />
        ))}
    </div>
  );
};
