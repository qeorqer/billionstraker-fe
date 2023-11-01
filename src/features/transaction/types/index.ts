import { balanceType } from 'types/balance.type';

export type TransactionType = 'expense' | 'profit' | 'exchange';

export type Transaction = {
  title: string;
  ownerId?: string;
  sum: number;
  sumToSubtract?: number;
  category?: string;
  date: Date;
  balance: string;
  balanceToSubtract?: string;
  transactionType: TransactionType;
  _id?: string;
};

export type SubmitTransaction = {
  transaction: Transaction;
  balanceId: string;
  balanceToSubtractId?: string;
};

export type AddTransactionResponse = {
  message: string;
  transaction: Transaction;
  balances: balanceType[];
};

export type GetTransactions = {
  limit: number;
  numberToSkip: number;
  filteringOptions: {
    shownTransactionsTypes: string;
    categoriesToShow: string[];
    balancesToShow: string[];
    from: Date;
    to: Date;
  };
};

export type GetTransactionsResponse = {
  transactions: Transaction[];
  numberOfTransactions?: number;
};

export type DeleteTransactionResponse = {
  message: string;
  transactionId: string;
  balances: balanceType[];
};

type TransactionsSection = {
  title: string;
  data: Transaction[];
};

export type TransactionsSections = TransactionsSection[];
