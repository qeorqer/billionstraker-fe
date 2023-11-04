import { data as fiatCurrencies } from 'currency-codes';
import { cryptocurrenciesList, CurrencyOption } from 'features/currency';

const preferredCurrencies = ['UAH', 'EUR', 'USD', 'USDT', 'BTC'];

export const getListOfAllCurrencies = (): CurrencyOption[] => {
  const formattedFiatCurrencies: CurrencyOption[] = fiatCurrencies.map(
    ({ currency, code }) => ({ label: `${currency} (${code})`, value: code }),
  );

  const combinedCurrencies = [
    ...formattedFiatCurrencies,
    ...cryptocurrenciesList,
  ];

  const sortedCurrencies = combinedCurrencies.sort(
    ({ value: aValue }, { value: bValue }) => {
      if (
        preferredCurrencies.includes(aValue) &&
        !preferredCurrencies.includes(bValue)
      ) {
        return -1;
      } else if (
        !preferredCurrencies.includes(aValue) &&
        preferredCurrencies.includes(bValue)
      ) {
        return 1;
      }

      return 0;
    },
  );

  return sortedCurrencies;
};
