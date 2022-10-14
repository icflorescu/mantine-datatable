import { useDebouncedState, useTimeout } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { DataTableRowExpansionProps } from './DataTable.props';
import { getValueAtPath } from './utils';

const SCROLL_DEBOUNCE_INTERVAL = 200;
const SCROLL_DEBOUNCE_OPTIONS = { leading: true };

export function useScrollStatus() {
  const [scrolledToTop, setScrolledToTop] = useDebouncedState(true, SCROLL_DEBOUNCE_INTERVAL, SCROLL_DEBOUNCE_OPTIONS);
  const [scrolledToBottom, setScrolledToBottom] = useDebouncedState(
    true,
    SCROLL_DEBOUNCE_INTERVAL,
    SCROLL_DEBOUNCE_OPTIONS
  );
  const [scrolledToLeft, setScrolledToLeft] = useDebouncedState(
    true,
    SCROLL_DEBOUNCE_INTERVAL,
    SCROLL_DEBOUNCE_OPTIONS
  );
  const [scrolledToRight, setScrolledToRight] = useDebouncedState(
    true,
    SCROLL_DEBOUNCE_INTERVAL,
    SCROLL_DEBOUNCE_OPTIONS
  );

  return {
    scrolledToTop,
    setScrolledToTop,
    scrolledToBottom,
    setScrolledToBottom,
    scrolledToLeft,
    setScrolledToLeft,
    scrolledToRight,
    setScrolledToRight,
  };
}

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
    top: number;
    left: number;
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
  idAccessor: string;
}) {
  let initiallyExpandedRecordIds: unknown[] = [];
  if (rowExpansion && records) {
    const { trigger, allowMultiple, initiallyExpanded } = rowExpansion;
    if (records && trigger === 'always') {
      initiallyExpandedRecordIds = records.map((r) => getValueAtPath(r, idAccessor));
    } else if (initiallyExpanded) {
      initiallyExpandedRecordIds = records.filter(initiallyExpanded).map((r) => getValueAtPath(r, idAccessor));
      if (!allowMultiple) {
        initiallyExpandedRecordIds = [initiallyExpandedRecordIds[0]];
      }
    }
  }

  let expandedRecordIds: unknown[];
  let setExpandedRecordIds: (expandedRecordIds: unknown[]) => void;
  const expandedRecordIdsState = useState<unknown[]>(initiallyExpandedRecordIds);

  if (rowExpansion) {
    const { trigger, allowMultiple, collapseProps, content } = rowExpansion;
    if (rowExpansion.expanded) {
      ({ recordIds: expandedRecordIds, onRecordIdsChange: setExpandedRecordIds } = rowExpansion.expanded);
    } else {
      [expandedRecordIds, setExpandedRecordIds] = expandedRecordIdsState;
    }

    const collapseRow = (record: T) =>
      setExpandedRecordIds(expandedRecordIds.filter((id) => id !== getValueAtPath(record, idAccessor)));

    return {
      expandOnClick: trigger !== 'always' && trigger !== 'never',
      isRowExpanded: (record: T) =>
        trigger === 'always' ? true : expandedRecordIds.includes(getValueAtPath(record, idAccessor)),
      expandRow: (record: T) => {
        const recordId = getValueAtPath(record, idAccessor);
        setExpandedRecordIds(allowMultiple ? [...expandedRecordIds, recordId] : [recordId]);
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
