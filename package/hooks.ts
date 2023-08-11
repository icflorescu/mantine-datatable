import { useResizeObserver, useTimeout } from '@mantine/hooks';
import { useEffect, useState, type Key } from 'react';
import type { DataTableRowExpansionProps } from './types';
import { getRecordId } from './utils';

export function useLastSelectionChangeIndex(recordIds: unknown[] | undefined) {
  const [lastSelectionChangeIndex, setLastSelectionChangeIndex] = useState<number | null>(null);
  const recordIdsString = recordIds?.join(':') || '';
  useEffect(() => {
    setLastSelectionChangeIndex(null);
  }, [recordIdsString]);

  return { lastSelectionChangeIndex, setLastSelectionChangeIndex };
}

export function useRowContextMenu<T>(fetching?: boolean) {
  const [rowContextMenuInfo, setRowContextMenuInfo] = useState<{
    y: number;
    x: number;
    record: T;
    recordIndex: number;
  } | null>(null);
  useEffect(() => {
    if (fetching) setRowContextMenuInfo(null);
  }, [fetching]);
  return { rowContextMenuInfo, setRowContextMenuInfo };
}

export function useRowExpansion<T>({
  rowExpansion,
  records,
  idAccessor,
}: {
  rowExpansion?: DataTableRowExpansionProps<T>;
  records: T[] | undefined;
  idAccessor: string | ((record: T) => Key);
}) {
  let initiallyExpandedRecordIds: unknown[] = [];
  if (rowExpansion && records) {
    const { trigger, allowMultiple, initiallyExpanded } = rowExpansion;
    if (records && trigger === 'always') {
      initiallyExpandedRecordIds = records.map((r) => getRecordId(r, idAccessor));
    } else if (initiallyExpanded) {
      initiallyExpandedRecordIds = records.filter(initiallyExpanded).map((r) => getRecordId(r, idAccessor));
      if (!allowMultiple) {
        initiallyExpandedRecordIds = [initiallyExpandedRecordIds[0]];
      }
    }
  }

  let expandedRecordIds: unknown[];
  let setExpandedRecordIds: ((expandedRecordIds: unknown[]) => void) | undefined;
  const expandedRecordIdsState = useState<unknown[]>(initiallyExpandedRecordIds);

  if (rowExpansion) {
    const { trigger, allowMultiple, collapseProps, content } = rowExpansion;
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
      expandRow: (record: T) => {
        const recordId = getRecordId(record, idAccessor);
        setExpandedRecordIds?.(allowMultiple ? [...expandedRecordIds, recordId] : [recordId]);
      },
      collapseRow,
      collapseProps,
      content: (record: T, recordIndex: number) => () =>
        content({ record, recordIndex, collapse: () => collapseRow(record) }),
    };
  }
}

export function useRowExpansionStatus(open: boolean, transitionDuration?: number) {
  const [expanded, setExpanded] = useState(open);
  const [visible, setVisible] = useState(open);

  const expand = useTimeout(() => setExpanded(true), 0);
  const hide = useTimeout(() => setVisible(false), transitionDuration || 200);

  useEffect(() => {
    if (open) {
      hide.clear();
      setVisible(true);
      expand.start();
    } else {
      expand.clear();
      setExpanded(false);
      hide.start();
    }
  }, [expand, hide, open]);

  return { expanded, visible };
}

export function useElementOuterSize<T extends HTMLElement>() {
  const [ref] = useResizeObserver<T>();
  const { width, height } = ref.current?.getBoundingClientRect() || { width: 0, height: 0 };
  return { ref, width, height };
}
