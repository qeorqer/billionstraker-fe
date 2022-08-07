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
): transactionsSectionsType => {
  const result: transactionsSectionsType = [
    {
      title: 'today',
      data: [],
    },
    {
      title: 'this week',
      data: [],
    },
    {
      title: 'this month',
      data: [],
    },
    {
      title: 'before this month',
      data: [],
    },
  ];

  transactions.forEach((transaction) => {
    const isToday = moment().isSame(transaction.date, 'day');
    const isThisWeek = moment().isSame(transaction.date, 'week');
    const isThisMonth = moment().isSame(transaction.date, 'month');

    if (isToday) {
      result[0].data.push(transaction);
    } else if (isThisWeek) {
      result[1].data.push(transaction);
    } else if (isThisMonth) {
      result[2].data.push(transaction);
    } else {
      result[3].data.push(transaction);
    }
  });

  return result.filter((section) => section.data.length);
};
