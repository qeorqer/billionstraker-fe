import React, { FC, useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import ReactTooltip from 'react-tooltip';
import i18next from 'i18next';

import { expenseIncomeType } from 'types/statistic.type';
import { formattingNumber } from 'utils/formattingNumber';

type propsType = {
  statisticForRange: expenseIncomeType[];
  totalSpent: number;
};

const Diagram: FC<propsType> = ({ statisticForRange, totalSpent }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [statistic, setStatistic] = useState<expenseIncomeType[]>(statisticForRange);

  const colors = [
    '#E38627',
    '#C13C37',
    '#6A2135',
    '#E38627',
    '#C13C37',
    '#6A2135',
    '#E38627',
    '#C13C37',
    '#6A2135',
    '#E38627',
    '#C13C37',
    '#6A2135',
  ];

  type rangeDataType = {
    value: number;
    color: string;
    tooltip: string;
  };

  useEffect(() => {
    const formattedStatistic: expenseIncomeType[] = [];
    const otherItems: expenseIncomeType = {
      _id: i18next.t('other'),
      total: 0,
    };

    if (statisticForRange.length >= 5) {
      statisticForRange.forEach((item) => {
        const percentage = 100 * item.total / totalSpent;
        if (percentage < 5) {
          otherItems.total += item.total;
        } else {
          formattedStatistic.push(item);
        }
      });
    }

    if (otherItems.total > 0) {
      formattedStatistic.push(otherItems);
      setStatistic(formattedStatistic);
    }
  }, [statisticForRange, totalSpent]);

  const dataForRange: rangeDataType[] = statistic.map((el, index) => ({
    value: el.total,
    color: hovered === index ? 'grey' : colors[index],
    tooltip: `${el._id}, ${formattingNumber(el.total)}`,
  }));

  return (
    <>
      {totalSpent > 0 && (
        <>
          <PieChart
            data={dataForRange}
            style={{ height: '300px', width: '300px' }}
            segmentsShift={0.5}
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
            getContent={() =>
              typeof hovered == 'number'
                ? dataForRange[hovered]?.tooltip
                : null
            }
          />
        </>
      )}
    </>
  );
};

export default Diagram;
