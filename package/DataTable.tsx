import { Box, createStyles, MantineSize, Table } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { differenceBy, get, lowerCase, throttle, uniqBy, upperFirst } from 'lodash';
import { Key, useEffect, useState } from 'react';
import { DataTableProps } from './DataTable.props';
import DataTableEmptyRow from './DataTableEmptyRow';
import DataTableFooter from './DataTableFooter';
import DataTableHeader from './DataTableHeader';
import DataTableLoader from './DataTableLoader';
import DataTableNoRecords from './DataTableNoRecords';
import DataTableRow from './DataTableRow';
import DataTableRowMenu from './DataTableRowMenu';
import DataTableRowMenuDivider from './DataTableRowMenuDivider';
import DataTableRowMenuItem from './DataTableRowMenuItem';
import DataTableScrollArea from './DataTableScrollArea';

const useStyles = createStyles((theme) => {
  const border = `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`;
  return {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      tr: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      },
    },
    browserSelectionDisabled: {
      userSelect: 'none',
    },
    tableWithBorder: {
      border,
    },
    tableWithColumnBorders: {
      'th, td': {
        ':not(:first-of-type)': {
          borderLeft: border,
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
});

export default function DataTable<T extends Record<string, unknown>>({
  withBorder,
  borderRadius,
  withColumnBorders,
  height = '100%',
  minHeight,
  shadow,
  verticalAlignment = 'center',
  fetching,
  columns,
  idAccessor = 'id',
  records,
  selectedRecords,
  onSelectedRecordsChange,
  sortStatus,
  onSortStatusChange,
  horizontalSpacing,
  page,
  onPageChange,
  totalRecords,
  recordsPerPage,
  paginationSize = 'sm',
  loaderSize,
  loaderVariant,
  loaderBackgroundBlur,
  noRecordsText = 'No records',
  striped,
  onRowClick,
  rowContextMenu,
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

  const [rowContextMenuInfo, setRowContextMenuInfo] = useState<{ top: number; left: number; record: T } | null>(null);
  useEffect(() => {
    if (fetching) setRowContextMenuInfo(null);
  }, [fetching]);

  const onScrollPositionChange = () => {
    if (!fetching) setRowContextMenuInfo(null);

    if (fetching || tableHeight <= scrollViewportHeight) {
      setScrolledToTop(true);
      setScrolledToBottom(true);
    } else {
      const scrollTop = scrollViewportRef.current.scrollTop;
      setScrolledToTop(scrollTop === 0);
      setScrolledToBottom(Math.round(tableHeight - scrollTop) === Math.round(scrollViewportHeight));
    }

    if (fetching || tableWidth === scrollViewportWidth) {
      setScrolledToLeft(true);
      setScrolledToRight(true);
    } else {
      const scrollLeft = scrollViewportRef.current.scrollLeft;
      setScrolledToLeft(scrollLeft === 0);
      setScrolledToRight(Math.round(tableWidth - scrollLeft) === Math.round(scrollViewportWidth));
    }
  };

  useEffect(onScrollPositionChange, [
    fetching,
    scrollViewportHeight,
    scrollViewportRef,
    scrollViewportWidth,
    tableHeight,
    tableWidth,
  ]);

  const onScrollPositionChangeThrottled = throttle(onScrollPositionChange, 200, { leading: true, trailing: true });

  const handlePageChange = (page: number) => {
    scrollViewportRef.current.scrollTo({ top: 0, left: 0 });
    onPageChange!(page);
  };

  const recordsLength = records?.length;
  const recordIds = records?.map((record) => get(record, idAccessor));
  const selectedRecordIds = selectedRecords?.map((record) => get(record, idAccessor));
  const hasRecordsAndSelectedRecords =
    recordIds !== undefined && selectedRecordIds !== undefined && selectedRecordIds.length > 0;
  const allRecordsSelected = hasRecordsAndSelectedRecords && recordIds.every((id) => selectedRecordIds.includes(id));
  const someRecordsSelected = hasRecordsAndSelectedRecords && recordIds.some((id) => selectedRecordIds.includes(id));

  const [lastSelectionChangeIndex, setLastSelectionChangeIndex] = useState<number | null>(null);

  const recordIdsString = recordIds?.join(':') || '';
  useEffect(() => {
    setLastSelectionChangeIndex(null);
  }, [recordIdsString]);

  const selectionVisibleAndNotScrolledToLeft = !!selectedRecords && !scrolledToLeft;

  const { cx, classes } = useStyles();

  return (
    <Box
      className={cx(classes.root, { [classes.tableWithBorder]: withBorder })}
      sx={(theme) => ({
        borderRadius: theme.radius[borderRadius as MantineSize] || borderRadius,
        boxShadow: theme.shadows[shadow as MantineSize] || shadow,
        height,
        minHeight,
      })}
    >
      <DataTableScrollArea
        ref={scrollViewportRef}
        leftShadowVisible={!(selectedRecords || scrolledToLeft)}
        rightShadowVisible={!scrolledToRight}
        bottomShadowVisible={!scrolledToBottom}
        headerHeight={headerHeight}
        onScrollPositionChange={onScrollPositionChangeThrottled}
      >
        <Table
          ref={tableRef}
          horizontalSpacing={horizontalSpacing}
          className={cx({
            [classes.browserSelectionDisabled]: onRowClick || selectedRecords,
            [classes.tableWithColumnBorders]: withColumnBorders,
            [classes.verticalAlignmentTop]: verticalAlignment === 'top',
            [classes.verticalAlignmentBottom]: verticalAlignment === 'bottom',
          })}
          striped={recordsLength ? striped : false}
          {...otherProps}
        >
          <DataTableHeader<T>
            ref={headerRef}
            columns={columns}
            sortStatus={sortStatus}
            onSortStatusChange={onSortStatusChange}
            selectionVisible={!!selectedRecords}
            selectionChecked={allRecordsSelected}
            selectionIndeterminate={someRecordsSelected && !allRecordsSelected}
            onSelectionChange={
              onSelectedRecordsChange
                ? () => {
                    onSelectedRecordsChange(
                      allRecordsSelected
                        ? selectedRecords.filter((record) => !recordIds.includes(get(record, idAccessor)))
                        : uniqBy([...selectedRecords, ...records!], (record) => get(record, idAccessor))
                    );
                  }
                : undefined
            }
            leftShadowVisible={selectionVisibleAndNotScrolledToLeft}
            bottomShadowVisible={!scrolledToTop}
          />
          <tbody>
            {recordsLength ? (
              records.map((record, recordIndex) => {
                const recordId = get(record, idAccessor);
                const selected = selectedRecordIds?.includes(recordId) || false;

                let showContextMenuOnClick = false;
                let showContextMenuOnRightClick = false;
                if (rowContextMenu) {
                  const { hidden } = rowContextMenu;
                  if (!hidden || !(typeof hidden === 'function' ? hidden(record) : hidden)) {
                    if (rowContextMenu.trigger === 'click') {
                      showContextMenuOnClick = true;
                    } else {
                      showContextMenuOnRightClick = true;
                    }
                  }
                }

                return (
                  <DataTableRow<T>
                    key={recordId as Key}
                    record={record}
                    columns={columns}
                    selectionVisible={!!selectedRecords}
                    selectionChecked={selected}
                    onSelectionChange={
                      onSelectedRecordsChange
                        ? (e) => {
                            if ((e.nativeEvent as PointerEvent).shiftKey && lastSelectionChangeIndex !== null) {
                              const recordsInterval = records.filter(
                                recordIndex > lastSelectionChangeIndex
                                  ? (_, index) => index >= lastSelectionChangeIndex && index <= recordIndex
                                  : (_, index) => index >= recordIndex && index <= lastSelectionChangeIndex
                              );
                              onSelectedRecordsChange(
                                selected
                                  ? differenceBy(selectedRecords, recordsInterval, (r) => get(r, idAccessor))
                                  : uniqBy([...selectedRecords, ...recordsInterval], (r) => get(r, idAccessor))
                              );
                            } else {
                              onSelectedRecordsChange(
                                selected
                                  ? selectedRecords.filter((record) => get(record, idAccessor) !== recordId)
                                  : uniqBy([...selectedRecords, record], (record) => get(record, idAccessor))
                              );
                            }
                            setLastSelectionChangeIndex(recordIndex);
                          }
                        : undefined
                    }
                    onClick={
                      showContextMenuOnClick
                        ? (e) => {
                            setRowContextMenuInfo({ top: e.clientY, left: e.clientX, record });
                            onRowClick?.(record);
                          }
                        : onRowClick
                        ? () => {
                            onRowClick(record);
                          }
                        : undefined
                    }
                    onContextMenu={
                      showContextMenuOnRightClick
                        ? (e) => {
                            e.preventDefault();
                            setRowContextMenuInfo({ top: e.clientY, left: e.clientX, record });
                          }
                        : undefined
                    }
                    contextMenuVisible={
                      rowContextMenuInfo ? get(rowContextMenuInfo.record, idAccessor) === recordId : false
                    }
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
        <DataTableFooter
          ref={footerRef}
          horizontalSpacing={horizontalSpacing}
          fetching={fetching}
          page={page}
          onPageChange={handlePageChange}
          totalRecords={totalRecords}
          recordsPerPage={recordsPerPage}
          paginationSize={paginationSize}
          recordsLength={recordsLength}
        />
      )}
      <DataTableLoader
        pt={headerHeight}
        pb={footerHeight}
        fetching={fetching}
        loaderBackgroundBlur={loaderBackgroundBlur}
        loaderSize={loaderSize}
        loaderVariant={loaderVariant}
      />
      <DataTableNoRecords
        pt={headerHeight}
        pb={footerHeight}
        text={noRecordsText}
        active={!fetching && !recordsLength}
      />
      {rowContextMenu && rowContextMenuInfo && (
        <DataTableRowMenu
          zIndex={rowContextMenu.zIndex}
          borderRadius={rowContextMenu.borderRadius}
          shadow={rowContextMenu.shadow}
          top={rowContextMenuInfo.top}
          left={rowContextMenuInfo.left}
          onDestroy={() => setRowContextMenuInfo(null)}
        >
          {rowContextMenu
            .items(rowContextMenuInfo.record)
            .map(({ divider, key, title, icon, color, hidden, disabled, onClick }) =>
              divider ? (
                <DataTableRowMenuDivider key={key} />
              ) : hidden ? null : (
                <DataTableRowMenuItem
                  key={key}
                  title={title ?? upperFirst(lowerCase(key))}
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
