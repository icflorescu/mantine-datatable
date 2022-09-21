import { useDebouncedState } from '@mantine/hooks';
import { useEffect, useState } from 'react';

const SCROLL_DEBOUNCE_INTERVAL = 200;
const SCROLL_DEBOUNCE_OPTIONS = { leading: true };

export function useDataTableScrollState() {
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

export function useDataTableLastSelectionChangeIndexState(recordIds: unknown[] | undefined) {
  const [lastSelectionChangeIndex, setLastSelectionChangeIndex] = useState<number | null>(null);
  const recordIdsString = recordIds?.join(':') || '';
  useEffect(() => {
    setLastSelectionChangeIndex(null);
  }, [recordIdsString]);

  return { lastSelectionChangeIndex, setLastSelectionChangeIndex };
}
