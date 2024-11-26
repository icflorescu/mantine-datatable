import { ActionIcon, Box, Center, Flex, Group, TableTh, type MantineStyleProp, type MantineTheme } from '@mantine/core';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useDataTableColumnsContext } from './DataTableColumns.context';
import { DataTableHeaderCellFilter } from './DataTableHeaderCellFilter';
import { DataTableResizableHeaderHandle } from './DataTableResizableHeaderHandle';
import { useMediaQueryStringOrFunction } from './hooks';
import { IconArrowUp } from './icons/IconArrowUp';
import { IconArrowsVertical } from './icons/IconArrowsVertical';
import { IconGripVertical } from './icons/IconGripVertical';
import { IconX } from './icons/IconX';
import type { DataTableColumn, DataTableSortProps } from './types';
import { ELLIPSIS, NOWRAP, TEXT_ALIGN_CENTER, TEXT_ALIGN_LEFT, TEXT_ALIGN_RIGHT } from './utilityClasses';
import { humanize } from './utils';

type DataTableHeaderCellProps<T> = {
  className: string | undefined;
  style: MantineStyleProp | undefined;
  visibleMediaQuery: string | ((theme: MantineTheme) => string) | undefined;
  title: React.ReactNode | undefined;
  sortStatus: DataTableSortProps<T>['sortStatus'];
  sortIcons: DataTableSortProps<T>['sortIcons'];
  onSortStatusChange: DataTableSortProps<T>['onSortStatusChange'];
} & Pick<
  DataTableColumn<T>,
  | 'accessor'
  | 'sortable'
  | 'draggable'
  | 'toggleable'
  | 'resizable'
  | 'textAlign'
  | 'width'
  | 'filter'
  | 'filterPopoverProps'
  | 'filtering'
  | 'sortKey'
>;

export function DataTableHeaderCell<T>({
  className,
  style,
  accessor,
  visibleMediaQuery,
  title,
  sortable,
  draggable,
  toggleable,
  resizable,
  sortIcons,
  textAlign,
  width,
  sortStatus,
  onSortStatusChange,
  filter,
  filterPopoverProps,
  filtering,
  sortKey,
}: DataTableHeaderCellProps<T>) {
  const { setSourceColumn, setTargetColumn, swapColumns, setColumnsToggle } = useDataTableColumnsContext();
  const [dragOver, setDragOver] = useState<boolean>(false);
  const columnRef = useRef<HTMLTableCellElement | null>(null);

  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;
  const text = title ?? humanize(accessor as string);
  const tooltip = typeof text === 'string' ? text : undefined;

  const sortAction =
    sortable && onSortStatusChange
      ? (e?: React.BaseSyntheticEvent) => {
          if (e?.defaultPrevented) return;

          onSortStatusChange({
            sortKey,
            columnAccessor: accessor,
            direction:
              sortStatus?.columnAccessor === accessor
                ? sortStatus.direction === 'asc'
                  ? 'desc'
                  : 'asc'
                : (sortStatus?.direction ?? 'asc'),
          });
        }
      : undefined;

  const handleColumnDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    setSourceColumn(accessor as string);
    setDragOver(false);
  };

  const handleColumnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setTargetColumn(accessor as string);
    setDragOver(true);
  };

  const handleColumnDrop = () => {
    setTargetColumn(accessor as string);
    setDragOver(false);
    swapColumns();
  };

  const handleColumnDragEnter = () => {
    setDragOver(true);
  };

  const handleColumnDragLeave = () => {
    setDragOver(false);
  };

  const handleColumnToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setColumnsToggle((columnsToggle) =>
      columnsToggle.map((c) => {
        if (c.accessor === accessor) {
          return { ...c, toggled: false };
        }
        return c;
      })
    );
  };

  return (
    <TableTh
      className={clsx(
        {
          'mantine-datatable-header-cell-sortable': sortable,
          'mantine-datatable-header-cell-toggleable': toggleable,
          'mantine-datatable-header-cell-resizable': resizable,
        },
        className
      )}
      style={[
        {
          width,
          ...(!resizable ? { minWidth: width, maxWidth: width } : { minWidth: '1px' }),
        },
        style,
      ]}
      role={sortable ? 'button' : undefined}
      tabIndex={sortable ? 0 : undefined}
      onClick={sortAction}
      onKeyDown={(e) => e.key === 'Enter' && sortAction?.()}
      ref={columnRef}
    >
      <Group className="mantine-datatable-header-cell-sortable-group" justify="space-between" wrap="nowrap">
        <Flex
          align="center"
          w="100%"
          className={clsx({
            'mantine-datatable-header-cell-draggable': draggable,
            'mantine-datatable-header-cell-drag-over': dragOver,
          })}
          draggable={draggable}
          onDragStart={draggable ? handleColumnDragStart : undefined}
          onDragEnter={draggable ? handleColumnDragEnter : undefined}
          onDragOver={draggable ? handleColumnDragOver : undefined}
          onDrop={draggable ? handleColumnDrop : undefined}
          onDragLeave={draggable ? handleColumnDragLeave : undefined}
        >
          {draggable ? (
            <Center role="img" aria-label="Drag column">
              <ActionIcon
                className="mantine-datatable-header-cell-draggable-action-icon"
                variant="subtle"
                size="xs"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                }}
              >
                <IconGripVertical />
              </ActionIcon>
            </Center>
          ) : null}
          <Box
            className={clsx(
              'mantine-datatable-header-cell-sortable-text',
              {
                [TEXT_ALIGN_LEFT]: textAlign === 'left',
                [TEXT_ALIGN_CENTER]: textAlign === 'center',
                [TEXT_ALIGN_RIGHT]: textAlign === 'right',
              },
              NOWRAP,
              ELLIPSIS
            )}
            title={tooltip}
          >
            {text}
          </Box>
        </Flex>
        {toggleable ? (
          <Center className="mantine-datatable-header-cell-toggleable-icon" role="img" aria-label="Toggle column">
            <ActionIcon size="xs" variant="light" onClick={handleColumnToggle}>
              <IconX />
            </ActionIcon>
          </Center>
        ) : null}
        {sortable || sortStatus?.columnAccessor === accessor ? (
          <>
            {sortStatus?.columnAccessor === accessor ? (
              <Center
                className={clsx('mantine-datatable-header-cell-sortable-icon', {
                  'mantine-datatable-header-cell-sortable-icon-reversed': sortStatus.direction === 'desc',
                })}
                role="img"
                aria-label={`Sorted ${sortStatus.direction === 'desc' ? 'descending' : 'ascending'}`}
              >
                {sortIcons?.sorted || <IconArrowUp />}
              </Center>
            ) : (
              <Center
                className="mantine-datatable-header-cell-sortable-unsorted-icon"
                role="img"
                aria-label="Not sorted"
              >
                {sortIcons?.unsorted || <IconArrowsVertical />}
              </Center>
            )}
          </>
        ) : null}
        {filter ? (
          <DataTableHeaderCellFilter filterPopoverProps={filterPopoverProps} isActive={!!filtering}>
            {filter}
          </DataTableHeaderCellFilter>
        ) : null}
      </Group>
      {resizable ? <DataTableResizableHeaderHandle accessor={accessor as string} columnRef={columnRef} /> : null}
    </TableTh>
  );
}
