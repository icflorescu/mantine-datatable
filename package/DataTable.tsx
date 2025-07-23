import { Box, Table, type MantineSize } from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { DataTableColumnsProvider } from './DataTableDragToggleProvider';
import { DataTableEmptyRow } from './DataTableEmptyRow';
import { DataTableEmptyState } from './DataTableEmptyState';
import { DataTableFooter } from './DataTableFooter';
import { DataTableHeader } from './DataTableHeader';
import { DataTableLoader } from './DataTableLoader';
import { DataTablePagination } from './DataTablePagination';
import { DataTableRow } from './DataTableRow';
import { DataTableScrollArea } from './DataTableScrollArea';
import { getTableCssVariables } from './cssVariables';
import {
  useDataTableColumns,
  useDataTableInjectCssVariables,
  useLastSelectionChangeIndex,
  useRowExpansion,
} from './hooks';
import type { DataTableProps } from './types';
import { TEXT_SELECTION_DISABLED } from './utilityClasses';
import { differenceBy, getRecordId, uniqBy } from './utils';

export function DataTable<T>({
  withTableBorder,
  borderRadius,
  textSelectionDisabled,
  height = '100%',
  minHeight,
  maxHeight,
  shadow,
  verticalAlign = 'center',
  fetching,
  columns,
  storeColumnsKey,
  groups,
  pinFirstColumn,
  pinLastColumn,
  defaultColumnProps,
  defaultColumnRender,
  idAccessor = 'id',
  records,
  selectionTrigger = 'checkbox',
  selectedRecords,
  onSelectedRecordsChange,
  selectionColumnClassName,
  selectionColumnStyle,
  isRecordSelectable,
  selectionCheckboxProps,
  allRecordsSelectionCheckboxProps = { 'aria-label': 'Select all records' },
  getRecordSelectionCheckboxProps = (_, index) => ({ 'aria-label': `Select record ${index + 1}` }),
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
  paginationWithEdges,
  paginationWithControls,
  paginationActiveTextColor,
  paginationActiveBackgroundColor,
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
  highlightOnHover,
  striped,
  noHeader,
  onRowClick,
  onRowDoubleClick,
  onRowContextMenu,
  onCellClick,
  onCellDoubleClick,
  onCellContextMenu,
  onScroll,
  onScrollToTop,
  onScrollToBottom,
  onScrollToLeft,
  onScrollToRight,
  c,
  backgroundColor,
  borderColor,
  rowBorderColor,
  stripedColor,
  highlightOnHoverColor,
  rowColor,
  rowBackgroundColor,
  rowExpansion,
  rowClassName,
  rowStyle,
  customRowAttributes,
  scrollViewportRef,
  scrollAreaProps,
  tableRef,
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
  rowFactory,
  tableWrapper,
  ...otherProps
}: DataTableProps<T>) {
  const effectiveColumns = useMemo(() => {
    return groups?.flatMap((group) => group.columns) ?? columns!;
  }, [columns, groups]);

  const hasResizableColumns = useMemo(() => {
    return effectiveColumns.some((col) => col.resizable);
  }, [effectiveColumns]);

  const dragToggle = useDataTableColumns({
    key: storeColumnsKey,
    columns: effectiveColumns,
  });

  const { refs, onScroll: handleScrollPositionChange } = useDataTableInjectCssVariables({
    scrollCallbacks: {
      onScroll,
      onScrollToTop,
      onScrollToBottom,
      onScrollToLeft,
      onScrollToRight,
    },
    withRowBorders: otherProps.withRowBorders,
  });

  const mergedTableRef = useMergedRef(refs.table, tableRef);
  const mergedViewportRef = useMergedRef(refs.scrollViewport, scrollViewportRef);

  const rowExpansionInfo = useRowExpansion<T>({ rowExpansion, records, idAccessor });

  const handlePageChange = useCallback(
    (page: number) => {
      refs.scrollViewport.current?.scrollTo({ top: 0, left: 0 });
      onPageChange!(page);
    },
    [onPageChange, refs.scrollViewport]
  );

  const recordsLength = records?.length;
  const recordIds = records?.map((record) => getRecordId(record, idAccessor));
  const selectionColumnVisible = !!selectedRecords;
  const selectedRecordIds = selectedRecords?.map((record) => getRecordId(record, idAccessor));
  const hasRecordsAndSelectedRecords =
    recordIds !== undefined && selectedRecordIds !== undefined && selectedRecordIds.length > 0;

  const selectableRecords = isRecordSelectable ? records?.filter(isRecordSelectable) : records;
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
  const selectorCellShadowVisible = selectionColumnVisible && !pinFirstColumn;

  const marginProperties = { m, my, mx, mt, mb, ml, mr };

  const TableWrapper = useCallback(
    ({ children }: { children: React.ReactNode }) => {
      if (tableWrapper) return tableWrapper({ children });
      return children;
    },
    [tableWrapper]
  );

  return (
    <DataTableColumnsProvider {...dragToggle}>
      <Box
        ref={refs.root}
        {...marginProperties}
        className={clsx(
          'mantine-datatable',
          { 'mantine-datatable-with-border': withTableBorder },
          className,
          classNames?.root
        )}
        style={[
          (theme) => ({
            ...getTableCssVariables({
              theme,
              c,
              backgroundColor,
              borderColor,
              rowBorderColor,
              stripedColor,
              highlightOnHoverColor,
            }),
            borderRadius: theme.radius[borderRadius as MantineSize] || borderRadius,
            boxShadow: theme.shadows[shadow as MantineSize] || shadow,
            height,
            minHeight,
            maxHeight,
          }),
          style,
          styles?.root,
          {
            position: 'relative',
          },
        ]}
      >
        <DataTableScrollArea
          viewportRef={mergedViewportRef}
          leftShadowBehind={selectionColumnVisible || !!pinFirstColumn}
          rightShadowBehind={pinLastColumn}
          onScrollPositionChange={handleScrollPositionChange}
          scrollAreaProps={scrollAreaProps}
        >
          <TableWrapper>
            <Table
              ref={mergedTableRef}
              horizontalSpacing={horizontalSpacing}
              className={clsx(
                'mantine-datatable-table',
                {
                  [TEXT_SELECTION_DISABLED]: textSelectionDisabled,
                  'mantine-datatable-vertical-align-top': verticalAlign === 'top',
                  'mantine-datatable-vertical-align-bottom': verticalAlign === 'bottom',
                  'mantine-datatable-pin-last-column': pinLastColumn,
                  'mantine-datatable-selection-column-visible': selectionColumnVisible,
                  'mantine-datatable-pin-first-column': pinFirstColumn,
                  'mantine-datatable-resizable-columns': hasResizableColumns,
                },
                classNames?.table
              )}
              style={{
                ...styles?.table,
              }}
              data-striped={(recordsLength && striped) || undefined}
              data-highlight-on-hover={highlightOnHover || undefined}
              {...otherProps}
            >
              {noHeader ? null : (
                <DataTableColumnsProvider {...dragToggle}>
                  <DataTableHeader<T>
                    ref={refs.header}
                    selectionColumnHeaderRef={refs.selectionColumnHeader}
                    className={classNames?.header}
                    style={styles?.header}
                    columns={effectiveColumns}
                    defaultColumnProps={defaultColumnProps}
                    groups={groups}
                    sortStatus={sortStatus}
                    sortIcons={sortIcons}
                    onSortStatusChange={onSortStatusChange}
                    selectionTrigger={selectionTrigger}
                    selectionVisible={selectionColumnVisible}
                    selectionChecked={allSelectableRecordsSelected}
                    selectionIndeterminate={someRecordsSelected && !allSelectableRecordsSelected}
                    onSelectionChange={handleHeaderSelectionChange}
                    selectionCheckboxProps={{ ...selectionCheckboxProps, ...allRecordsSelectionCheckboxProps }}
                    selectorCellShadowVisible={selectorCellShadowVisible}
                    selectionColumnClassName={selectionColumnClassName}
                    selectionColumnStyle={selectionColumnStyle}
                  />
                </DataTableColumnsProvider>
              )}
              <tbody ref={bodyRef}>
                {recordsLength ? (
                  records.map((record, index) => {
                    const recordId = getRecordId(record, idAccessor);
                    const isSelected = selectedRecordIds?.includes(recordId) || false;

                    let handleSelectionChange: React.MouseEventHandler | undefined;

                    if (onSelectedRecordsChange && selectedRecords) {
                      handleSelectionChange = (e) => {
                        if (e.nativeEvent.shiftKey && lastSelectionChangeIndex !== null) {
                          const targetRecords = records.filter(
                            index > lastSelectionChangeIndex
                              ? (rec, idx) =>
                                  idx >= lastSelectionChangeIndex &&
                                  idx <= index &&
                                  (isRecordSelectable ? isRecordSelectable(rec, idx) : true)
                              : (rec, idx) =>
                                  idx >= index &&
                                  idx <= lastSelectionChangeIndex &&
                                  (isRecordSelectable ? isRecordSelectable(rec, idx) : true)
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

                    return (
                      <DataTableRow<T>
                        key={recordId as React.Key}
                        record={record}
                        index={index}
                        columns={effectiveColumns}
                        defaultColumnProps={defaultColumnProps}
                        defaultColumnRender={defaultColumnRender}
                        selectionTrigger={selectionTrigger}
                        selectionVisible={selectionColumnVisible}
                        selectionChecked={isSelected}
                        onSelectionChange={handleSelectionChange}
                        isRecordSelectable={isRecordSelectable}
                        selectionCheckboxProps={selectionCheckboxProps}
                        getSelectionCheckboxProps={getRecordSelectionCheckboxProps}
                        onClick={onRowClick}
                        onDoubleClick={onRowDoubleClick}
                        onCellClick={onCellClick}
                        onCellDoubleClick={onCellDoubleClick}
                        onContextMenu={onRowContextMenu}
                        onCellContextMenu={onCellContextMenu}
                        expansion={rowExpansionInfo}
                        color={rowColor}
                        backgroundColor={rowBackgroundColor}
                        className={rowClassName}
                        style={rowStyle}
                        customAttributes={customRowAttributes}
                        selectorCellShadowVisible={selectorCellShadowVisible}
                        selectionColumnClassName={selectionColumnClassName}
                        selectionColumnStyle={selectionColumnStyle}
                        idAccessor={idAccessor as string}
                        rowFactory={rowFactory}
                      />
                    );
                  })
                ) : (
                  <DataTableEmptyRow />
                )}
              </tbody>

              {effectiveColumns.some(({ footer }) => footer) && (
                <DataTableFooter<T>
                  ref={refs.footer}
                  className={classNames?.footer}
                  style={styles?.footer}
                  columns={effectiveColumns}
                  defaultColumnProps={defaultColumnProps}
                  selectionVisible={selectionColumnVisible}
                  selectorCellShadowVisible={selectorCellShadowVisible}
                />
              )}
            </Table>
          </TableWrapper>
        </DataTableScrollArea>

        {page && (
          <DataTablePagination
            className={classNames?.pagination}
            style={styles?.pagination}
            horizontalSpacing={horizontalSpacing}
            fetching={fetching}
            page={page}
            onPageChange={handlePageChange}
            totalRecords={totalRecords}
            recordsPerPage={recordsPerPage}
            onRecordsPerPageChange={onRecordsPerPageChange}
            recordsPerPageOptions={recordsPerPageOptions}
            recordsPerPageLabel={recordsPerPageLabel}
            paginationWithEdges={paginationWithEdges}
            paginationWithControls={paginationWithControls}
            paginationActiveTextColor={paginationActiveTextColor}
            paginationActiveBackgroundColor={paginationActiveBackgroundColor}
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
          fetching={fetching}
          backgroundBlur={loaderBackgroundBlur}
          customContent={customLoader}
          size={loaderSize}
          type={loaderType}
          color={loaderColor}
        />
        <DataTableEmptyState icon={noRecordsIcon} text={noRecordsText} active={!fetching && !recordsLength}>
          {emptyState}
        </DataTableEmptyState>
      </Box>
    </DataTableColumnsProvider>
  );
}
