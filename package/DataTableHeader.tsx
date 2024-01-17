import { TableThead, TableTr, type CheckboxProps, type MantineStyleProp } from '@mantine/core';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { DataTableColumnGroupHeaderCell } from './DataTableColumnGroupHeaderCell';
import { DataTableHeaderCell } from './DataTableHeaderCell';
import { DataTableHeaderSelectorCell } from './DataTableHeaderSelectorCell';
import type { DataTableColumn, DataTableColumnGroup, DataTableSelectionTrigger, DataTableSortProps } from './types';

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

  return (
    <TableThead className={clsx('mantine-datatable-header', className)} style={style} ref={ref}>
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
            filtering,
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
              // we won't display the resize handle for the last column
              // to avoid overflow render issues
              resizable={resizable && index < columns.length - 1}
              sortStatus={sortStatus}
              sortIcons={sortIcons}
              onSortStatusChange={onSortStatusChange}
              filter={filter}
              filtering={filtering}
              allColumns={columns}
            />
          );
        })}
      </TableTr>
    </TableThead>
  );
}) as <T>(props: DataTableHeaderProps<T> & { ref: React.ForwardedRef<HTMLTableSectionElement> }) => JSX.Element;
