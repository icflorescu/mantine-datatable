import { Box, createStyles, MantineSize, MantineTheme, packSx, Table } from '@mantine/core';
import { useElementSize, useMergedRef } from '@mantine/hooks';
import {
  useCallback,
  useState,
  type ChangeEventHandler,
  type CSSProperties,
  type Key,
  type MouseEventHandler,
} from 'react';
import DataTableEmptyRow from './DataTableEmptyRow';
import DataTableEmptyState from './DataTableEmptyState';
import DataTableHeader from './DataTableHeader';
import DataTableLoader from './DataTableLoader';
import DataTablePaginationFooter from './DataTablePaginationFooter';
import DataTableRow from './DataTableRow';
import DataTableRowMenu from './DataTableRowMenu';
import DataTableRowMenuDivider from './DataTableRowMenuDivider';
import DataTableRowMenuItem from './DataTableRowMenuItem';
import DataTableScrollArea from './DataTableScrollArea';
import { useLastSelectionChangeIndex, useRowContextMenu, useRowExpansion } from './hooks';
import type { DataTableProps } from './types';
import { differenceBy, getValueAtPath, humanize, uniqBy, useIsomorphicLayoutEffect } from './utils';

const EMPTY_OBJECT = {};

const useStyles = createStyles(
  (
    theme,
    {
      borderColor,
      rowBorderColor,
    }: {
      borderColor: string | ((theme: MantineTheme) => string);
      rowBorderColor: string | ((theme: MantineTheme) => string);
    }
  ) => {
    const borderColorValue = typeof borderColor === 'function' ? borderColor(theme) : borderColor;
    const rowBorderColorValue = typeof rowBorderColor === 'function' ? rowBorderColor(theme) : rowBorderColor;

    return {
      root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        tr: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        },
        '&&': {
          'thead tr th': {
            borderBottomColor: borderColorValue,
          },
          'tbody tr td': {
            borderTopColor: rowBorderColorValue,
          },
        },
      },
      lastRowBorderBottomVisible: {
        'tbody tr:last-of-type td': {
          borderBottom: `1px solid ${rowBorderColorValue}`,
        },
      },
      textSelectionDisabled: {
        userSelect: 'none',
      },
      table: {
        borderCollapse: 'separate',
        borderSpacing: 0,
      },
      tableWithBorder: {
        border: `1px solid ${borderColorValue}`,
      },
      tableWithColumnBorders: {
        '&&': {
          'th, td': {
            ':not(:first-of-type)': {
              borderLeft: `1px solid ${rowBorderColorValue}`,
            },
          },
        },
      },
      verticalAlignmentTop: {
        td: {
          verticalAlign: 'top',
        },
      },
      verticalAlignmentBottom: {
        td: {
          verticalAlign: 'bottom',
        },
      },
    };
  }
);

