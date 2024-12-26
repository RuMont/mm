export type ListConfig = {
  columns: {
    key: string;
    label: string;
    sortable: boolean;
  }[];
  page: number;
  itemsPerPage: number;
  totalElements: number;
};
