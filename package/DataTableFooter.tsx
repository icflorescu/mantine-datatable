import { Box, createStyles, CSSObject, MantineNumberSize, MantineTheme, Pagination, Text } from '@mantine/core';
import { CSSProperties, ForwardedRef, forwardRef, ReactNode } from 'react';
import { DataTablePaginationProps } from './DataTable.props';

const useStyles = createStyles(
  (theme, { topBorderColor }: { topBorderColor: string | ((theme: MantineTheme) => string) }) => ({
    root: {
      borderTop: `1px solid ${typeof topBorderColor === 'function' ? topBorderColor(theme) : topBorderColor}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.xs,
      [theme.fn.largerThan('xs')]: { flexDirection: 'row' },
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

type DataTableFooterProps = Omit<DataTablePaginationProps, 'loadingText'> & {
  className?: string;
  style?: CSSObject;
  topBorderColor: string | ((theme: MantineTheme) => string);
  fetching: boolean | undefined;
  recordsLength: number | undefined;
  horizontalSpacing: MantineNumberSize | undefined;
  loadingText: string;
  noRecordsText: string;
};

export default forwardRef(function DataTableFooter(
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
    recordsLength,
    horizontalSpacing,
  }: DataTableFooterProps,
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

  const { classes, cx } = useStyles({ topBorderColor });

  return (
    <Box
      ref={ref}
      px={horizontalSpacing ?? 'xs'}
      py="xs"
      className={cx(classes.root, className)}
      style={style as CSSProperties}
    >
      <Text size={paginationSize}>{paginationTextValue}</Text>
      <Pagination
        color={paginationColor}
        className={cx(classes.pagination, { [classes.paginationFetching]: fetching || !recordsLength })}
        page={page}
        onChange={onPageChange}
        size={paginationSize}
        total={Math.ceil(totalRecords! / recordsPerPage!)}
      />
    </Box>
  );
}) as (props: DataTableFooterProps & { ref: ForwardedRef<HTMLDivElement> }) => JSX.Element;
