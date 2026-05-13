import { useEffect, useState } from 'react';

export function useLastSelectionChangeIndex(recordIds: unknown[] | undefined) {
  const [lastSelectionChangeIndex, setLastSelectionChangeIndex] = useState<number | null>(null);
  const recordIdsString = recordIds?.join(':') || '';
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset when recordIds change
  useEffect(() => {
    setLastSelectionChangeIndex(null);
  }, [recordIdsString]);

  return { lastSelectionChangeIndex, setLastSelectionChangeIndex };
}
