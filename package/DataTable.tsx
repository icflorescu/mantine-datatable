import { Box, Table, type MantineSize } from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import { DataTableEmptyRow } from './DataTableEmptyRow';
import { DataTableEmptyState } from './DataTableEmptyState';
import { DataTableFooter } from './DataTableFooter';
import { DataTableHeader } from './DataTableHeader';
import { DataTableLoader } from './DataTableLoader';
import { DataTablePagination } from './DataTablePagination';
import { DataTableRow } from './DataTableRow';
// import DataTableRowMenu from './DataTableRowMenu';
// import DataTableRowMenuDivider from './DataTableRowMenuDivider';
// import DataTableRowMenuItem from './DataTableRowMenuItem';
import { DataTableScrollArea } from './DataTableScrollArea';
import {
  useElementOuterSize,
  useIsomorphicLayoutEffect,
  useLastSelectionChangeIndex,
  useRowContextMenu,
  useRowExpansion,
} from './hooks';
import type { DataTableProps } from './types';
import { differenceBy, getRecordId, uniqBy } from './utils';

export function DataTable<T>({
  borderRadius,
  textSelectionDisabled,
  height = '100%',
  minHeight,
  shadow,
  verticalAlignment = 'center',
  fetching,
  columns,
  groups,
  defaultColumnProps,
  defaultColumnRender,
  idAccessor = 'id',
  records,
  selectedRecords,
  onSelectedRecordsChange,
  isRecordSelectable,
  allRecordsSelectionCheckboxProps = { 'aria-label': 'Select all records' },
  getRecordSelectionCheckboxProps = ({ index }) => ({ 'aria-label': `Select record ${index + 1}` }),
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
  getPaginationControlProps = (control) => {
    if (control === 'previous') {
      return { 'aria-label': 'Previous page' };
    } else if (control === 'next') {
      return { 'aria-label': 'Next page' };
    }
    return {};
  },
  loaderBackgroundBlur,
  customLoader,
  loaderSize,
  loaderType,
  loaderColor,
  loadingText = '...',
  emptyState,
  noRecordsText = 'No records',
  noRecordsIcon,
  striped,
  noHeader: withoutHeader,
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
  customRowAttributes,
  scrollViewportRef: scrollViewportRefProp,
  scrollAreaProps,
  bodyRef,
  m,
  my,
  mx,
  mt,
  mb,
  ml,
  mr,
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
  } = useElementOuterSize<HTMLDivElement>();

  const effectiveColumns = useMemo(() => {
    return groups?.flatMap((group) => group.columns) ?? columns!;
  }, [columns, groups]);

  const { ref: headerRef, height: headerHeight } = useElementOuterSize<HTMLTableSectionElement>();
  const { ref: tableRef, width: tableWidth, height: tableHeight } = useElementOuterSize<HTMLTableElement>();
  const { ref: footerRef, height: footerHeight } = useElementOuterSize<HTMLTableSectionElement>();
  const { ref: paginationRef, height: paginationHeight } = useElementOuterSize<HTMLDivElement>();

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
      const scrollTop = scrollViewportRef.current?.scrollTop || 0;
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
      const scrollLeft = scrollViewportRef.current?.scrollLeft || 0;
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
      scrollViewportRef.current?.scrollTo({ top: 0, left: 0 });
      onPageChange!(page);
    },
    [onPageChange, scrollViewportRef]
  );

  const recordsLength = records?.length;
  const recordIds = records?.map((record) => getRecordId(record, idAccessor));
  const selectionColumnVisible = !!selectedRecords;
  const selectedRecordIds = selectedRecords?.map((record) => getRecordId(record, idAccessor));
  const hasRecordsAndSelectedRecords =
    recordIds !== undefined && selectedRecordIds !== undefined && selectedRecordIds.length > 0;

  const selectableRecords = isRecordSelectable
    ? records?.filter((record, index) => isRecordSelectable({ record, index }))
    : records;
  const selectableRecordIds = selectableRecords?.map((record) => getRecordId(record, idAccessor));

  const allSelectableRecordsSelected =
    hasRecordsAndSelectedRecords && selectableRecordIds!.every((id) => selectedRecordIds.includes(id));
  const someRecordsSelected =
    hasRecordsAndSelectedRecords && selectableRecordIds!.some((id) => selectedRecordIds.includes(id));

  const handleHeaderSelectionChange = useCallback(() => {
    if (selectedRecords && onSelectedRecordsChange) {
      onSelectedRecordsChange(
        allSelectableRecordsSelected
          ? selectedRecords.filter((record) => !selectableRecordIds!.includes(getRecordId(record, idAccessor)))
          : uniqBy([...selectedRecords, ...selectableRecords!], (record) => getRecordId(record, idAccessor))
      );
    }
  }, [
    allSelectableRecordsSelected,
    idAccessor,
    onSelectedRecordsChange,
    selectableRecordIds,
    selectableRecords,
    selectedRecords,
  ]);

  const { lastSelectionChangeIndex, setLastSelectionChangeIndex } = useLastSelectionChangeIndex(recordIds);
  const selectionVisibleAndNotScrolledToLeft = selectionColumnVisible && !scrolledToLeft;

  const marginProperties = { m, my, mx, mt, mb, ml, mr };

  return (
    <Box
      {...marginProperties}
      className={clsx('mantine-datatable', className, classNames?.root)}
      style={[
        (theme) => ({
          borderRadius: theme.radius[borderRadius as MantineSize] || borderRadius,
          boxShadow: theme.shadows[shadow as MantineSize] || shadow,
          height,
          minHeight,
        }),
        style,
        styles?.root,
      ]}
    >
      <DataTableScrollArea
        viewportRef={useMergedRef(scrollViewportRef, scrollViewportRefProp)}
        topShadowVisible={!scrolledToTop}
        leftShadowVisible={!(selectedRecords || scrolledToLeft)}
        rightShadowVisible={!scrolledToRight}
        bottomShadowVisible={!scrolledToBottom}
        headerHeight={headerHeight}
        footerHeight={footerHeight}
        onScrollPositionChange={handleScrollPositionChange}
        scrollAreaProps={scrollAreaProps}
      >
        <Table
          ref={tableRef}
          horizontalSpacing={horizontalSpacing}
          className={clsx(
            classNames?.table,
            /* classes.table, */ {
              // [classes.tableWithColumnBorders]: withColumnBorders,
              // [classes.lastRowBorderBottomVisible]: tableHeight < scrollViewportHeight,
              'mantine-datatable-text-selection-disabled': textSelectionDisabled,
              'mantine-datatable-vertical-alignment-top': verticalAlignment === 'top',
              'mantine-datatable-vertical-alignment-bottom': verticalAlignment === 'bottom',
              // [classes.tableWithColumnBordersAndSelectableRecords]: selectionColumnVisible && withColumnBorders,
            }
          )}
          style={styles?.table}
          striped={recordsLength ? striped : false}
          {...otherProps}
        >
          {withoutHeader ? null : (
            <DataTableHeader<T>
              ref={headerRef}
              className={classNames?.header}
              style={styles?.header}
              columns={effectiveColumns}
              defaultColumnProps={defaultColumnProps}
              groups={groups}
              sortStatus={sortStatus}
              sortIcons={sortIcons}
              onSortStatusChange={onSortStatusChange}
              selectionVisible={selectionColumnVisible}
              selectionChecked={allSelectableRecordsSelected}
              selectionIndeterminate={someRecordsSelected && !allSelectableRecordsSelected}
              onSelectionChange={handleHeaderSelectionChange}
              selectionCheckboxProps={allRecordsSelectionCheckboxProps}
              leftShadowVisible={selectionVisibleAndNotScrolledToLeft}
            />
          )}
          <tbody ref={bodyRef}>
            {recordsLength ? (
              records.map((record, index) => {
                const recordId = getRecordId(record, idAccessor);
                const isSelected = selectedRecordIds?.includes(recordId) || false;

                // let showContextMenuOnClick = false;
                // let showContextMenuOnRightClick = false;
                // if (rowContextMenu) {
                //   const { hidden } = rowContextMenu;
                //   if (!hidden || !(typeof hidden === 'function' ? hidden(record, recordIndex) : hidden)) {
                //     if (rowContextMenu.trigger === 'click') {
                //       showContextMenuOnClick = true;
                //     } else {
                //       showContextMenuOnRightClick = true;
                //     }
                //   }
                // }

                let handleSelectionChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
                if (onSelectedRecordsChange && selectedRecords) {
                  handleSelectionChange = (e) => {
                    if ((e.nativeEvent as PointerEvent).shiftKey && lastSelectionChangeIndex !== null) {
                      const targetRecords = records.filter(
                        index > lastSelectionChangeIndex
                          ? (rec, idx) =>
                              idx >= lastSelectionChangeIndex &&
                              idx <= index &&
                              (isRecordSelectable ? isRecordSelectable({ record: rec, index: idx }) : true)
                          : (rec, idx) =>
                              idx >= index &&
                              idx <= lastSelectionChangeIndex &&
                              (isRecordSelectable ? isRecordSelectable({ record: rec, index: idx }) : true)
                      );
                      onSelectedRecordsChange(
                        isSelected
                          ? differenceBy(selectedRecords, targetRecords, (r) => getRecordId(r, idAccessor))
                          : uniqBy([...selectedRecords, ...targetRecords], (r) => getRecordId(r, idAccessor))
                      );
                    } else {
                      onSelectedRecordsChange(
                        isSelected
                          ? selectedRecords.filter((rec) => getRecordId(rec, idAccessor) !== recordId)
                          : uniqBy([...selectedRecords, record], (rec) => getRecordId(rec, idAccessor))
                      );
                    }
                    setLastSelectionChangeIndex(index);
                  };
                }

                // let handleClick: MouseEventHandler<HTMLTableRowElement> | undefined;
                // if (showContextMenuOnClick) {
                //   handleClick = (e) => {
                //     setRowContextMenuInfo({ y: e.clientY, x: e.clientX, record, recordIndex });
                //     onRowClick?.(record, recordIndex, e);
                //   };
                // } else if (onRowClick) {
                //   handleClick = (e) => {
                //     onRowClick(record, recordIndex, e);
                //   };
                // }

                // let handleContextMenu: MouseEventHandler<HTMLTableRowElement> | undefined;
                // if (showContextMenuOnRightClick) {
                //   handleContextMenu = (e) => {
                //     e.preventDefault();
                //     setRowContextMenuInfo({ y: e.clientY, x: e.clientX, record, recordIndex });
                //   };
                // }

                return (
                  <DataTableRow<T>
                    key={recordId as React.Key}
                    record={record}
                    index={index}
                    columns={effectiveColumns}
                    defaultColumnProps={defaultColumnProps}
                    defaultColumnRender={defaultColumnRender}
                    selectionVisible={selectionColumnVisible}
                    selectionChecked={isSelected}
                    onSelectionChange={handleSelectionChange}
                    isRecordSelectable={isRecordSelectable}
                    getSelectionCheckboxProps={getRecordSelectionCheckboxProps}
                    // onClick={handleClick}
                    onClick={onRowClick ? (event) => onRowClick({ record, index, event }) : undefined}
                    onCellClick={onCellClick}
                    // onContextMenu={handleContextMenu}
                    contextMenuVisible={
                      rowContextMenuInfo ? getRecordId(rowContextMenuInfo.record, idAccessor) === recordId : false
                    }
                    expansion={rowExpansionInfo}
                    className={rowClassName}
                    style={rowStyle}
                    customAttributes={customRowAttributes}
                    leftShadowVisible={selectionVisibleAndNotScrolledToLeft}
                  />
                );
              })
            ) : (
              <DataTableEmptyRow />
            )}
          </tbody>
          {effectiveColumns.some(({ footer }) => footer) && (
            <DataTableFooter<T>
              ref={footerRef}
              className={classNames?.footer}
              style={styles?.footer}
              // borderColor={borderColor}
              columns={effectiveColumns}
              defaultColumnProps={defaultColumnProps}
              selectionVisible={selectionColumnVisible}
              leftShadowVisible={selectionVisibleAndNotScrolledToLeft}
              scrollDiff={tableHeight - scrollViewportHeight}
            />
          )}
        </Table>
      </DataTableScrollArea>
      {page && (
        <DataTablePagination
          ref={paginationRef}
          className={classNames?.pagination}
          style={styles?.pagination}
          // topBorderColor={borderColor}
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
          getPaginationControlProps={getPaginationControlProps}
          noRecordsText={noRecordsText}
          loadingText={loadingText}
          recordsLength={recordsLength}
        />
      )}
      <DataTableLoader
        pt={headerHeight}
        pb={paginationHeight}
        fetching={fetching}
        backgroundBlur={loaderBackgroundBlur}
        customContent={customLoader}
        size={loaderSize}
        type={loaderType}
        color={loaderColor}
      />
      <DataTableEmptyState
        pt={headerHeight}
        pb={paginationHeight}
        icon={noRecordsIcon}
        text={noRecordsText}
        active={!fetching && !recordsLength}
      >
        {emptyState}
      </DataTableEmptyState>
      {/* {rowContextMenu && rowContextMenuInfo && (
        <Portal>
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
        </Portal>
      )} */}
    </Box>
  );
}
