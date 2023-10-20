import { useEffect, useState } from 'react';

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
