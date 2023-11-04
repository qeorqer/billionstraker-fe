import { getListOfAllCurrencies } from 'features/currency/utils/getListOfAllCurrencies';

export const getCurrencyLabel = (val: string) => {
  const currency = getListOfAllCurrencies().find(({ value }) => val === value);

  if (currency) {
    return currency.label;
  }

  return undefined;
};
