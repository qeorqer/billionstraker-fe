export type categoriesTypes = 'expense' | 'profit';

export type categoryType = {
  _id?: string;
  name: string;
  categoryType: categoriesTypes;
  ownerId?: string;
};

export type getCategoriesResponseType = {
  message: string;
  categories: categoryType[];
};

export type createCategoryResponseType = {
  message: string;
  category: categoryType;
};

export type deleteCategoryResponseType = {
  message: string;
  categoryId: string;
};
