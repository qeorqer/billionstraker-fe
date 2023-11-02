export type CategoryTypes = 'expense' | 'profit';

export type Category = {
  _id?: string;
  name: string;
  categoryType: CategoryTypes;
  ownerId?: string;
};

export type GetCategoriesResponse = {
  message: string;
  categories: Category[];
};

export type CreateCategoryPayload = {
  category: Category;
};

export type CreateCategoryResponse = {
  message: string;
  category: Category;
};

export type UpdateCategoryPayload = {
  category: Category;
  categoryId: string;
};

export type DeleteCategoryPayload = {
  categoryId: string;
};

export type DeleteCategoryResponse = {
  message: string;
  categoryId: string;
};
