import {
  Checkbox,
  type CheckboxProps,
  Group,
  type MantineStyleProp,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Stack,
  TableThead,
  TableTr,
  useMantineTheme,
} from '@mantine/core';
import clsx from 'clsx';
import { type JSX, useMemo, useState } from 'react';
import { DataTableColumnGroupHeaderCell } from './DataTableColumnGroupHeaderCell';
import { useDataTableColumnsContext } from './DataTableColumns.context';
import { DataTableHeaderCell } from './DataTableHeaderCell';
import { DataTableHeaderSelectorCell } from './DataTableHeaderSelectorCell';
import { type DataTableColumnToggle, type PinnedColumnInfo, useMediaQueries } from './hooks';
import type { DataTableColumn, DataTableColumnGroup, DataTableSelectionTrigger, DataTableSortProps } from './types';
import { getMaxGroupDepth, humanize } from './utils';

type DataTableHeaderProps<T> = {
  selectionColumnHeaderRef: React.ForwardedRef<HTMLTableCellElement>;
  className: string | undefined;
  style?: MantineStyleProp;
  sortStatus: DataTableSortProps<T>['sortStatus'];
  sortIcons: DataTableSortProps<T>['sortIcons'];
  onSortStatusChange: DataTableSortProps<T>['onSortStatusChange'];
  columns: DataTableColumn<T>[];
  defaultColumnProps: Omit<DataTableColumn<T>, 'accessor'> | undefined;
  groups: readonly DataTableColumnGroup<T>[] | undefined;
  pinnedMap: Map<string, PinnedColumnInfo>;
  selectionTrigger: DataTableSelectionTrigger;
  selectionVisible: boolean;
  selectionChecked: boolean;
  selectionIndeterminate: boolean;
  onSelectionChange: (() => void) | undefined;
  selectionCheckboxProps: CheckboxProps;
  selectorCellShadowVisible: boolean;
  selectionColumnClassName: string | undefined;
  selectionColumnStyle: MantineStyleProp;
  withColumnBorders?: boolean;
  ref: React.Ref<HTMLTableSectionElement>;
};

type ColumnGroupHeaderSegment<T> = {
  group: DataTableColumnGroup<T>;
  colSpan: number;
  rowSpan: number;
  pinnedInfo: PinnedColumnInfo | undefined;
  needsBorder: boolean;
  key: string;
};

/**
 * Maps each leaf column accessor to the chain of groups containing it, from the outermost to the innermost one.
 */
function getColumnGroupChains<T>(
  groups: readonly DataTableColumnGroup<T>[],
  parents: DataTableColumnGroup<T>[] = [],
  chains = new Map<string, DataTableColumnGroup<T>[]>()
) {
  for (const group of groups) {
    const chain = [...parents, group];
    if (group.columns && group.columns.length > 0) {
      for (const column of group.columns) {
        if (column != null) chains.set(String(column.accessor), chain);
      }
    } else if (group.groups && group.groups.length > 0) {
      getColumnGroupChains(group.groups, chain, chains);
    }
  }
  return chains;
}

/**
 * A group header cell is pinned when all of the columns it spans are pinned to the same side.
 */
function getSegmentPinnedInfo(
  accessors: string[],
  pinnedMap: Map<string, PinnedColumnInfo>
): PinnedColumnInfo | undefined {
  const pinnedInfos = accessors.map((accessor) => pinnedMap.get(accessor));
  if (pinnedInfos.some((info) => !info)) return undefined;

  const logicalSides = new Set(pinnedInfos.map((info) => info!.logicalSide));
  if (logicalSides.size > 1) return undefined;

  const isLeft = pinnedInfos[0]!.logicalSide === 'left';
  const info = pinnedMap.get(isLeft ? accessors[0] : accessors[accessors.length - 1]);
  if (!info) return undefined;

  const boundaryInfo = pinnedMap.get(isLeft ? accessors[accessors.length - 1] : accessors[0]);
  return { ...info, isBoundary: boundaryInfo?.isBoundary ?? false };
}

/**
 * Computes the group header rows from the columns as they are actually rendered, so that group headers
 * stay in sync with column reordering, toggling and pinning.
 * Adjacent columns belonging to the same group at a given depth are merged into a single header cell;
 * if a group's columns are not adjacent (e.g. one of them is pinned to the other side), the group header
 * is split into multiple cells.
 */
