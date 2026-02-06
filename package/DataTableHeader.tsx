import {
  Checkbox,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Stack,
  TableThead,
  TableTr,
  type CheckboxProps,
  type MantineStyleProp,
} from '@mantine/core';
import clsx from 'clsx';
import { useState } from 'react';
import { DataTableColumnGroupHeaderCell } from './DataTableColumnGroupHeaderCell';
import { useDataTableColumnsContext } from './DataTableColumns.context';
import { DataTableHeaderCell } from './DataTableHeaderCell';
import { DataTableHeaderSelectorCell } from './DataTableHeaderSelectorCell';
import type { DataTableColumnToggle, PinnedColumnInfo } from './hooks';
import type { DataTableColumn, DataTableColumnGroup, DataTableSelectionTrigger, DataTableSortProps } from './types';
import { getGroupsAtDepth, getMaxGroupDepth, humanize } from './utils';

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

function getGroupPinnedInfo<T>(
  group: DataTableColumnGroup<T>,
  pinnedMap: Map<string, PinnedColumnInfo>
): PinnedColumnInfo | undefined {
  const leafColumns = group.columns ?? [];
  const leafAccessors = leafColumns.filter((c) => !c.hidden).map((c) => String(c.accessor));

  const pinnedInfos = leafAccessors.map((acc) => pinnedMap.get(acc)).filter(Boolean) as PinnedColumnInfo[];

  if (pinnedInfos.length === 0 || pinnedInfos.length !== leafAccessors.length) return undefined;

  const logicalSides = new Set(pinnedInfos.map((p) => p.logicalSide));
  if (logicalSides.size > 1) return undefined;

  const logicalSide = [...logicalSides][0];
  const targetAcc = logicalSide === 'left' ? leafAccessors[0] : leafAccessors[leafAccessors.length - 1];
  const info = pinnedMap.get(targetAcc);
  if (!info) return undefined;

  const boundaryAcc = logicalSide === 'left' ? leafAccessors[leafAccessors.length - 1] : leafAccessors[0];
  const boundaryInfo = pinnedMap.get(boundaryAcc);
  return { ...info, isBoundary: boundaryInfo?.isBoundary ?? false };
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
}: DataTableHeaderProps<T>) {
  const maxGroupDepth = groups ? getMaxGroupDepth(groups) : 0;
  const totalHeaderRows = maxGroupDepth > 0 ? maxGroupDepth + 1 : 1;

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
      {groups &&
        Array.from({ length: maxGroupDepth }, (_, depthIndex) => {
          const groupsAtDepth = getGroupsAtDepth(groups, depthIndex);

          return (
            <TableTr key={`group-depth-${depthIndex}`}>
              {depthIndex === 0 && allRecordsSelectorCell}
              {groupsAtDepth.map((group, index) => {
                return (
                  <DataTableColumnGroupHeaderCell
                    key={group.id}
                    group={group}
                    pinnedInfo={getGroupPinnedInfo(group, pinnedMap)}
                    maxDepth={maxGroupDepth}
                    currentDepth={depthIndex}
                    previousGroups={groupsAtDepth.slice(0, index)}
                    isLastGroup={index === groupsAtDepth.length - 1}
                    withColumnBorders={withColumnBorders}
                    totalTableColumns={columns.length}
                  />
                );
              })}
            </TableTr>
          );
        })}

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
