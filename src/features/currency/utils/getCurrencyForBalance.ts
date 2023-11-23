import { Balance } from 'features/balance';

export const GetCurrencyForBalance = (
  balances: Balance[],
  balanceName: string,
) => {
  const balance = balances.find(({ name }) => balanceName === name);

  return String(balance?.currency ?? '').toUpperCase();
};
