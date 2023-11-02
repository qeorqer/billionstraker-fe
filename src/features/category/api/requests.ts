import { AxiosResponse } from 'axios';

import {
  CreateCategoryPayload,
  CreateCategoryResponse,
  createCategoryRoute,
  DeleteCategoryPayload,
  DeleteCategoryResponse,
  deleteCategoryRoute,
  GetCategoriesResponse,
  getCategoriesRoute,
  UpdateCategoryPayload,
  updateCategoryRoute,
} from 'features/category';
import api from 'api/axiosInstance';

export const getCategoriesRequest = (): Promise<
  AxiosResponse<GetCategoriesResponse>
> => api.get(getCategoriesRoute);

export const createCategoryRequest = (
  body: CreateCategoryPayload,
): Promise<AxiosResponse<CreateCategoryResponse>> =>
  api.post(createCategoryRoute, body);

export const updateCategoryRequest = (
  body: UpdateCategoryPayload,
): Promise<AxiosResponse<CreateCategoryResponse>> =>
  api.patch(updateCategoryRoute, body);

export const deleteCategoryRequest = (
  body: DeleteCategoryPayload,
): Promise<AxiosResponse<DeleteCategoryResponse>> =>
  api.delete(deleteCategoryRoute, { data: body });
