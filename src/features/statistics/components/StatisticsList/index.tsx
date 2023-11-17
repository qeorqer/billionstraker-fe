import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Value } from '@wojtekmaj/react-daterange-picker/src/shared/types';

import { RangeStatisticsItem } from 'features/statistics/types';
import StatisticsListItem from 'features/statistics/components/StatisticsListItem';

type propsType = {
  statisticForRange: RangeStatisticsItem[];
  totalSpent: number;
  selectedBalance: string;
  monthsRange: [Date, Date];
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
      title: el.name,
      value: el.amount,
      percentage: ((100 * el.amount) / totalSpent).toFixed(2),
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
