import React, { FC, useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import ReactTooltip from 'react-tooltip';
import i18next from 'i18next';
import Decimal from 'decimal.js';

import { CategoryStatistics } from 'features/statistics/types';
import { formattingSum } from 'features/transaction/utils/formattingSum';

type propsType = {
  statisticForRange: CategoryStatistics[];
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
    let formattedStatistic: CategoryStatistics[] = statisticForRange;
    const otherItems: CategoryStatistics = {
      name: i18next.t('other'),
      amount: 0,
    };

    if (statisticForRange.length >= 5) {
      formattedStatistic = [];

      statisticForRange.forEach((item) => {
        const percentage = (100 * item.amount) / totalSpent;
        if (percentage < 5) {
          otherItems.amount = Decimal.add(
            otherItems.amount,
            item.amount,
          ).toNumber();
        } else {
          formattedStatistic.push(item);
        }
      });
    }

    if (otherItems.amount > 0) {
      formattedStatistic.push(otherItems);
    }

    setStatistic(
      formattedStatistic.map((el, index) => ({
        value: el.amount,
        color: hovered === index ? '#9bb4c0' : colors[index % colors.length],
        tooltip: `${el.name}, ${formattingSum(el.amount)}`,
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
