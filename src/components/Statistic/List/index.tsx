import React, { FC } from 'react';

import { expenseIncomeType } from 'types/statistic.type';
import ListItem from 'components/Statistic/ListItem';

type propsType = {
  statisticForRange: expenseIncomeType[];
  totalSpent: number;
};

export type listForRangeItem = {
  title: string;
  value: number;
  percentage: number | string;
};

export const List: FC<propsType> = ({ statisticForRange, totalSpent }) => {
  const dataForRange: listForRangeItem[] = statisticForRange.map(
    (el, index) => ({
      title: el._id.name,
      value: el.total,
      percentage: Math.round((100 * el.total) / totalSpent) || '>1',
    }),
  );

  return (
    <div>
      {dataForRange
        .sort((a, b) => b.value - a.value)
        .map((listItem) => (
          <ListItem key={listItem.title} listItem={listItem} />
        ))}
    </div>
  );
};
