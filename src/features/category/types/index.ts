export type CategoryType = 'expense' | 'profit';

export type Category = {
  _id?: string;
  name: string;
  categoryType: CategoryType;
  ownerId?: string;
};

export type GetCategoriesResponse = {
  message: string;
  categories: Category[];
};

export type CreateUpdateCategoryPayload = {
  category: Partial<Category>;
};

export type CreateUpdateCategoryResponse = {
  message: string;
  category: Category;
};
export type DeleteCategoryPayload = {
  categoryId: string;
};

export type DeleteCategoryResponse = {
  message: string;
  categoryId: string;
};
