export type categoriesTypes = 'expense' | 'profit';

export type categoryType = {
  _id?: string;
  name: string;
  categoryType: categoriesTypes;
  ownerId?: string;
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
