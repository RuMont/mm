export type GenericFilterResponse<T = unknown[]> = {
  data: T;
  page: number;
  itemsPerPage: number;
  totalElements: number;
};
