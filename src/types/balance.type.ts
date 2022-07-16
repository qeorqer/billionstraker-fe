export type balanceType = {
  _id: string;
  name: string;
  amount: number;
  ownerId: string;
};

export type createBalanceResponseType = {
  message: string;
  balance: balanceType;
};

export type getBalanceResponseType = {
  message: string;
  balances: balanceType[];
};

export type deleteBalanceResponseType = {
  message: string;
  balanceId: string;
};
