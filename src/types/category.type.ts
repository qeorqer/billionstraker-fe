export type categoryType = {
  _id: string;
  nameEn: string;
  nameRu: string;
  isExpense: boolean;
};

export type categoryResponseType = {
  messageRu: string;
  messageEn: string;
  categories: categoryType[];
};
