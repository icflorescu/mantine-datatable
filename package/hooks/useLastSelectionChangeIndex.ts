import { useEffect, useState } from 'react';

export function useLastSelectionChangeIndex(recordIds: unknown[] | undefined) {
  const [lastSelectionChangeIndex, setLastSelectionChangeIndex] = useState<number | null>(null);
  const recordIdsString = recordIds?.join(':') || '';
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLastSelectionChangeIndex(null);
  }, [recordIdsString]);

  return { lastSelectionChangeIndex, setLastSelectionChangeIndex };
}