function getColumnGroupHeaderRows<T>({
  groups,
  maxDepth,
  visibleAccessors,
  pinnedMap,
  withColumnBorders,
}: {
  groups: readonly DataTableColumnGroup<T>[];
  maxDepth: number;
  visibleAccessors: string[];
  pinnedMap: Map<string, PinnedColumnInfo>;
  withColumnBorders: boolean;
}): ColumnGroupHeaderSegment<T>[][] {
  const chains = getColumnGroupChains(groups);
  const visibleCount = visibleAccessors.length;

  return Array.from({ length: maxDepth }, (_, depth) => {
    const segments: (Omit<ColumnGroupHeaderSegment<T>, 'pinnedInfo' | 'needsBorder' | 'key'> & {
      start: number;
      accessors: string[];
    })[] = [];

    visibleAccessors.forEach((accessor, index) => {
      const chain = chains.get(accessor);
      const group = chain?.[depth];
      if (!chain || !group) return;
      const last = segments[segments.length - 1];
      if (last && last.group === group && last.start + last.colSpan === index) {
        last.colSpan += 1;
        last.accessors.push(accessor);
      } else {
        // The innermost group of a column spans the remaining group header rows
        const rowSpan = depth === chain.length - 1 ? maxDepth - depth : 1;
        segments.push({ group, colSpan: 1, rowSpan, start: index, accessors: [accessor] });
      }
    });

    return segments.map(({ group, colSpan, rowSpan, start, accessors }) => ({
      group,
      colSpan,
      rowSpan,
      pinnedInfo: getSegmentPinnedInfo(accessors, pinnedMap),
      needsBorder: withColumnBorders && start + colSpan < visibleCount,
      key: `${group.id}-${start}`,
    }));
  });
}

