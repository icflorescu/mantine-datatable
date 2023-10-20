import { useTimeout } from '@mantine/hooks';
import { useEffect, useState } from 'react';

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
