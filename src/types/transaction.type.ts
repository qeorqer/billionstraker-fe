import { userType } from './user.type';

export type transactionType = {
  title: string;
  ownerId: string;
  isCard: boolean;
  isExpense: boolean;
  sum: number;
  category: string;
  date: Date;
  _id?: string;
};

export type addTransactionResponseType = {
  messageRu: string;
  messageEn: string;
  updatedUser: userType;
};

export type getTransactionsResponseType = {
  transactions: transactionType[];
  numberOfTransactions?: number;
};

export type transactionTypes = 'expense' | 'profit' | 'exchange';
