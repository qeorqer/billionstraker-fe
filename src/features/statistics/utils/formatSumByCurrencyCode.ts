import { formatSum } from 'features/transaction/utils/formatSum';

export const formatSumByCurrencyCode = (sum: number, currencyCode: string) => {
  const formattedSum = formatSum(sum);

  return `${formattedSum} ${currencyCode.toUpperCase()}`;
};