export default function DataTable<T>({
  withBorder,
  borderRadius,
  borderColor = (theme) => (theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]),
  rowBorderColor = (theme) =>
    theme.fn.rgba(theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3], 0.65),
  withColumnBorders,
  textSelectionDisabled,
  height = '100%',
  minHeight,
  shadow,
  verticalAlignment = 'center',
  fetching,
  columns,
  defaultColumnRender,
  idAccessor = 'id',
  records,
  selectedRecords,
  onSelectedRecordsChange,
  isRecordSelectable,
  sortStatus,
  sortIcons,
  onSortStatusChange,
  horizontalSpacing,
  page,
  onPageChange,
  totalRecords,
  recordsPerPage,
  onRecordsPerPageChange,
  recordsPerPageOptions,
  recordsPerPageLabel = 'Records per page',
  paginationColor,
  paginationSize = 'sm',
  paginationText = ({ from, to, totalRecords }) => `${from} - ${to} / ${totalRecords}`,
  paginationWrapBreakpoint = 'sm',
  loaderBackgroundBlur,
  customLoader,
  loaderSize,
  loaderVariant,
  loaderColor,
  loadingText = '...',
  emptyState,
  noRecordsText = 'No records',
  noRecordsIcon,
  striped,
  onRowClick,
  onCellClick,
  onScrollToTop,
  onScrollToBottom,
  onScrollToLeft,
  onScrollToRight,
  rowContextMenu,
  rowExpansion,
  rowClassName,
  rowStyle,
  rowSx,
  customRowAttributes,
  scrollViewportRef: scrollViewportRefProp,
  bodyRef,
  m,
  my,
  mx,
  mt,
  mb,
  ml,
  mr,
  sx,
  className,
  classNames,
  style,
  styles,
  ...otherProps
}: DataTableProps<T>) {
  const {
    ref: scrollViewportRef,
    width: scrollViewportWidth,
    height: scrollViewportHeight,
  } = useElementSize<HTMLDivElement>();

  const { ref: headerRef, height: headerHeight } = useElementSize<HTMLTableSectionElement>();
  const { ref: tableRef, width: tableWidth, height: tableHeight } = useElementSize<HTMLTableElement>();
  const { ref: footerRef, height: footerHeight } = useElementSize<HTMLDivElement>();

  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [scrolledToBottom, setScrolledToBottom] = useState(true);
  const [scrolledToLeft, setScrolledToLeft] = useState(true);
  const [scrolledToRight, setScrolledToRight] = useState(true);

  const { rowContextMenuInfo, setRowContextMenuInfo } = useRowContextMenu<T>(fetching);
  const rowExpansionInfo = useRowExpansion<T>({ rowExpansion, records, idAccessor });

  const handleScrollPositionChange = useCallback(() => {
    if (!fetching && rowContextMenu) {
      setRowContextMenuInfo(null);
    }

    if (fetching || tableHeight <= scrollViewportHeight) {
      setScrolledToTop(true);
      setScrolledToBottom(true);
    } else {
      const scrollTop = scrollViewportRef.current.scrollTop;
      const newScrolledToTop = scrollTop === 0;
      const newScrolledToBottom = tableHeight - scrollTop - scrollViewportHeight < 1;
      setScrolledToTop(newScrolledToTop);
      setScrolledToBottom(newScrolledToBottom);
      if (newScrolledToTop && newScrolledToTop !== scrolledToTop) onScrollToTop?.();
      if (newScrolledToBottom && newScrolledToBottom !== scrolledToBottom) onScrollToBottom?.();
    }

    if (fetching || tableWidth === scrollViewportWidth) {
      setScrolledToLeft(true);
      setScrolledToRight(true);
    } else {
      const scrollLeft = scrollViewportRef.current.scrollLeft;
      const newScrolledToLeft = scrollLeft === 0;
      const newScrolledToRight = tableWidth - scrollLeft - scrollViewportWidth < 1;
      setScrolledToLeft(newScrolledToLeft);
      setScrolledToRight(newScrolledToRight);
      if (newScrolledToLeft && newScrolledToLeft !== scrolledToLeft) onScrollToLeft?.();
      if (newScrolledToRight && newScrolledToRight !== scrolledToRight) onScrollToRight?.();
    }
  }, [
    fetching,
    onScrollToBottom,
    onScrollToLeft,
    onScrollToRight,
    onScrollToTop,
    rowContextMenu,
    scrollViewportHeight,
    scrollViewportRef,
    scrollViewportWidth,
    scrolledToBottom,
    scrolledToLeft,
    scrolledToRight,
    scrolledToTop,
    setRowContextMenuInfo,
    tableHeight,
    tableWidth,
  ]);

  useIsomorphicLayoutEffect(handleScrollPositionChange, [handleScrollPositionChange]);

  const handlePageChange = useCallback(
    (page: number) => {
      scrollViewportRef.current.scrollTo({ top: 0, left: 0 });
      onPageChange!(page);
    },
    [onPageChange, scrollViewportRef]
  );

  const recordsLength = records?.length;
  const recordIds = records?.map((record) => getValueAtPath(record, idAccessor));
  const selectedRecordIds = selectedRecords?.map((record) => getValueAtPath(record, idAccessor));
  const hasRecordsAndSelectedRecords =
    recordIds !== undefined && selectedRecordIds !== undefined && selectedRecordIds.length > 0;

  const selectableRecords = isRecordSelectable ? records?.filter(isRecordSelectable) : records;
  const selectableRecordIds = selectableRecords?.map((record) => getValueAtPath(record, idAccessor));

  const allSelectableRecordsSelected =
    hasRecordsAndSelectedRecords && selectableRecordIds!.every((id) => selectedRecordIds.includes(id));
  const someRecordsSelected =
    hasRecordsAndSelectedRecords && selectableRecordIds!.some((id) => selectedRecordIds.includes(id));

  const handleHeaderSelectionChange = useCallback(() => {
    onSelectedRecordsChange?.(
      allSelectableRecordsSelected
        ? selectedRecords.filter((record) => !selectableRecordIds!.includes(getValueAtPath(record, idAccessor)))
        : uniqBy([...selectedRecords, ...selectableRecords!], (record) => getValueAtPath(record, idAccessor))
    );
  }, [
    allSelectableRecordsSelected,
    idAccessor,
    onSelectedRecordsChange,
    selectableRecordIds,
    selectableRecords,
    selectedRecords,
  ]);

  const { lastSelectionChangeIndex, setLastSelectionChangeIndex } = useLastSelectionChangeIndex(recordIds);
  const selectionVisibleAndNotScrolledToLeft = !!selectedRecords && !scrolledToLeft;
  const { cx, classes, theme } = useStyles({ borderColor, rowBorderColor });
  const marginProperties = { m, my, mx, mt, mb, ml, mr };
  const styleProperties = typeof styles === 'function' ? styles(theme, EMPTY_OBJECT, EMPTY_OBJECT) : styles;

  return (
    <Box
      {...marginProperties}
      className={cx(classes.root, { [classes.tableWithBorder]: withBorder }, className, classNames?.root)}
      sx={[
        (theme) => ({
          borderRadius: theme.radius[borderRadius as MantineSize] || borderRadius,
          boxShadow: theme.shadows[shadow as MantineSize] || shadow,
          height,
          minHeight,
        }),
        ...packSx(sx),
      ]}
      style={{ ...styleProperties?.root, ...style } as CSSProperties}
    >
      <DataTableScrollArea
        viewportRef={useMergedRef(scrollViewportRef, scrollViewportRefProp || null)}
        topShadowVisible={!scrolledToTop}
        leftShadowVisible={!(selectedRecords || scrolledToLeft)}
        rightShadowVisible={!scrolledToRight}
        bottomShadowVisible={!scrolledToBottom}
        headerHeight={headerHeight}
        onScrollPositionChange={handleScrollPositionChange}
      >
        <Table
          ref={tableRef}
          horizontalSpacing={horizontalSpacing}
          className={cx(classes.table, {
            [classes.tableWithColumnBorders]: withColumnBorders,
            [classes.lastRowBorderBottomVisible]: tableHeight < scrollViewportHeight,
            [classes.textSelectionDisabled]: textSelectionDisabled,
            [classes.verticalAlignmentTop]: verticalAlignment === 'top',
            [classes.verticalAlignmentBottom]: verticalAlignment === 'bottom',
          })}
          striped={recordsLength ? striped : false}
          {...otherProps}
        >
          <DataTableHeader<T>
            ref={headerRef}
            className={classNames?.header}
            style={styleProperties?.header}
            columns={columns}
            sortStatus={sortStatus}
            sortIcons={sortIcons}
            onSortStatusChange={onSortStatusChange}
            selectionVisible={!!selectedRecords}
            selectionChecked={allSelectableRecordsSelected}
            selectionIndeterminate={someRecordsSelected && !allSelectableRecordsSelected}
            onSelectionChange={handleHeaderSelectionChange}
            leftShadowVisible={selectionVisibleAndNotScrolledToLeft}
          />
          <tbody ref={bodyRef}>
            {recordsLength ? (
              records.map((record, recordIndex) => {
                const recordId = getValueAtPath(record, idAccessor);
                const isSelected = selectedRecordIds?.includes(recordId) || false;

                let showContextMenuOnClick = false;
                let showContextMenuOnRightClick = false;
                if (rowContextMenu) {
                  const { hidden } = rowContextMenu;
                  if (!hidden || !(typeof hidden === 'function' ? hidden(record, recordIndex) : hidden)) {
                    if (rowContextMenu.trigger === 'click') {
                      showContextMenuOnClick = true;
                    } else {
                      showContextMenuOnRightClick = true;
                    }
                  }
                }

                let handleSelectionChange: ChangeEventHandler<HTMLInputElement> | undefined;
                if (onSelectedRecordsChange) {
                  handleSelectionChange = (e) => {
                    if ((e.nativeEvent as PointerEvent).shiftKey && lastSelectionChangeIndex !== null) {
                      const targetRecords = records.filter(
                        recordIndex > lastSelectionChangeIndex
                          ? (r, index) =>
                              index >= lastSelectionChangeIndex &&
                              index <= recordIndex &&
                              (isRecordSelectable ? isRecordSelectable(r, index) : true)
                          : (r, index) =>
                              index >= recordIndex &&
                              index <= lastSelectionChangeIndex &&
                              (isRecordSelectable ? isRecordSelectable(r, index) : true)
                      );
                      onSelectedRecordsChange(
                        isSelected
                          ? differenceBy(selectedRecords, targetRecords, (r) => getValueAtPath(r, idAccessor))
                          : uniqBy([...selectedRecords, ...targetRecords], (r) => getValueAtPath(r, idAccessor))
                      );
                    } else {
                      onSelectedRecordsChange(
                        isSelected
                          ? selectedRecords.filter((record) => getValueAtPath(record, idAccessor) !== recordId)
                          : uniqBy([...selectedRecords, record], (record) => getValueAtPath(record, idAccessor))
                      );
                    }
                    setLastSelectionChangeIndex(recordIndex);
                  };
                }

                let handleClick: MouseEventHandler<HTMLTableRowElement> | undefined;
                if (showContextMenuOnClick) {
                  handleClick = (e) => {
                    setRowContextMenuInfo({ y: e.clientY, x: e.clientX, record, recordIndex });
                    onRowClick?.(record, recordIndex, e);
                  };
                } else if (onRowClick) {
                  handleClick = (e) => {
                    onRowClick(record, recordIndex, e);
                  };
                }

                let handleContextMenu: MouseEventHandler<HTMLTableRowElement> | undefined;
                if (showContextMenuOnRightClick) {
                  handleContextMenu = (e) => {
                    e.preventDefault();
                    setRowContextMenuInfo({ y: e.clientY, x: e.clientX, record, recordIndex });
                  };
                }

                return (
                  <DataTableRow<T>
                    key={recordId as Key}
                    record={record}
                    recordIndex={recordIndex}
                    columns={columns}
                    defaultColumnRender={defaultColumnRender}
                    selectionVisible={!!selectedRecords}
                    selectionChecked={isSelected}
                    onSelectionChange={handleSelectionChange}
                    isRecordSelectable={isRecordSelectable}
                    onClick={handleClick}
                    onCellClick={onCellClick}
                    onContextMenu={handleContextMenu}
                    contextMenuVisible={
                      rowContextMenuInfo ? getValueAtPath(rowContextMenuInfo.record, idAccessor) === recordId : false
                    }
                    expansion={rowExpansionInfo}
                    className={rowClassName}
                    style={rowStyle}
                    sx={rowSx}
                    customRowAttributes={customRowAttributes}
                    leftShadowVisible={selectionVisibleAndNotScrolledToLeft}
                  />
                );
              })
            ) : (
              <DataTableEmptyRow />
            )}
          </tbody>
        </Table>
      </DataTableScrollArea>
      {page && (
        <DataTablePaginationFooter
          ref={footerRef}
          className={classNames?.pagination}
          style={styleProperties?.pagination}
          topBorderColor={borderColor}
          horizontalSpacing={horizontalSpacing}
          fetching={fetching}
          page={page}
          onPageChange={handlePageChange}
          totalRecords={totalRecords}
          recordsPerPage={recordsPerPage}
          onRecordsPerPageChange={onRecordsPerPageChange}
          recordsPerPageOptions={recordsPerPageOptions}
          recordsPerPageLabel={recordsPerPageLabel}
          paginationColor={paginationColor}
          paginationSize={paginationSize}
          paginationText={paginationText}
          paginationWrapBreakpoint={paginationWrapBreakpoint}
          noRecordsText={noRecordsText}
          loadingText={loadingText}
          recordsLength={recordsLength}
        />
      )}
      <DataTableLoader
        pt={headerHeight}
        pb={footerHeight}
        fetching={fetching}
        backgroundBlur={loaderBackgroundBlur}
        customContent={customLoader}
        size={loaderSize}
        variant={loaderVariant}
        color={loaderColor}
      />
      <DataTableEmptyState
        pt={headerHeight}
        pb={footerHeight}
        icon={noRecordsIcon}
        text={noRecordsText}
        active={!fetching && !recordsLength}
      >
        {emptyState}
      </DataTableEmptyState>
      {rowContextMenu && rowContextMenuInfo && (
        <DataTableRowMenu
          zIndex={rowContextMenu.zIndex}
          borderRadius={rowContextMenu.borderRadius}
          shadow={rowContextMenu.shadow}
          y={rowContextMenuInfo.y}
          x={rowContextMenuInfo.x}
          onDestroy={() => setRowContextMenuInfo(null)}
        >
          {rowContextMenu
            .items(rowContextMenuInfo.record, rowContextMenuInfo.recordIndex)
            .map(({ divider, key, title, icon, color, hidden, disabled, onClick }) =>
              divider ? (
                <DataTableRowMenuDivider key={key} />
              ) : hidden ? null : (
                <DataTableRowMenuItem
                  key={key}
                  title={title ?? humanize(key)}
                  icon={icon}
                  color={color}
                  disabled={disabled}
                  onClick={() => {
                    setRowContextMenuInfo(null);
                    onClick();
                  }}
                />
              )
            )}
        </DataTableRowMenu>
      )}
    </Box>
  );
}
