import { balanceType } from 'types/balance.type';

export type transactionTypes = 'expense' | 'profit' | 'exchange';

export type transactionType = {
  title: string;
  ownerId?: string;
  sum: number;
  sumToSubtract?: number;
  category?: string;
  date: Date;
  balance: String;
  balanceToSubtract?: String;
  transactionType: transactionTypes;
  _id?: string;
};

export type addTransactionResponseType = {
  message: string;
  transaction: transactionType;
  balances: balanceType[];
};

export type getTransactionsResponseType = {
  transactions: transactionType[];
  numberOfTransactions?: number;
};

type transactionsSectionType = {
  title: string;
  data: transactionType[];
};

export type transactionsSectionsType = transactionsSectionType[];
