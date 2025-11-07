import type { DropResult } from '@hello-pangea/dnd';
import type { DataTableColumn, DataTableColumnGroup } from './types';


/**
 * Utility function that returns a humanized version of a string, e.g. "camelCase" -> "Camel Case"
 */
export function humanize(value: string) {
  const str = value
    .replace(/([a-z\d])([A-Z]+)/g, '$1 $2')
    .replace(/\W|_/g, ' ')
    .trim()
    .toLowerCase();
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

/**
 * Utility function that returns an array of values that are present in the first array but not in the second
 */
export function differenceBy<T>(arr1: T[], arr2: T[], iteratee: (value: T) => unknown) {
  return arr1.filter((c) => !arr2.map(iteratee).includes(iteratee(c)));
}

/**
 * Utility function that returns an array of unique values from a given array
 */
export function uniqBy<T>(arr: T[], iteratee: (value: T) => unknown) {
  return arr.filter((x, i, self) => i === self.findIndex((y) => iteratee(x) === iteratee(y)));
}

/**
 * Utility function that returns the value at a given path in an object
 */
export function getValueAtPath<T>(obj: T, path: keyof T | (string & NonNullable<unknown>)) {
  if (!path) return undefined;
  const pathArray = (path as string).match(/([^[.\]])+/g) as string[];
  return pathArray.reduce((prevObj: unknown, key) => prevObj && (prevObj as Record<string, unknown>)[key], obj);
}

/**
 * Utility function that returns the record id using idAccessor
 */
export function getRecordId<T>(
  record: T,
  idAccessor: keyof T | (string & NonNullable<unknown>) | ((record: T) => React.Key)
) {
  return typeof idAccessor === 'string'
    ? getValueAtPath(record, idAccessor)
    : (idAccessor as (record: T) => React.Key)(record);
}

/**
 * Utility function that reorders an array of records by a given field used for drag'n'drop functionality.
 * @see https://github.com/hello-pangea/dnd
 */
export function reorderRecords<T>(dropResult: DropResult, records: T[]): T[] {
  const draft = structuredClone(records);
  const prev = draft[dropResult.source.index];

  if (dropResult.destination) {
    draft.splice(dropResult.source.index, 1);
    draft.splice(dropResult.destination.index, 0, prev);
  }

  return draft;
}

/**
 * Utility function that swaps elements of an array, by a given result from drag'n'drop functionality.
 * @see https://github.com/hello-pangea/dnd
 */
export function swapRecords<T>(dropResult: DropResult, records: T[]): T[] {
  const draft = structuredClone(records);

  const destination = dropResult.destination;

  if (!destination) return draft;

  const sourceEl = draft[dropResult.source.index];
  const destEl = draft[destination.index];

  draft.splice(destination.index, 1, sourceEl);
  draft.splice(dropResult.source.index, 1, destEl);

  return draft;
}

/**
 * Calculates the maximum depth of nested column groups
 */
export function getMaxGroupDepth<T>(groups: readonly DataTableColumnGroup<T>[]): number {
  if (!groups || groups.length === 0) return 0;

  return Math.max(
    ...groups.map((group) => {
      if (group.groups && group.groups.length > 0) {
        return 1 + getMaxGroupDepth(group.groups);
      }
      return 1;
    })
  );
}

/**
 * Flattens nested column groups to extract all columns at the deepest level
 */
export function flattenColumns<T>(groups: DataTableColumnGroup<T>[]): DataTableColumn<T>[] {
  const columns: DataTableColumn<T>[] = [];

  for (const group of groups) {
    if (group.columns && group.columns.length > 0) {
      columns.push(...group.columns.filter((col) => col != null));
    } else if (group.groups && group.groups.length > 0) {
      columns.push(...flattenColumns(group.groups));
    }
  }

  return columns.filter((col) => col != null);
}

/**
 * Calculates the column span for a group based on visible columns
 */
export function calculateColSpan<T>(group: DataTableColumnGroup<T>, visibles?: (boolean | undefined)[]): number {
  if (group.columns && group.columns.length > 0) {
    return group.columns.filter((column, index) => {
      if (column.hidden) return false;
      return visibles ? visibles[index] !== false : true;
    }).length;
  }

  if (group.groups && group.groups.length > 0) {
    return group.groups.reduce((sum, subGroup) => {
      return sum + calculateColSpan(subGroup, visibles);
    }, 0);
  }

  return 0;
}


/**
 * Gets all groups at a specific depth level
 */
export function getGroupsAtDepth<T>(
  groups: readonly DataTableColumnGroup<T>[],
  targetDepth: number,
  currentDepth: number = 0
): DataTableColumnGroup<T>[] {
  if (currentDepth === targetDepth) {
    return [...groups];
  }

  const result: DataTableColumnGroup<T>[] = [];
  for (const group of groups) {
    if (group.groups && group.groups.length > 0) {
      result.push(...getGroupsAtDepth(group.groups, targetDepth, currentDepth + 1));
    }
  }

  return result;
}


/**
 * Checks if a group needs a right border based on its position and context
 */
export function needsRightBorder(
  isLastGroup: boolean,
  hasMoreColumnsAfter: boolean,
  withColumnBorders: boolean
): boolean {
  if (!withColumnBorders) return false;
  return !isLastGroup || hasMoreColumnsAfter;
}

