import moment from 'moment';

import { TransactionsSections, Transaction } from 'features/transaction/types';

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
  transactions: Transaction[],
  lang: string,
): TransactionsSections => {
  const result: TransactionsSections = [];

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

  // @ts-ignore
  result.sort((a, b) => new Date(b.title) - new Date(a.title));

  return result.filter((section) => section.data.length);
};
