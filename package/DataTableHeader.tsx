import { createStyles, type CSSObject } from '@mantine/core';
import { forwardRef, type CSSProperties, type ForwardedRef } from 'react';
import DataTableColumnGroupHeaderCell from './DataTableColumnGroupHeaderCell';
import DataTableHeaderCell from './DataTableHeaderCell';
import DataTableHeaderSelectorCell from './DataTableHeaderSelectorCell';
import type { DataTableColumn, DataTableColumnGroup, DataTableSortProps } from './types';

const useStyles = createStyles((theme) => ({
  root: {
    zIndex: 2,
    position: 'sticky',
    top: 0,
    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  textSelectionDisabled: {
    userSelect: 'none',
  },
}));

type DataTableHeaderProps<T> = {
  className?: string;
  style?: CSSObject;
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

export default forwardRef(function DataTableHeader<T>(
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
  ref: ForwardedRef<HTMLTableSectionElement>
) {
  const { classes, cx } = useStyles();

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
    <thead className={cx(classes.root, className)} style={style as CSSProperties} ref={ref}>
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
            titleSx,
            filter,
            filtering,
          } = { ...defaultColumnProps, ...columnProps };

          return (
            <DataTableHeaderCell<T>
              key={accessor}
              accessor={accessor}
              className={titleClassName}
              style={titleStyle}
              sx={titleSx}
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
    </thead>
  );
}) as <T>(props: DataTableHeaderProps<T> & { ref: ForwardedRef<HTMLTableSectionElement> }) => JSX.Element;
