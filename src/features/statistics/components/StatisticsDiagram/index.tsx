import React, { FC, useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import ReactTooltip from 'react-tooltip';
import i18next from 'i18next';
import Decimal from 'decimal.js';

import { ExpenseIncome } from 'features/statistics/types';
import { formattingSum } from 'features/transaction/utils/formattingSum';

type propsType = {
  statisticForRange: ExpenseIncome[];
  totalSpent: number;
};

type RangeData = {
  value: number;
  color: string;
  tooltip: string;
};

const StatisticsDiagram: FC<propsType> = ({
  statisticForRange,
  totalSpent,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [statistic, setStatistic] = useState<RangeData[]>([]);

  const colors = ['#E38627', '#C13C37', '#6A2135'];

  useEffect(() => {
    let formattedStatistic: ExpenseIncome[] = statisticForRange;
    const otherItems: ExpenseIncome = {
      _id: i18next.t('other'),
      total: 0,
    };

    if (statisticForRange.length >= 5) {
      formattedStatistic = [];

      statisticForRange.forEach((item) => {
        const percentage = (100 * item.total) / totalSpent;
        if (percentage < 5) {
          otherItems.total = Decimal.add(
            otherItems.total,
            item.total,
          ).toNumber();
        } else {
          formattedStatistic.push(item);
        }
      });
    }

    if (otherItems.total > 0) {
      formattedStatistic.push(otherItems);
    }

    setStatistic(
      formattedStatistic.map((el, index) => ({
        value: el.total,
        color: hovered === index ? '#9bb4c0' : colors[index % colors.length],
        tooltip: `${el._id}, ${formattingSum(el.total)}`,
      })),
    );
  }, [statisticForRange, totalSpent, hovered]);

  if (totalSpent <= 0) {
    return null;
  }

  return (
    <div data-tip="" data-for="chart">
      <PieChart
        data={statistic}
        style={{ height: '300px', width: '100%' }}
        label={({ dataEntry }) =>
          `${
            Math.round(dataEntry.percentage)
              ? Math.round(dataEntry.percentage)
              : '<1'
          }%`
        }
        totalValue={totalSpent}
        labelStyle={{
          fontSize: '5px',
          fill: 'white',
        }}
        onMouseOver={(el, index) => {
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(null);
        }}
        segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      />
      <ReactTooltip
        id="chart"
        getContent={() =>
          typeof hovered == 'number' ? statistic[hovered]?.tooltip : null
        }
      />
    </div>
  );
};

export default StatisticsDiagram;
