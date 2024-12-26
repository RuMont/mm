export type GenericFilterResponse<T = unknown> = {
  data: T extends Array<infer U> ? Partial<U>[] : Partial<T>;
  page: number;
  itemsPerPage: number;
  totalElements: number;
};
