import moment from 'moment';

import {
  transactionsSectionsType,
  transactionType,
} from 'types/transaction.type';

export type transactionTypesToShowType =
  | 'all transactions'
  | 'profit'
  | 'expense'
  | 'exchange';

export const transactionTypesToShow: transactionTypesToShowType[] = [
  'profit',
  'expense',
  'exchange',
];

export const formTransactionsSections = (
  transactions: transactionType[],
  lang: string,
): transactionsSectionsType => {
  const result: transactionsSectionsType = [];

  transactions.forEach((transaction) => {
    const date = moment(transaction.date).locale(lang).format('LL');
    const isSectionExists = result.find((section) => section.title === date);

    if (isSectionExists) {
      isSectionExists.data.push(transaction);
    } else {
      result.push({
        title: date,
        data: [transaction],
      });
    }
  });

  return result.filter((section) => section.data.length);
};
