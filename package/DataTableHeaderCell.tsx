import { Box, Center, createStyles, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { lowerCase, upperFirst } from 'lodash';
import { ReactNode } from 'react';
import { ArrowDown, ArrowsVertical, ArrowUp } from 'tabler-icons-react';
import { DataTableColumn, DataTableSortStatus } from './DataTable.props';
import getCellWidthStyleProps from './getCellWidthStyleProps';

const useStyles = createStyles((theme) => ({
  sortableColumnHeader: {
    cursor: 'pointer',
    transition: 'background .15s ease',
    '&:hover': {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  columnHeaderText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  sortableColumnHeaderText: {
    minWidth: 0,
    flexGrow: 1,
  },
  sortableColumnHeaderNeutralIcon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    transition: 'color .15s ease',
    'th:hover &': {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    },
  },
}));

type DataTableHeaderCell<T> = {
  accessor: string;
  visibleMediaQuery: string | undefined;
  title: ReactNode | undefined;
  expandedColumnAccessor: string | undefined;
  sortStatus: DataTableSortStatus | undefined;
  onSortStatusChange: ((sortStatus: DataTableSortStatus) => void) | undefined;
} & Pick<DataTableColumn<T>, 'accessor' | 'sortable' | 'textAlign' | 'width'>;

export default function DataTableHeaderCell<T>({
  accessor,
  visibleMediaQuery,
  title,
  sortable,
  textAlign,
  width,
  expandedColumnAccessor,
  sortStatus,
  onSortStatusChange,
}: DataTableHeaderCell<T>) {
  const { cx, classes } = useStyles();
  if (!useMediaQuery(visibleMediaQuery || '', true)) return null;
  const text = title ?? upperFirst(lowerCase(accessor));
  return (
    <Box
      component="th"
      className={cx({ [classes.sortableColumnHeader]: sortable })}
      sx={{
        '&&': { textAlign },
        ...getCellWidthStyleProps({
          width,
          accessor,
          expandedColumnAccessor,
        }),
      }}
      role={sortable ? 'button' : undefined}
      onClick={
        sortable && onSortStatusChange
          ? () => {
              onSortStatusChange({
                columnAccessor: accessor,
                direction: sortStatus?.direction === 'asc' ? 'desc' : 'asc',
              });
            }
          : undefined
      }
    >
      {sortable || sortStatus?.columnAccessor === accessor ? (
        <Group position="apart" noWrap spacing="xs">
          <Box className={cx(classes.columnHeaderText, classes.sortableColumnHeaderText)}>{text}</Box>
          <Center>
            {sortStatus?.columnAccessor === accessor ? (
              sortStatus.direction === 'asc' ? (
                <ArrowDown size={14} />
              ) : (
                <ArrowUp size={14} />
              )
            ) : (
              <ArrowsVertical size={14} className={classes.sortableColumnHeaderNeutralIcon} />
            )}
          </Center>
        </Group>
      ) : (
        <Box className={classes.columnHeaderText}>{text}</Box>
      )}
    </Box>
  );
}
