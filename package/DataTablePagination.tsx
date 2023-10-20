import {
  Box,
  Pagination,
  Text,
  parseThemeColor,
  type MantineColor,
  type MantineSpacing,
  type MantineStyleProp,
  type StyleProp,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import clsx from 'clsx';
import { forwardRef, type ForwardedRef } from 'react';
import DataTablePageSizeSelector from './DataTablePageSizeSelector';
import type { DataTablePaginationProps } from './types';
import type { WithOptionalProperty, WithRequiredProperty } from './types/utils';

type DataTablePaginationComponentProps = WithOptionalProperty<
  WithRequiredProperty<
    DataTablePaginationProps,
    'loadingText' | 'paginationSize' | 'recordsPerPageLabel' | 'paginationWrapBreakpoint' | 'getPaginationControlProps'
  >,
  'onRecordsPerPageChange' | 'recordsPerPageOptions'
> & {
  className?: string;
  style?: MantineStyleProp;
  topBorderColor: StyleProp<MantineColor>;
  fetching: boolean | undefined;
  recordsLength: number | undefined;
  horizontalSpacing: MantineSpacing | undefined;
  noRecordsText: string;
};

export const DataTablePagination = forwardRef(function DataTablePagination(
  {
    className,
    style,
    topBorderColor,
    fetching,
    page,
    onPageChange,
    paginationColor,
    paginationSize,
    loadingText,
    noRecordsText,
    paginationText,
    totalRecords,
    recordsPerPage,
    onRecordsPerPageChange,
    recordsPerPageLabel,
    recordsPerPageOptions,
    recordsLength,
    horizontalSpacing,
    paginationWrapBreakpoint,
    getPaginationControlProps,
  }: DataTablePaginationComponentProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  let paginationTextValue: React.ReactNode;
  if (fetching) {
    paginationTextValue = loadingText;
  } else if (!totalRecords) {
    paginationTextValue = noRecordsText;
  } else {
    const from = (page! - 1) * recordsPerPage! + 1;
    const to = from + recordsLength! - 1;
    paginationTextValue = paginationText!({ from, to, totalRecords });
  }

  const isAbovePaginationWrapBreakpoint = useMediaQuery(
    `(min-width: ${
      typeof paginationWrapBreakpoint === 'number' ? `${paginationWrapBreakpoint}px` : paginationWrapBreakpoint
    })`
  );

  return (
    <Box
      ref={ref}
      px={horizontalSpacing ?? 'xs'}
      py="xs"
      className={clsx('mantine-datatable-pagination', className)}
      style={[
        (theme) => ({
          '--mantine-datatable-pagination-border-color': parseThemeColor({ color: topBorderColor, theme }),
        }),
        { flexDirection: isAbovePaginationWrapBreakpoint ? 'row' : 'column' },
        style,
      ]}
    >
      <Text className="mantine-datatable-pagination-text" size={paginationSize}>
        {paginationTextValue}
      </Text>
      {recordsPerPageOptions && (
        <DataTablePageSizeSelector
          size={paginationSize}
          label={recordsPerPageLabel}
          values={recordsPerPageOptions}
          color={paginationColor}
          value={recordsPerPage!}
          onChange={onRecordsPerPageChange!}
        />
      )}
      <Pagination
        color={paginationColor}
        className={clsx('mantine-datatable-pagination-pages', {
          'mantine-datatable-pagination-pages-fetching': fetching || !recordsLength,
        })}
        value={page}
        onChange={onPageChange}
        size={paginationSize}
        total={Math.ceil(totalRecords! / recordsPerPage!)}
        getControlProps={getPaginationControlProps}
      />
    </Box>
  );
}) as (props: DataTablePaginationComponentProps & { ref: ForwardedRef<HTMLDivElement> }) => JSX.Element;
