import { Checkbox, createStyles, CSSObject } from '@mantine/core';
import { CSSProperties, ForwardedRef, forwardRef } from 'react';
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
    textSelectionDisabled: {
      userSelect: 'none',
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
  className?: string;
  style?: CSSObject;
  sortStatus: DataTableSortStatus | undefined;
  onSortStatusChange: ((sortStatus: DataTableSortStatus) => void) | undefined;
  columns: DataTableColumn<T>[];
  selectionVisible: boolean;
  selectionChecked: boolean;
  selectionIndeterminate: boolean;
  onSelectionChange: (() => void) | undefined;
  leftShadowVisible: boolean;
  bottomShadowVisible: boolean;
};

export default forwardRef(function DataTableHeader<T>(
  {
    className,
    style,
    sortStatus,
    onSortStatusChange,
    columns,
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
      className={cx(classes.root, { [classes.bottomShadowVisible]: bottomShadowVisible }, className)}
      style={style as CSSProperties}
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
        {columns.map(({ accessor, visibleMediaQuery, textAlignment, width, title, sortable }) => (
          <DataTableHeaderCell<T>
            key={accessor}
            accessor={accessor}
            visibleMediaQuery={visibleMediaQuery}
            textAlignment={textAlignment}
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