export function DataTableHeader<T>({
  selectionColumnHeaderRef,
  className,
  style,
  sortStatus,
  sortIcons,
  onSortStatusChange,
  columns,
  defaultColumnProps,
  groups,
  pinnedMap,
  selectionTrigger,
  selectionVisible,
  selectionChecked,
  selectionIndeterminate,
  onSelectionChange,
  selectionCheckboxProps,
  selectorCellShadowVisible,
  selectionColumnClassName,
  selectionColumnStyle,
  withColumnBorders = false,
  ref,
}: DataTableHeaderProps<T>): JSX.Element {
  const maxGroupDepth = groups ? getMaxGroupDepth(groups) : 0;
  const totalHeaderRows = maxGroupDepth > 0 ? maxGroupDepth + 1 : 1;

  // Resolve the columns' media queries to strings, so that the list only changes when the queries do
  const theme = useMantineTheme();
  const resolvedQueries = columns.map(({ visibleMediaQuery }) =>
    typeof visibleMediaQuery === 'function' ? visibleMediaQuery(theme) : (visibleMediaQuery ?? '')
  );
  const queriesKey = resolvedQueries.join('\n');
  // biome-ignore lint/correctness/useExhaustiveDependencies: the queries are memoized by their content
  const mediaQueries = useMemo(() => resolvedQueries, [queriesKey]);
  const mediaQueriesDefaults = useMemo(() => mediaQueries.map(() => true), [mediaQueries]);
  const columnsVisibility = useMediaQueries(mediaQueries, mediaQueriesDefaults);

  const groupHeaderRows = groups
    ? getColumnGroupHeaderRows({
        groups,
        maxDepth: maxGroupDepth,
        visibleAccessors: columns
          .filter((column, index) => !column.hidden && columnsVisibility?.[index] !== false)
          .map(({ accessor }) => String(accessor)),
        pinnedMap,
        withColumnBorders,
      })
    : [];

  const allRecordsSelectorCell = selectionVisible ? (
    <DataTableHeaderSelectorCell
      ref={selectionColumnHeaderRef}
      className={selectionColumnClassName}
      style={selectionColumnStyle}
      trigger={selectionTrigger}
      shadowVisible={selectorCellShadowVisible}
      checked={selectionChecked}
      indeterminate={selectionIndeterminate}
      checkboxProps={selectionCheckboxProps}
      onChange={onSelectionChange}
      rowSpan={groups ? totalHeaderRows : undefined}
    />
  ) : null;

  const { columnsToggle, setColumnsToggle } = useDataTableColumnsContext();
  const [columnsPopoverOpened, setColumnsPopoverOpened] = useState<boolean>(false);
  const someColumnsToggleable = columns.some((column) => column.toggleable);

  const columnToggleCheckboxLabels = someColumnsToggleable
    ? Object.fromEntries(columns.map(({ accessor, title }) => [accessor, title ?? humanize(String(accessor))]))
    : undefined;

  const content = (
    <TableThead
      className={clsx('mantine-datatable-header', className)}
      style={style}
      ref={ref}
      onContextMenu={
        someColumnsToggleable
          ? (e) => {
              e.preventDefault();
              setColumnsPopoverOpened((columnsPopoverOpened) => !columnsPopoverOpened);
            }
          : undefined
      }
    >
      {groupHeaderRows.map((segments, depthIndex) => (
        <TableTr key={`group-depth-${depthIndex}`}>
          {depthIndex === 0 && allRecordsSelectorCell}
          {segments.map(({ key, group, colSpan, rowSpan, pinnedInfo, needsBorder }) => (
            <DataTableColumnGroupHeaderCell
              key={key}
              group={group}
              colSpan={colSpan}
              rowSpan={rowSpan}
              pinnedInfo={pinnedInfo}
              needsBorder={needsBorder}
            />
          ))}
        </TableTr>
      ))}

      <TableTr>
        {!groups && allRecordsSelectorCell}

        {columns.map(({ hidden, ...columnProps }, index) => {
          if (hidden) return null;

          const {
            accessor,
            visibleMediaQuery,
            textAlign,
            width,
            title,
            sortable,
            draggable,
            toggleable,
            pinnable,
            resizable,
            titleClassName,
            titleStyle,
            filter,
            filterPopoverProps,
            filterPopoverDisableClickOutside,
            filtering,
            sortKey,
          } = { ...defaultColumnProps, ...columnProps };

          return (
            <DataTableHeaderCell<T>
              key={accessor as React.Key}
              accessor={accessor}
              pinnedInfo={pinnedMap.get(String(accessor))}
              className={titleClassName}
              style={titleStyle}
              visibleMediaQuery={visibleMediaQuery}
              textAlign={textAlign}
              width={width}
              title={title}
              sortable={sortable}
              draggable={draggable}
              toggleable={toggleable}
              pinnable={pinnable}
              // we won't display the resize handle for the last column to avoid overflow render issues
              resizable={resizable && index < columns.length - 1}
              sortStatus={sortStatus}
              sortIcons={sortIcons}
              sortKey={sortKey}
              onSortStatusChange={onSortStatusChange}
              filter={filter}
              filterPopoverProps={filterPopoverProps}
              filterPopoverDisableClickOutside={filterPopoverDisableClickOutside}
              filtering={filtering}
            />
          );
        })}
      </TableTr>
    </TableThead>
  );

  return someColumnsToggleable ? (
    <Popover position="bottom" withArrow shadow="md" opened={columnsPopoverOpened} onChange={setColumnsPopoverOpened}>
      <PopoverTarget>{content}</PopoverTarget>
      <PopoverDropdown>
        <Stack>
          {columnsToggle
            .filter((column) => column.toggleable)
            .map((column: DataTableColumnToggle) => {
              return (
                <Group key={column.accessor}>
                  <Checkbox
                    classNames={{ label: 'mantine-datatable-header-column-toggle-checkbox-label' }}
                    size="xs"
                    label={columnToggleCheckboxLabels![column.accessor]}
                    checked={column.toggled}
                    onChange={(e) => {
                      setColumnsToggle(
                        columnsToggle.map((c: DataTableColumnToggle) => {
                          if (c.accessor === column.accessor) {
                            return { ...c, toggled: e.currentTarget.checked };
                          }
                          return c;
                        })
                      );
                    }}
                  />
                </Group>
              );
            })}
        </Stack>
      </PopoverDropdown>
    </Popover>
  ) : (
    content
  );
}
