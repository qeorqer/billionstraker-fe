import { Balance } from 'features/balance/types';

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

export type CreateTransactionPayload = {
  transaction: Transaction;
  balanceId: string;
  balanceToSubtractId?: string;
};

export type CreateTransactionResponse = {
  message: string;
  transaction: Transaction;
  balances: Balance[];
};

export type GetTransactionsFilteringOptions = {
  shownTransactionsTypes: string;
  categoriesToShow: string[];
  balancesToShow: string[];
  from: Date;
  to: Date;
};

export type GetTransactionsPayload = {
  limit: number;
  numberToSkip: number;
  filteringOptions: GetTransactionsFilteringOptions;
};

export type GetTransactionsResponse = {
  transactions: Transaction[];
  numberOfTransactions?: number;
};

export type DeleteTransactionPayload = {
  transactionId: string;
};

export type DeleteTransactionResponse = {
  message: string;
  transactionId: string;
  balances: Balance[];
};

type TransactionsSection = {
  title: string;
  data: Transaction[];
};

export type TransactionsSections = TransactionsSection[];

export type TransactionTypesToShow =
  | 'all transactions'
  | 'profit'
  | 'expense'
  | 'exchange';

export type TransactionFormData = {
  title: string;
  sum: number | '';
  sum2?: number | '';
  categoryId?: string;
  date: Date;
  balanceId: string;
  balanceId2?: string;
};
