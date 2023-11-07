import { currenciesList } from 'features/currency/constants';

export const getCurrencyLabel = (val: string) => {
  const currency = currenciesList.find(({ value }) => val === value);

  if (currency) {
    return currency.label;
  }

  return undefined;
};
