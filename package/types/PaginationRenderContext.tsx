import type { PaginationProps, TextProps } from '@mantine/core';
import type { JSX } from 'react';
import type { DataTablePageSizeSelectorProps } from './DataTablePageSizeSelectorProps';

export type PaginationRenderContext = {
  state: {
    page: number;
    totalPages: number;
    totalRecords: number | undefined;
    recordsPerPage: number | undefined;
    recordsLength: number | undefined;
    fetching: boolean | undefined;
    from?: number;
    to?: number;
    isWrapped: boolean;
  };
  actions: {
    setPage: (page: number) => void;
    setRecordsPerPage?: (n: number) => void;
  };
  Controls: {
    Text: (props?: Partial<TextProps>) => JSX.Element;
    PageSizeSelector: (props?: Partial<DataTablePageSizeSelectorProps>) => JSX.Element;
    Pagination: (props?: Partial<PaginationProps>) => JSX.Element;
  };
};
