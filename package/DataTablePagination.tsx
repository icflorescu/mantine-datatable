import {
  Box,
  Pagination,
  Text,
  type MantineColorScheme,
  MantineSpacing,
  useMantineColorScheme,
} from '@mantine/core';
import { forwardRef, type CSSProperties, type ForwardedRef, type ReactNode } from 'react';
import DataTablePageSizeSelector from './DataTablePageSizeSelector';
import type { DataTablePaginationProps } from './types';
import type { WithOptional, WithRequired } from './types/utils';
import classes from './styles/DataTablePagination.css';
import cx from 'clsx';

type DataTablePaginationComponentProps = WithOptional<
  WithRequired<
    DataTablePaginationProps,
    'loadingText' | 'paginationSize' | 'recordsPerPageLabel' | 'paginationWrapBreakpoint' | 'getPaginationControlProps'
  >,
  'onRecordsPerPageChange' | 'recordsPerPageOptions'
> & {
  className?: string;
  style?: CSSProperties;
  topBorderColor: string | ((theme: MantineColorScheme) => string);
  fetching: boolean | undefined;
  recordsLength: number | undefined;
  horizontalSpacing: MantineSpacing | undefined;
  noRecordsText: string;
};

export default forwardRef(function DataTablePagination(
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
    getPaginationControlProps,
  }: DataTablePaginationComponentProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  let paginationTextValue: ReactNode;
  if (fetching) {
    paginationTextValue = loadingText;
  } else if (!totalRecords) {
    paginationTextValue = noRecordsText;
  } else {
    const from = (page! - 1) * recordsPerPage! + 1;
    const to = from + recordsLength! - 1;
    paginationTextValue = paginationText!({ from, to, totalRecords });
  }

  const {colorScheme} = useMantineColorScheme();

  return (
    <Box
      ref={ref}
      px={horizontalSpacing ?? 'xs'}
      py="xs"
      className={cx(classes.root, className)}
      style={{borderTop: `1px solid ${typeof topBorderColor === 'function' ? topBorderColor(colorScheme) : topBorderColor}`, ...style}}
    >
      <Text className={classes.text} size={paginationSize}>
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
        className={cx(classes.pagination, { [classes.paginationFetching]: fetching || !recordsLength })}
        value={page}
        onChange={onPageChange}
        size={paginationSize}
        total={Math.ceil(totalRecords! / recordsPerPage!)}
        getControlProps={getPaginationControlProps}
      />
    </Box>
  );
}) as (props: DataTablePaginationComponentProps & { ref: ForwardedRef<HTMLDivElement> }) => JSX.Element;
