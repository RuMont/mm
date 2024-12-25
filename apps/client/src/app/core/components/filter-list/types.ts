export type ListConfig<T extends Record<string, any>> = {
  columns: {
    key: keyof T;
    label: string;
    sortable: boolean;
  }[];
  data: T[];
  page: number;
  itemsPerPage: number;
  totalElements: number;
};
