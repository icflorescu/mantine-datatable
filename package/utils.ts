import type { DropResult } from '@hello-pangea/dnd';

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
