import { Box, Pagination, Text, rem, type MantineSpacing, type MantineStyleProp } from '@mantine/core';
import clsx from 'clsx';
import { forwardRef, type ForwardedRef, type JSX } from 'react';
import { DataTablePageSizeSelector } from './DataTablePageSizeSelector';
import { getPaginationCssVariables } from './cssVariables';
import { useMediaQueryStringOrFunction } from './hooks';
import type { DataTablePaginationProps } from './types';
import type { WithOptionalProperty, WithRequiredProperty } from './types/utils';

type DataTablePaginationComponentProps = WithOptionalProperty<
  WithRequiredProperty<
    DataTablePaginationProps,
    'loadingText' | 'paginationSize' | 'recordsPerPageLabel' | 'paginationWrapBreakpoint' | 'getPaginationControlProps'
  >,
  'onRecordsPerPageChange' | 'recordsPerPageOptions'
> & {
  className: string | undefined;
  style: MantineStyleProp | undefined;
  fetching: boolean | undefined;
  recordsLength: number | undefined;
  horizontalSpacing: MantineSpacing | undefined;
  noRecordsText: string;
};

export const DataTablePagination = forwardRef(function DataTablePagination(
  {
    className,
    style,
    fetching,
    page,
    onPageChange,
    paginationWithEdges,
    paginationWithControls,
    paginationActiveTextColor,
    paginationActiveBackgroundColor,
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
  if (totalRecords) {
    const from = (page - 1) * recordsPerPage + 1;
    const to = from + (recordsLength || 0) - 1;
    paginationTextValue = paginationText!({ from, to, totalRecords });
  } else {
    paginationTextValue = fetching ? loadingText : noRecordsText;
  }

  const isAbovePaginationWrapBreakpoint = useMediaQueryStringOrFunction(
    ({ breakpoints }) =>
      `(min-width: ${
        typeof paginationWrapBreakpoint === 'number'
          ? `${rem(paginationWrapBreakpoint)}rem`
          : breakpoints[paginationWrapBreakpoint] || paginationWrapBreakpoint
      })`
  );

  return (
    <Box
      ref={ref}
      px={horizontalSpacing ?? 'xs'}
      py="xs"
      className={clsx('mantine-datatable-pagination', className)}
      style={[{ flexDirection: isAbovePaginationWrapBreakpoint ? 'row' : 'column' }, style]}
    >
      <Text component="div" className="mantine-datatable-pagination-text" size={paginationSize}>
        {paginationTextValue}
      </Text>
      {recordsPerPageOptions && (
        <DataTablePageSizeSelector
          activeTextColor={paginationActiveTextColor}
          activeBackgroundColor={paginationActiveBackgroundColor}
          size={paginationSize}
          label={recordsPerPageLabel}
          values={recordsPerPageOptions}
          value={recordsPerPage!}
          onChange={onRecordsPerPageChange!}
        />
      )}
      <Pagination
        classNames={{
          root: clsx('mantine-datatable-pagination-pages', {
            'mantine-datatable-pagination-pages-fetching': fetching || !recordsLength,
          }),
          control: 'mantine-datatable-pagination-pages-control',
        }}
        style={
          paginationActiveTextColor || paginationActiveBackgroundColor
            ? (theme) =>
                getPaginationCssVariables({ theme, paginationActiveTextColor, paginationActiveBackgroundColor })
            : undefined
        }
        withEdges={paginationWithEdges}
        withControls={paginationWithControls}
        value={page}
        onChange={onPageChange}
        size={paginationSize}
        total={Math.ceil(totalRecords! / recordsPerPage!)}
        getControlProps={getPaginationControlProps}
      />
    </Box>
  );
}) as (props: DataTablePaginationComponentProps & { ref: ForwardedRef<HTMLDivElement> }) => JSX.Element;
