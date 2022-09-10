import { Box, createStyles, MantineSize, MantineTheme, Table } from '@mantine/core';
import { useDebouncedState, useElementSize } from '@mantine/hooks';
import { Key, useEffect, useState } from 'react';
import { DataTableProps } from './DataTable.props';
import DataTableEmptyRow from './DataTableEmptyRow';
import DataTableEmptyState from './DataTableEmptyState';
import DataTableFooter from './DataTableFooter';
import DataTableHeader from './DataTableHeader';
import DataTableLoader from './DataTableLoader';
import DataTableRow from './DataTableRow';
import DataTableRowMenu from './DataTableRowMenu';
import DataTableRowMenuDivider from './DataTableRowMenuDivider';
import DataTableRowMenuItem from './DataTableRowMenuItem';
import DataTableScrollArea from './DataTableScrollArea';
import { differenceBy, getValueAtPath, humanize, uniqBy } from './utils';

const SCROLL_STATE_DEBOUNCE_INTERVAL = 200;
const SCROLL_STATE_DEBOUNCE_OPTIONS = { leading: true };

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
            borderBottomColor: rowBorderColorValue,
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
      tableWithBorder: {
        border: `1px solid ${borderColorValue}`,
      },
      tableWithColumnBorders: {
        'th, td': {
          ':not(:first-of-type)': {
            borderLeft: `1px solid ${rowBorderColorValue}`,
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

export default function DataTable<T extends Record<string, unknown>>({
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
  paginationText = ({ from, to, totalRecords }) => `${from} - ${to} / ${totalRecords}`,
  loaderSize,
  loaderVariant,
  loaderBackgroundBlur,
  emptyState,
  noRecordsText = 'No records',
  noRecordsIcon,
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

  const [scrolledToTop, setScrolledToTop] = useDebouncedState(
    true,
    SCROLL_STATE_DEBOUNCE_INTERVAL,
    SCROLL_STATE_DEBOUNCE_OPTIONS
  );
  const [scrolledToBottom, setScrolledToBottom] = useDebouncedState(
    true,
    SCROLL_STATE_DEBOUNCE_INTERVAL,
    SCROLL_STATE_DEBOUNCE_OPTIONS
  );
  const [scrolledToLeft, setScrolledToLeft] = useDebouncedState(
    true,
    SCROLL_STATE_DEBOUNCE_INTERVAL,
    SCROLL_STATE_DEBOUNCE_OPTIONS
  );
  const [scrolledToRight, setScrolledToRight] = useDebouncedState(
    true,
    SCROLL_STATE_DEBOUNCE_INTERVAL,
    SCROLL_STATE_DEBOUNCE_OPTIONS
  );

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

  /**
   * React hooks linting rule would reccomend to also include the `useDobouncedState` setters
   * (setScrolledToBottom, setScrolledToLeft, setScrolledToRight, setScrolledToTop) in the effect
   * dependecies, but it looks like there's actually no need to.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onScrollPositionChange, [
    fetching,
    scrollViewportHeight,
    scrollViewportRef,
    scrollViewportWidth,
    tableHeight,
    tableWidth,
  ]);

  const handlePageChange = (page: number) => {
    scrollViewportRef.current.scrollTo({ top: 0, left: 0 });
    onPageChange!(page);
  };

  const recordsLength = records?.length;
  const recordIds = records?.map((record) => getValueAtPath(record, idAccessor));
  const selectedRecordIds = selectedRecords?.map((record) => getValueAtPath(record, idAccessor));
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

  const { cx, classes } = useStyles({ borderColor, rowBorderColor });

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
        onScrollPositionChange={onScrollPositionChange}
      >
        <Table
          ref={tableRef}
          horizontalSpacing={horizontalSpacing}
          className={cx({
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
                        ? selectedRecords.filter((record) => !recordIds.includes(getValueAtPath(record, idAccessor)))
                        : uniqBy([...selectedRecords, ...records!], (record) => getValueAtPath(record, idAccessor))
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
                const recordId = getValueAtPath(record, idAccessor);
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
                                  ? differenceBy(selectedRecords, recordsInterval, (r) => getValueAtPath(r, idAccessor))
                                  : uniqBy([...selectedRecords, ...recordsInterval], (r) =>
                                      getValueAtPath(r, idAccessor)
                                    )
                              );
                            } else {
                              onSelectedRecordsChange(
                                selected
                                  ? selectedRecords.filter((record) => getValueAtPath(record, idAccessor) !== recordId)
                                  : uniqBy([...selectedRecords, record], (record) => getValueAtPath(record, idAccessor))
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
                      rowContextMenuInfo ? getValueAtPath(rowContextMenuInfo.record, idAccessor) === recordId : false
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
          topBorderColor={borderColor}
          horizontalSpacing={horizontalSpacing}
          fetching={fetching}
          page={page}
          onPageChange={handlePageChange}
          totalRecords={totalRecords}
          recordsPerPage={recordsPerPage}
          paginationSize={paginationSize}
          paginationText={paginationText}
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
