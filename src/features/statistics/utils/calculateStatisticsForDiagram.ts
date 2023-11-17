import { DiagramPiece, RangeStatisticsItem } from 'features/statistics/types';
import i18next from 'i18next';
import Decimal from 'decimal.js';
import { formattingSum } from 'features/transaction/utils/formattingSum';

const colors = ['#E38627', '#C13C37', '#832942'];

export const calculateStatisticsForDiagram = (
  statistics: RangeStatisticsItem[],
  totallySpent: number,
  hovered: number | null,
): DiagramPiece[] => {
  let numberOfItemsWithSmallPercentage = 0;
  const otherItems: RangeStatisticsItem = {
    name: i18next.t('other'),
    amount: 0,
  };

  const result = statistics.reduce((acc, item) => {
    const percentage = (100 * item.amount) / totallySpent;

    if (statistics.length >= 7 && percentage < 5) {
      otherItems.amount = Decimal.add(
        otherItems.amount,
        item.amount,
      ).toNumber();
    } else {
      acc.push(item);
    }

    return acc;
  }, [] as RangeStatisticsItem[]);

  if (otherItems.amount > 0) {
    result.push(otherItems);
  }

  const formattedResult = result.map((el, index, array) => {
    const percentage = (100 * el.amount) / totallySpent;
    const percentageToFixed = percentage.toFixed(2);
    const isPercentageLessThan1 = percentage < 1;

    if (isPercentageLessThan1) {
      numberOfItemsWithSmallPercentage++;
    }

    return {
      value: isPercentageLessThan1 ? totallySpent * 0.01 : el.amount,
      color: hovered === index ? '#31333C' : colors[index % colors.length],
      tooltip: `${el.name}, ${formattingSum(el.amount)}, ${percentageToFixed}%`,
    };
  });

  if (numberOfItemsWithSmallPercentage) {
    formattedResult[0].value -=
      totallySpent * 0.01 * numberOfItemsWithSmallPercentage;
  }

  return formattedResult;
};
