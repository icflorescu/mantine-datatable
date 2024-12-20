import {
  Checkbox,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Stack,
  TableThead,
  TableTr,
  type CheckboxProps,
  type MantineStyleProp,
} from '@mantine/core';
import clsx from 'clsx';
import { forwardRef, useState, type JSX } from 'react';
import { DataTableColumnGroupHeaderCell } from './DataTableColumnGroupHeaderCell';
import { useDataTableColumnsContext } from './DataTableColumns.context';
import { DataTableHeaderCell } from './DataTableHeaderCell';
import { DataTableHeaderSelectorCell } from './DataTableHeaderSelectorCell';
import { DataTableColumnToggle } from './hooks';
import type { DataTableColumn, DataTableColumnGroup, DataTableSelectionTrigger, DataTableSortProps } from './types';
import { humanize } from './utils';

type DataTableHeaderProps<T> = {
  selectionColumnHeaderRef: React.ForwardedRef<HTMLTableCellElement>;
  className: string | undefined;
  style?: MantineStyleProp;
  sortStatus: DataTableSortProps<T>['sortStatus'];
  sortIcons: DataTableSortProps<T>['sortIcons'];
  onSortStatusChange: DataTableSortProps<T>['onSortStatusChange'];
  columns: DataTableColumn<T>[];
  defaultColumnProps: Omit<DataTableColumn<T>, 'accessor'> | undefined;
  groups: readonly DataTableColumnGroup<T>[] | undefined;
  selectionTrigger: DataTableSelectionTrigger;
  selectionVisible: boolean;
  selectionChecked: boolean;
  selectionIndeterminate: boolean;
  onSelectionChange: (() => void) | undefined;
  selectionCheckboxProps: CheckboxProps;
  selectorCellShadowVisible: boolean;
  selectionColumnClassName: string | undefined;
  selectionColumnStyle: MantineStyleProp;
};

export const DataTableHeader = forwardRef(function DataTableHeader<T>(
  {
    selectionColumnHeaderRef,
    className,
    style,
    sortStatus,
    sortIcons,
    onSortStatusChange,
    columns,
    defaultColumnProps,
    groups,
    selectionTrigger,
    selectionVisible,
    selectionChecked,
    selectionIndeterminate,
    onSelectionChange,
    selectionCheckboxProps,
    selectorCellShadowVisible,
    selectionColumnClassName,
    selectionColumnStyle,
  }: DataTableHeaderProps<T>,
  ref: React.ForwardedRef<HTMLTableSectionElement>
) {
  const allRecordsSelectorCell = selectionVisible ? (
    <DataTableHeaderSelectorCell
      ref={selectionColumnHeaderRef}
      className={selectionColumnClassName}
      style={selectionColumnStyle}
      trigger={selectionTrigger}
      shadowVisible={selectorCellShadowVisible}
      checked={selectionChecked}
      indeterminate={selectionIndeterminate}
      checkboxProps={selectionCheckboxProps}
      onChange={onSelectionChange}
      rowSpan={groups ? 2 : undefined}
    />
  ) : null;

  const { columnsToggle, setColumnsToggle } = useDataTableColumnsContext();
  const [columnsPopoverOpened, setColumnsPopoverOpened] = useState<boolean>(false);
  const someColumnsToggleable = columns.some((column) => column.toggleable);

  const columnToggleCheckboxLabels = someColumnsToggleable
    ? Object.fromEntries(columns.map(({ accessor, title }) => [accessor, title ?? humanize(String(accessor))]))
    : undefined;

  const content = (
    <TableThead
      className={clsx('mantine-datatable-header', className)}
      style={style}
      ref={ref}
      onContextMenu={
        someColumnsToggleable
          ? (e) => {
              e.preventDefault();
              setColumnsPopoverOpened((columnsPopoverOpened) => !columnsPopoverOpened);
            }
          : undefined
      }
    >
      {groups && (
        <TableTr>
          {allRecordsSelectorCell}
          {groups.map((group) => (
            <DataTableColumnGroupHeaderCell key={group.id} group={group} />
          ))}
        </TableTr>
      )}

      <TableTr>
        {!groups && allRecordsSelectorCell}

        {columns.map(({ hidden, ...columnProps }, index) => {
          if (hidden) return null;

          const {
            accessor,
            visibleMediaQuery,
            textAlign,
            width,
            title,
            sortable,
            draggable,
            toggleable,
            resizable,
            titleClassName,
            titleStyle,
            filter,
            filterPopoverProps,
            filtering,
            sortKey,
          } = { ...defaultColumnProps, ...columnProps };

          return (
            <DataTableHeaderCell<T>
              key={accessor as React.Key}
              accessor={accessor}
              className={titleClassName}
              style={titleStyle}
              visibleMediaQuery={visibleMediaQuery}
              textAlign={textAlign}
              width={width}
              title={title}
              sortable={sortable}
              draggable={draggable}
              toggleable={toggleable}
              // we won't display the resize handle for the last column to avoid overflow render issues
              resizable={resizable && index < columns.length - 1}
              sortStatus={sortStatus}
              sortIcons={sortIcons}
              sortKey={sortKey}
              onSortStatusChange={onSortStatusChange}
              filter={filter}
              filterPopoverProps={filterPopoverProps}
              filtering={filtering}
            />
          );
        })}
      </TableTr>
    </TableThead>
  );

  return someColumnsToggleable ? (
    <Popover position="bottom" withArrow shadow="md" opened={columnsPopoverOpened} onChange={setColumnsPopoverOpened}>
      <PopoverTarget>{content}</PopoverTarget>
      <PopoverDropdown>
        <Stack>
          {columnsToggle
            .filter((column) => column.toggleable)
            .map((column: DataTableColumnToggle) => {
              return (
                <Group key={column.accessor}>
                  <Checkbox
                    classNames={{ label: 'mantine-datatable-header-column-toggle-checkbox-label' }}
                    size="xs"
                    label={columnToggleCheckboxLabels![column.accessor]}
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
  ) : (
    content
  );
}) as <T>(props: DataTableHeaderProps<T> & { ref: React.ForwardedRef<HTMLTableSectionElement> }) => JSX.Element;
