export type GenericFilter = {
  searchTerm?: string;
  fields?: string[];
  orderByField?: string;
  orderByDirection?: 'asc' | 'desc';
  page: number;
  itemsPerPage: number;
};
