import { RangeStatisticsItem } from 'features/statistics/types';
import i18next from 'i18next';
import Decimal from 'decimal.js';
import { DonutChartCell } from '@mantine/charts';

const colors = [
  '#F7C41F',
  '#E75454',
  '#EE8C8B',
  '#8B5EB0',
  '#A989C5',
  '#F9D45C',
  '#689636',
  '#89BE4D',
  '#237FD2',
  '#519EE3',
];

type CalculateStatisticsForDiagramOptions = {
  statistics: RangeStatisticsItem[];
  totallySpent: number;
};

export const formatStatisticsForChart = ({
  statistics,
  totallySpent,
}: CalculateStatisticsForDiagramOptions): DonutChartCell[] => {
  let numberOfItemsWithSmallPercentage = 0;
  const otherItems: DonutChartCell = {
    name: i18next.t('other'),
    value: 0,
    color: 'gray.6',
  };

  const result = statistics
    .concat([])
    .sort((a, b) => Number(b.amount) - Number(a.amount))
    .reduce((acc, item) => {
      const percentage = (100 * item.amount) / totallySpent;

      if (statistics.length >= 7 && percentage < 3.5) {
        otherItems.value = Decimal.add(
          otherItems.value,
          item.amount,
        ).toNumber();
      } else {
        acc.push({
          name: item.name,
          value: item.amount,
          color: colors[acc.length % colors.length],
        });
      }

      return acc;
    }, [] as DonutChartCell[]);

  if (otherItems.value > 0) {
    result.push(otherItems);
  }

  const formattedResult = result.map((el) => {
    const percentage = (100 * el.value) / totallySpent;
    const isPercentageLessThan1 = percentage < 1;

    if (isPercentageLessThan1) {
      numberOfItemsWithSmallPercentage++;
    }

    return {
      ...el,
      value: isPercentageLessThan1 ? totallySpent * 0.01 : el.value,
    };
  });

  if (numberOfItemsWithSmallPercentage) {
    formattedResult[0].value -=
      totallySpent * 0.01 * numberOfItemsWithSmallPercentage;
  }

  return formattedResult;
};
