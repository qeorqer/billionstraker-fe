import { balanceType } from 'types/balance.type';

export type transactionTypes = 'expense' | 'profit' | 'exchange';

export type transactionType = {
  title: string;
  ownerId?: string;
  sum: number;
  sumToSubtract?: number;
  category?: string;
  date: Date;
  balance: string;
  balanceToSubtract?: string;
  transactionType: transactionTypes;
  _id?: string;
};

export type submitTransactionType = {
  transaction: transactionType;
  balanceId: string;
  balanceToSubtractId?: string;
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

export type deleteTransactionResponseType = {
  message: string;
  transactionId: string;
  balances: balanceType[];
};

type transactionsSectionType = {
  title: string;
  data: transactionType[];
};

export type transactionsSectionsType = transactionsSectionType[];
