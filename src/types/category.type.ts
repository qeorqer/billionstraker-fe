export type categoryType = {
  _id: string;
  nameEn: string;
  nameRu: string;
  isExpense: boolean;
};

export type getCategoriesResponseType = {
  messageRu: string;
  messageEn: string;
  categories: categoryType[];
};

export type createCategoryResponseType = {
  messageRu: string;
  messageEn: string;
  category: categoryType;
};

export type deleteCategoryResponseType = {
  messageRu: string;
  messageEn: string;
  categoryId: string;
};
