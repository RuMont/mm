export type GenericFilter = {
  searchTerm?: string;
  fields?: string[];
  orderBy?: {
    field?: string;
    direction?: 'asc' | 'desc';
  };
  page?: number;
  itemsPerPage?: number;
};
