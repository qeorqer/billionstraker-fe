import { useAppSelector } from 'store/hooks';
import { balanceData } from 'features/balance';
import { formatSum } from 'features/transaction/utils/formatSum';

export const useFormatSumByBalanceName = () => {
  const { balances } = useAppSelector(balanceData);

  const formatSumByBalanceName = (sum: number, balanceName: string) => {
    const formattedSum = formatSum(sum);

    const balance = balances.find(({ name }) => name === balanceName);

    return balance
      ? `${formattedSum} ${balance.currency.toUpperCase()}`
      : formattedSum;
  };

  return {
    formatSumByBalanceName,
  };
};
