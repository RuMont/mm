export type GenericFilter<T extends Record<string, unknown>> = {
  searchTerm?: string;
  fields?: (keyof T extends string ? keyof T : never)[];
  orderByField?: string;
  orderByDirection?: 'asc' | 'desc';
  page: number;
  itemsPerPage: number;
};
