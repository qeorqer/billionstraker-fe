import { userType } from "./user.type";

export type transactionType = {
  title: string,
  ownerId: string,
  isCard: boolean,
  isExpense: boolean,
  sum: number,
  category: string,
  date: Date,
  _id?: string,
}

export type addTransactionResponseType = {
  message: string,
  updatedUser: userType
}

export type getTransactionsResponseType = {
  transactions: transactionType[],
  numberOfTransactions?: number
}
