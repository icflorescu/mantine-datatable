import {
  Box,
  Pagination,
  Text,
  createStyles,
  type CSSObject,
  type MantineNumberSize,
  type MantineTheme,
} from '@mantine/core';
import { forwardRef, type CSSProperties, type ForwardedRef, type ReactNode } from 'react';
import DataTablePageSizeSelector from './DataTablePageSizeSelector';
import type { DataTablePaginationProps } from './types';
import type { WithOptional, WithRequired } from './types/utils';

const useStyles = createStyles(
  (
    theme,
    {
      topBorderColor,
      paginationWrapBreakpoint,
    }: { topBorderColor: string | ((theme: MantineTheme) => string); paginationWrapBreakpoint: MantineNumberSize }
  ) => ({
    root: {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderTop: `1px solid ${typeof topBorderColor === 'function' ? topBorderColor(theme) : topBorderColor}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.xs,
      [theme.fn.largerThan(paginationWrapBreakpoint)]: { flexDirection: 'row' },
    },
    text: {
      flex: '1 1 auto',
    },
    pagination: {
      opacity: 1,
      transition: 'opacity .15s ease',
    },
    paginationFetching: {
      opacity: 0,
    },
  })
);

type DataTablePaginationComponentProps = WithOptional<
  WithRequired<
    DataTablePaginationProps,
    'loadingText' | 'paginationSize' | 'recordsPerPageLabel' | 'paginationWrapBreakpoint' | 'getPaginationControlProps'
  >,
  'onRecordsPerPageChange' | 'recordsPerPageOptions'
> & {
  className?: string;
  style?: CSSObject;
  topBorderColor: string | ((theme: MantineTheme) => string);
  fetching: boolean | undefined;
  recordsLength: number | undefined;
  horizontalSpacing: MantineNumberSize | undefined;
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
    paginationWrapBreakpoint,
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

  const { classes, cx } = useStyles({ topBorderColor, paginationWrapBreakpoint });

  return (
    <Box
      ref={ref}
      px={horizontalSpacing ?? 'xs'}
      py="xs"
      className={cx(classes.root, className)}
      style={style as CSSProperties}
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
