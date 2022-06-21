export type balanceType = {
  _id: string;
  name: string;
  amount: number;
  ownerId: string;
};

export type createBalanceResponseType = {
  messageRu: string;
  messageEn: string;
  balance: balanceType;
};

export type getBalanceResponseType = {
  messageRu: string;
  messageEn: string;
  balances: balanceType[];
};

export type deleteBalanceResponseType = {
  messageRu: string;
  messageEn: string;
  balanceId: string;
};
