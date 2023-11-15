import { AxiosResponse } from 'axios';

import {
  CreateUpdateCategoryResponse,
  createCategoryRoute,
  DeleteCategoryPayload,
  DeleteCategoryResponse,
  deleteCategoryRoute,
  GetCategoriesResponse,
  getCategoriesRoute,
  updateCategoryRoute,
  CreateUpdateCategoryPayload,
} from 'features/category';
import api from 'api/axiosInstance';

export const getCategoriesRequest = (): Promise<
  AxiosResponse<GetCategoriesResponse>
> => api.get(getCategoriesRoute);

export const createCategoryRequest = (
  body: CreateUpdateCategoryPayload,
): Promise<AxiosResponse<CreateUpdateCategoryResponse>> =>
  api.post(createCategoryRoute, body);

export const updateCategoryRequest = (
  body: CreateUpdateCategoryPayload,
): Promise<AxiosResponse<CreateUpdateCategoryResponse>> =>
  api.patch(updateCategoryRoute, body);

export const deleteCategoryRequest = (
  body: DeleteCategoryPayload,
): Promise<AxiosResponse<DeleteCategoryResponse>> =>
  api.delete(deleteCategoryRoute, { data: body });
