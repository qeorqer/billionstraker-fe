import { PieChart } from 'react-minimal-pie-chart';
import ReactTooltip from 'react-tooltip';
import React, { FC, useState } from 'react';
import { expenseIncomeType } from '../../types/statistic.type';
import { useAppSelector } from '../../hooks/react-redux.hook';
import { userData } from '../../store/selectors';
import { formattingNumber } from '../../utils/formattingNumber.js';

type propsType = {
  statisticForRange: expenseIncomeType[];
  totalSpent: number;
};

const Diagram: FC<propsType> = ({ statisticForRange, totalSpent }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const { lang } = useAppSelector(userData);

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

  const dataForRange: rangeDataType[] = statisticForRange.map((el, index) => ({
    value: el.total,
    color: hovered === index ? 'grey' : colors[index],
    tooltip: `${
      lang === 'en' ? el._id.nameEn : el._id.nameRu
    }, ${formattingNumber(el.total)}`,
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
                  : '>1'
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
              typeof hovered === 'number'
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
