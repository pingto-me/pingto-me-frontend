export type Pagination = {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

export type BasePagination<T> = Pagination & {
  results: T[];
};

export type CommonPayloadMetaData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};
