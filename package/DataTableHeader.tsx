import { Box, type MantineStyleProp } from '@mantine/core';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { DataTableColumnGroupHeaderCell } from './DataTableColumnGroupHeaderCell';
import { DataTableHeaderCell } from './DataTableHeaderCell';
import { DataTableHeaderSelectorCell } from './DataTableHeaderSelectorCell';
import type { DataTableColumn, DataTableColumnGroup, DataTableSortProps } from './types';

type DataTableHeaderProps<T> = {
  className?: string;
  style?: MantineStyleProp;
  sortStatus: DataTableSortProps['sortStatus'];
  sortIcons: DataTableSortProps['sortIcons'];
  onSortStatusChange: DataTableSortProps['onSortStatusChange'];
  columns: DataTableColumn<T>[];
  defaultColumnProps: Omit<DataTableColumn<T>, 'accessor'> | undefined;
  groups: readonly DataTableColumnGroup<T>[] | undefined;
  selectionVisible: boolean;
  selectionChecked: boolean;
  selectionIndeterminate: boolean;
  onSelectionChange: (() => void) | undefined;
  selectionCheckboxProps: Record<string, unknown>;
  leftShadowVisible: boolean;
};

export const DataTableHeader = forwardRef(function DataTableHeader<T>(
  {
    className,
    style,
    sortStatus,
    sortIcons,
    onSortStatusChange,
    columns,
    defaultColumnProps,
    groups,
    selectionVisible,
    selectionChecked,
    selectionIndeterminate,
    onSelectionChange,
    selectionCheckboxProps,
    leftShadowVisible,
  }: DataTableHeaderProps<T>,
  ref: React.ForwardedRef<HTMLTableSectionElement>
) {
  const allRecordsSelectorCell = selectionVisible ? (
    <DataTableHeaderSelectorCell
      shadowVisible={leftShadowVisible}
      checked={selectionChecked}
      indeterminate={selectionIndeterminate}
      checkboxProps={selectionCheckboxProps}
      onChange={onSelectionChange}
      rowSpan={groups ? 2 : undefined}
    />
  ) : null;

  return (
    <Box component="thead" className={clsx('mantine-datatable-header', className)} style={style} ref={ref}>
      {groups && (
        <tr>
          {allRecordsSelectorCell}
          {groups.map((group) => (
            <DataTableColumnGroupHeaderCell key={group.id} group={group} />
          ))}
        </tr>
      )}
      <tr>
        {!groups && allRecordsSelectorCell}
        {columns.map(({ hidden, ...columnProps }) => {
          if (hidden) return null;

          const {
            accessor,
            visibleMediaQuery,
            textAlignment,
            width,
            title,
            sortable,
            titleClassName,
            titleStyle,
            filter,
            filtering,
          } = { ...defaultColumnProps, ...columnProps };

          return (
            <DataTableHeaderCell<T>
              key={accessor}
              accessor={accessor}
              className={titleClassName}
              style={titleStyle}
              visibleMediaQuery={visibleMediaQuery}
              textAlignment={textAlignment}
              width={width}
              title={title}
              sortable={sortable}
              sortStatus={sortStatus}
              sortIcons={sortIcons}
              onSortStatusChange={onSortStatusChange}
              filter={filter}
              filtering={filtering}
            />
          );
        })}
      </tr>
    </Box>
  );
}) as <T>(props: DataTableHeaderProps<T> & { ref: React.ForwardedRef<HTMLTableSectionElement> }) => JSX.Element;
