import { Checkbox, createStyles } from '@mantine/core';
import { ForwardedRef, forwardRef } from 'react';
import { DataTableColumn, DataTableSortStatus } from './DataTable.props';
import DataTableHeaderCell from './DataTableHeaderCell';

const useStyles = createStyles((theme) => {
  const shadowGradientAlpha = theme.colorScheme === 'dark' ? 0.5 : 0.05;
  return {
    root: {
      zIndex: 2,
      position: 'sticky',
      top: 0,
      background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -theme.spacing.sm + 1,
        height: theme.spacing.sm,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
        background: `linear-gradient(${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(
          theme.black,
          0
        )}), linear-gradient(${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(theme.black, 0)} 30%)`,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity .15s ease',
      },
    },
    bottomShadowVisible: {
      '&::after': {
        opacity: 1,
      },
    },
    selectorColumnHeader: {
      position: 'sticky',
      width: 0,
      left: 0,
      background: 'inherit',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: -theme.spacing.sm,
        bottom: 0,
        borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
        width: theme.spacing.sm,
        background: `linear-gradient(to right, ${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(
          theme.black,
          0
        )}), linear-gradient(to right, ${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(
          theme.black,
          0
        )} 30%)`,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity .15s ease',
      },
    },
    selectorColumnHeaderWithRightShadow: {
      '&::after': {
        opacity: 1,
      },
    },
    selectionCheckboxInput: {
      cursor: 'pointer',
    },
  };
});

type DataTableHeaderProps<T> = {
  sortStatus: DataTableSortStatus | undefined;
  onSortStatusChange: ((sortStatus: DataTableSortStatus) => void) | undefined;
  columns: DataTableColumn<T>[];
  expandedColumnPropertyName: string | undefined;
  selectionVisible: boolean;
  selectionChecked: boolean;
  selectionIndeterminate: boolean;
  onSelectionChange: (() => void) | undefined;
  leftShadowVisible: boolean;
  bottomShadowVisible: boolean;
};

export default forwardRef(function DataTableHeader<T>(
  {
    sortStatus,
    onSortStatusChange,
    columns,
    expandedColumnPropertyName,
    selectionVisible,
    selectionChecked,
    selectionIndeterminate,
    onSelectionChange,
    leftShadowVisible,
    bottomShadowVisible,
  }: DataTableHeaderProps<T>,
  ref: ForwardedRef<HTMLTableSectionElement>
) {
  const { classes, cx } = useStyles();

  return (
    <thead
      className={cx(classes.root, {
        [classes.bottomShadowVisible]: bottomShadowVisible,
      })}
      ref={ref}
    >
      <tr>
        {selectionVisible && (
          <th
            className={cx(classes.selectorColumnHeader, {
              [classes.selectorColumnHeaderWithRightShadow]: leftShadowVisible,
            })}
          >
            <Checkbox
              classNames={{ input: classes.selectionCheckboxInput }}
              checked={selectionChecked}
              indeterminate={selectionIndeterminate}
              disabled={!onSelectionChange}
              onChange={onSelectionChange}
            />
          </th>
        )}
        {columns.map(({ propertyName, visibleMediaQuery, textAlign, width, title, sortable }) => (
          <DataTableHeaderCell<T>
            key={propertyName}
            propertyName={propertyName}
            visibleMediaQuery={visibleMediaQuery}
            expandedColumnPropertyName={expandedColumnPropertyName}
            textAlign={textAlign}
            width={width}
            title={title}
            sortable={sortable}
            sortStatus={sortStatus}
            onSortStatusChange={onSortStatusChange}
          />
        ))}
      </tr>
    </thead>
  );
}) as <T>(props: DataTableHeaderProps<T> & { ref: ForwardedRef<HTMLTableSectionElement> }) => JSX.Element;
