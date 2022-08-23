import { Box, createStyles, MantineNumberSize, Pagination, Text } from '@mantine/core';
import { ForwardedRef, forwardRef } from 'react';
import { DataTablePaginationProps } from './DataTable.props';

const useStyles = createStyles((theme) => {
  const shadowGradientAlpha = theme.colorScheme === 'dark' ? 0.5 : 0.05;
  return {
    root: {
      position: 'relative',
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.xs,
      [theme.fn.largerThan('xs')]: { flexDirection: 'row' },
      '&::before': {
        zIndex: 1,
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        height: theme.spacing.sm,
        top: -theme.spacing.sm,
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
        background: `linear-gradient(${theme.fn.rgba(theme.black, 0)}, ${theme.fn.rgba(
          theme.black,
          shadowGradientAlpha
        )}), linear-gradient(${theme.fn.rgba(theme.black, 0)} 30%, ${theme.fn.rgba(theme.black, shadowGradientAlpha)})`,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity .15s ease',
      },
    },
    topShadowVisible: {
      '&::before': {
        opacity: 1,
      },
    },
    pagination: {
      opacity: 1,
      transition: 'opacity .15s ease',
    },
    paginationFetching: {
      opacity: 0,
    },
  };
});

type DataTableFooterProps = DataTablePaginationProps & {
  fetching: boolean | undefined;
  recordsLength: number | undefined;
  horizontalSpacing: MantineNumberSize | undefined;
  loadingText: string;
  topShadowVisible: boolean;
};

export default forwardRef(function DataTableFooter(
  {
    fetching,
    page,
    onPageChange,
    paginationSize,
    loadingText,
    totalRecords,
    recordsPerPage,
    recordsLength,
    horizontalSpacing,
    topShadowVisible,
  }: DataTableFooterProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  let paginationText: string;
  if (fetching) {
    paginationText = loadingText;
  } else {
    const from = (page! - 1) * recordsPerPage! + 1;
    const to = from + recordsLength! - 1;
    paginationText = `${from} - ${to}`;
    if (totalRecords) paginationText += ` / ${totalRecords}`;
  }

  const { classes, cx } = useStyles();

  return (
    <Box
      ref={ref}
      px={horizontalSpacing ?? 'xs'}
      py="xs"
      className={cx(classes.root, { [classes.topShadowVisible]: topShadowVisible })}
    >
      <Text size={paginationSize}>{paginationText}</Text>
      <Pagination
        className={cx(classes.pagination, { [classes.paginationFetching]: fetching || !recordsLength })}
        page={page}
        onChange={onPageChange}
        size={paginationSize}
        total={Math.ceil(totalRecords! / recordsPerPage!)}
      />
    </Box>
  );
}) as (props: DataTableFooterProps & { ref: ForwardedRef<HTMLDivElement> }) => JSX.Element;
