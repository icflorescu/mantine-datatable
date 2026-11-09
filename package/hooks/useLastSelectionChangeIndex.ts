import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

export function useLastSelectionChangeIndex(recordIds: unknown[] | undefined): {
  lastSelectionChangeIndex: number | null;
  setLastSelectionChangeIndex: Dispatch<SetStateAction<number | null>>;
} {
  const [lastSelectionChangeIndex, setLastSelectionChangeIndex] = useState<number | null>(null);
  const recordIdsString = recordIds?.join(':') || '';
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset when recordIds change
  useEffect(() => {
    setLastSelectionChangeIndex(null);
  }, [recordIdsString]);

  return { lastSelectionChangeIndex, setLastSelectionChangeIndex };
}
