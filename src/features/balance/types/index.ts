export type Balance = {
  _id: string;
  name: string;
  amount: number;
  ownerId: string;
  currency: string;
};

export type CreateBalancePayload = {
  name: string;
  amount: number;
};

export type CreateBalanceResponse = {
  message: string;
  balance: Balance;
};

export type GetBalanceResponse = {
  message: string;
  balances: Balance[];
};

export type UpdateBalancePayload = {
  balanceId: string;
  balance: Balance;
};

export type DeleteBalancePayload = {
  balanceId: string;
};

export type DeleteBalanceResponse = {
  message: string;
  balanceId: string;
};
