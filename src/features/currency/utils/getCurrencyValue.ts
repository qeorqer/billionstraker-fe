import { currenciesList } from 'features/currency/constants';

export const getCurrencyValue = (lbl: string) => {
  const currency = currenciesList.find(({ label }) => label === lbl);

  if (currency) {
    return currency.value;
  }

  return undefined;
};
