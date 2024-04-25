import { useState } from 'react';
import { DataTableRowExpansionProps } from '../types/DataTableRowExpansionProps';
import { getRecordId } from '../utils';

export function useRowExpansion<T>({
  rowExpansion,
  records,
  idAccessor,
}: {
  rowExpansion?: DataTableRowExpansionProps<T>;
  records: T[] | undefined;
  idAccessor: (keyof T | (string & NonNullable<unknown>)) | ((record: T) => React.Key);
}) {
  let initiallyExpandedRecordIds: unknown[] = [];
  if (rowExpansion && records) {
    const { trigger, allowMultiple, initiallyExpanded } = rowExpansion;
    if (records && trigger === 'always') {
      initiallyExpandedRecordIds = records.map((r) => getRecordId(r, idAccessor));
    } else if (initiallyExpanded) {
      initiallyExpandedRecordIds = records
        .filter((record, index) => initiallyExpanded({ record, index }))
        .map((r) => getRecordId(r, idAccessor));
      if (!allowMultiple) {
        initiallyExpandedRecordIds = [initiallyExpandedRecordIds[0]];
      }
    }
  }

  let expandedRecordIds: unknown[];
  let setExpandedRecordIds: ((expandedRecordIds: unknown[]) => void) | undefined;
  const expandedRecordIdsState = useState<unknown[]>(initiallyExpandedRecordIds);

  if (rowExpansion) {
    const { expandable, trigger, allowMultiple, collapseProps, content } = rowExpansion;
    if (rowExpansion.expanded) {
      ({ recordIds: expandedRecordIds, onRecordIdsChange: setExpandedRecordIds } = rowExpansion.expanded);
    } else {
      [expandedRecordIds, setExpandedRecordIds] = expandedRecordIdsState;
    }

    const collapseRow = (record: T) =>
      setExpandedRecordIds?.(expandedRecordIds.filter((id) => id !== getRecordId(record, idAccessor)));

    return {
      expandOnClick: trigger !== 'always' && trigger !== 'never',
      isRowExpanded: (record: T) =>
        trigger === 'always' ? true : expandedRecordIds.includes(getRecordId(record, idAccessor)),
      isExpandable: ({ record, index }: { record: T; index: number }) => {
        if (!expandable) {
          return true;
        }
        return expandable({ record, index });
      },
      expandRow: (record: T) => {
        const recordId = getRecordId(record, idAccessor);
        setExpandedRecordIds?.(allowMultiple ? [...expandedRecordIds, recordId] : [recordId]);
      },
      collapseRow,
      collapseProps,
      content:
        ({ record, index }: { record: T; index: number }) =>
        () =>
          content({ record, index, collapse: () => collapseRow(record) }),
    };
  }
}
