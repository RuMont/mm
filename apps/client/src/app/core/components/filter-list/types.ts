export type ListConfig<T> = {
  data: T;
  page: number;
  itemsPerPage: number;
  totalElements: number;
};

export type Columns<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
}[];
