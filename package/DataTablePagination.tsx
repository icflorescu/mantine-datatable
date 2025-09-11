import { Box, Pagination, Text, rem, type MantineSpacing, type MantineStyleProp } from '@mantine/core';
import clsx from 'clsx';
import { DataTablePageSizeSelector } from './DataTablePageSizeSelector';
import { getPaginationCssVariables } from './cssVariables';
import { useMediaQueryStringOrFunction } from './hooks';
import type { DataTablePaginationProps } from './types';
import type { PaginationRenderContext } from './types/PaginationRenderContext';
import type { WithOptionalProperty, WithRequiredProperty } from './types/utils';

type DataTablePaginationComponentProps = WithOptionalProperty<
  WithRequiredProperty<
    DataTablePaginationProps,
    'loadingText' | 'paginationSize' | 'recordsPerPageLabel' | 'paginationWrapBreakpoint' | 'getPaginationControlProps'
  >,
  'onRecordsPerPageChange' | 'recordsPerPageOptions' | 'renderPagination'
> & {
  className: string | undefined;
  style: MantineStyleProp | undefined;
  fetching: boolean | undefined;
  recordsLength: number | undefined;
  horizontalSpacing: MantineSpacing | undefined;
  noRecordsText: string;
};

export function DataTablePagination({
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
  renderPagination,
}: DataTablePaginationComponentProps) {
  let paginationTextValue: React.ReactNode;
  if (totalRecords) {
    const from = (page - 1) * recordsPerPage + 1;
    const to = from + (recordsLength || 0) - 1;
    paginationTextValue = paginationText!({ from, to, totalRecords });
  } else {
    paginationTextValue = fetching ? loadingText : noRecordsText;
  }

  const totalPages = totalRecords && recordsPerPage ? Math.max(1, Math.ceil(totalRecords / recordsPerPage)) : 1;

  const from = totalRecords ? (page - 1) * (recordsPerPage ?? 0) + 1 : undefined;
  const to = totalRecords ? (from ?? 1) + (recordsLength ?? 0) - 1 : undefined;

  const isAbovePaginationWrapBreakpoint = useMediaQueryStringOrFunction(
    ({ breakpoints }) =>
      `(min-width: ${
        typeof paginationWrapBreakpoint === 'number'
          ? `${rem(paginationWrapBreakpoint)}rem`
          : breakpoints[paginationWrapBreakpoint] || paginationWrapBreakpoint
      })`
  );

  const isWrapped = !isAbovePaginationWrapBreakpoint;

  const Controls: PaginationRenderContext['Controls'] = {
    Text: (props) => (
      <Text component="div" className="mantine-datatable-pagination-text" size={paginationSize} {...props}>
        {paginationTextValue}
      </Text>
    ),
    PageSizeSelector: (props) =>
      recordsPerPageOptions ? (
        <DataTablePageSizeSelector
          activeTextColor={paginationActiveTextColor}
          activeBackgroundColor={paginationActiveBackgroundColor}
          size={paginationSize}
          label={recordsPerPageLabel}
          values={recordsPerPageOptions}
          value={recordsPerPage!}
          onChange={onRecordsPerPageChange!}
          {...props}
        />
      ) : (
        <></>
      ),
    Pagination: (props) => (
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
                getPaginationCssVariables({
                  theme,
                  paginationActiveTextColor,
                  paginationActiveBackgroundColor,
                })
            : undefined
        }
        withEdges={paginationWithEdges}
        withControls={paginationWithControls}
        value={page}
        onChange={onPageChange}
        size={paginationSize}
        total={totalPages}
        getControlProps={getPaginationControlProps}
        {...props}
      />
    ),
  };

  const ctx: PaginationRenderContext = {
    state: {
      paginationSize,
      page,
      totalPages,
      totalRecords,
      recordsPerPage,
      recordsLength,
      fetching,
      from,
      to,
      isWrapped,
    },
    actions: {
      setPage: (n) => onPageChange?.(n),
      setRecordsPerPage: onRecordsPerPageChange ? (n) => onRecordsPerPageChange(n) : undefined,
    },
    Controls,
  };

  return (
    <Box
      px={horizontalSpacing ?? 'xs'}
      py="xs"
      className={clsx('mantine-datatable-pagination', className)}
      style={[{ flexDirection: isWrapped ? 'column' : 'row' }, style]}
    >
      {typeof renderPagination === 'function' ? (
        renderPagination(ctx)
      ) : (
        <>
          <Controls.Text />
          <Controls.PageSizeSelector />
          <Controls.Pagination />
        </>
      )}
    </Box>
  );
}
