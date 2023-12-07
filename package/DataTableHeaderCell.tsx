import {
  ActionIcon,
  Box,
  Center,
  Checkbox,
  Flex,
  Group,
  MantineStyleProp,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Stack,
  TableTh,
  type MantineTheme,
} from '@mantine/core';
import clsx from 'clsx';
import { useState } from 'react';
import { useDataTableDragToggleColumnsContext } from './DataTableDragToggleColumns.context';
import { DataTableHeaderCellFilter } from './DataTableHeaderCellFilter';
import { useMediaQueryStringOrFunction } from './hooks';
import { DataTableColumnToggle } from './hooks/useDragToggleColumns';
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
  'accessor' | 'sortable' | 'draggable' | 'toggleable' | 'textAlign' | 'width' | 'filter' | 'filtering'
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
  sortIcons,
  textAlign,
  width,
  sortStatus,
  onSortStatusChange,
  filter,
  filtering,
}: DataTableHeaderCellProps<T>) {
  const { setSourceColumn, setTargetColumn, swapColumns, columnsToggle, setColumnsToggle } =
    useDataTableDragToggleColumnsContext();

  const [dragOver, setDragOver] = useState<boolean>(false);

  const [columnsPopoverOpened, setColumnsPopoverOpened] = useState<boolean>(false);

  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;
  const text = title ?? humanize(accessor as string);
  const tooltip = typeof text === 'string' ? text : undefined;

  const sortAction =
    sortable && onSortStatusChange
      ? (e?: React.BaseSyntheticEvent) => {
          if (e?.defaultPrevented) return;

          onSortStatusChange({
            columnAccessor: accessor,
            direction:
              sortStatus?.columnAccessor === accessor
                ? sortStatus.direction === 'asc'
                  ? 'desc'
                  : 'asc'
                : sortStatus?.direction ?? 'asc',
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
        },
        className
      )}
      style={[{ width, minWidth: width, maxWidth: width }, style]}
      role={sortable ? 'button' : undefined}
      tabIndex={sortable ? 0 : undefined}
      onClick={sortAction}
      onContextMenu={(e) => {
        if (toggleable) {
          e.preventDefault();
          setColumnsPopoverOpened(true);
        }
      }}
      onKeyDown={(e) => e.key === 'Enter' && sortAction?.()}
    >
      <Group className="mantine-datatable-header-cell-sortable-group" justify="space-between" wrap="nowrap">
        <Popover
          width={200}
          position="bottom"
          withArrow
          shadow="md"
          opened={columnsPopoverOpened}
          onChange={setColumnsPopoverOpened}
        >
          <PopoverTarget>
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
                <Center className="mantine-datatable-header-cell-draggable-icon" role="img" aria-label="Drag column">
                  <ActionIcon
                    style={{ cursor: 'grab' }}
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
          </PopoverTarget>
          <PopoverDropdown>
            <Stack>
              {columnsToggle
                .filter((column) => column.toggleable)
                .map((column: DataTableColumnToggle) => {
                  return (
                    <Group key={column.accessor}>
                      <Checkbox
                        size="xs"
                        label={column.accessor}
                        checked={column.toggled}
                        onChange={(e) => {
                          setColumnsToggle(
                            columnsToggle.map((c: DataTableColumnToggle) => {
                              if (c.accessor === column.accessor) {
                                return { ...c, toggled: e.currentTarget.checked };
                              }
                              return c;
                            })
                          );
                        }}
                      />
                    </Group>
                  );
                })}
            </Stack>
          </PopoverDropdown>
        </Popover>
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
        {filter ? <DataTableHeaderCellFilter isActive={!!filtering}>{filter}</DataTableHeaderCellFilter> : null}
      </Group>
    </TableTh>
  );
}
