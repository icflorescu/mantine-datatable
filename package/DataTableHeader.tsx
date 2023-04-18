import { createStyles, type CSSObject } from '@mantine/core';
import { forwardRef, type CSSProperties, type ForwardedRef } from 'react';
import DataTableHeaderCell from './DataTableHeaderCell';
import DataTableHeaderSelectorCell from './DataTableHeaderSelectorCell';
import type { DataTableColumn, DataTableSortProps } from './types';

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

  return (
    <thead className={cx(classes.root, className)} style={style as CSSProperties} ref={ref}>
      <tr>
        {selectionVisible && (
          <DataTableHeaderSelectorCell
            shadowVisible={leftShadowVisible}
            checked={selectionChecked}
            indeterminate={selectionIndeterminate}
            checkboxProps={selectionCheckboxProps}
            onChange={onSelectionChange}
          />
        )}
        {columns.map(
          ({
            accessor,
            hidden,
            visibleMediaQuery,
            textAlignment,
            width,
            title,
            sortable,
            titleClassName,
            titleStyle,
            titleSx,
          }) =>
            hidden ? null : (
              <DataTableHeaderCell<T>
                key={accessor}
                className={titleClassName}
                style={titleStyle}
                sx={titleSx}
                accessor={accessor}
                visibleMediaQuery={visibleMediaQuery}
                textAlignment={textAlignment}
                width={width}
                title={title}
                sortable={sortable}
                sortStatus={sortStatus}
                sortIcons={sortIcons}
                onSortStatusChange={onSortStatusChange}
              />
            )
        )}
      </tr>
    </thead>
  );
}) as <T>(props: DataTableHeaderProps<T> & { ref: ForwardedRef<HTMLTableSectionElement> }) => JSX.Element;
