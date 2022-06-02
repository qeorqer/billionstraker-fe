export type balanceType = {
  _id: string;
  name: string;
  amount: number;
  ownerId: string;
};

export type createBalanceResponseType = {
  messageRu: string;
  messageEn: string;
  categories: balanceType;
};

export type getBalanceResponseType = {
  messageRu: string;
  messageEn: string;
  categories: balanceType[];
};
