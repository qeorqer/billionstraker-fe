export type Balance = {
  _id: string;
  name: string;
  amount: number;
  ownerId: string;
  currency: string;
};

export type CreateUpdateBalancePayload = {
  balance: Partial<Balance>;
};

export type CreateUpdateBalanceResponse = {
  message: string;
  balance: Balance;
};

export type GetBalanceResponse = {
  message: string;
  balances: Balance[];
};

export type DeleteBalancePayload = {
  balanceId: string;
};

export type DeleteBalanceResponse = {
  message: string;
  balanceId: string;
};
