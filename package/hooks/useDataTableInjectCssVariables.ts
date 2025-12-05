import { rem } from '@mantine/core';
import { useCallback, useEffect, useRef } from 'react';
import type { DataTableScrollProps } from '../types/DataTableScrollProps';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { useStableValue } from './useStableValue';

const VAR_HEADER_HEIGHT = '--mantine-datatable-header-height';
const VAR_FOOTER_HEIGHT = '--mantine-datatable-footer-height';
const VAR_SELECTION_COLUMN_WIDTH = '--mantine-datatable-selection-column-width';
const VAR_LAST_ROW_BORDER_BOTTOM = '--mantine-datatable-last-row-border-bottom';

interface UseDataTableInjectCssVariablesOpts {
  scrollCallbacks: DataTableScrollProps;
  withRowBorders: boolean | undefined;
}

type OnScroll = NonNullable<DataTableScrollProps['onScroll']>;

type Rect = {
  width: number;
  height: number;
};

type Pos = 'top' | 'bottom' | 'left' | 'right';

function setCssVar(root: HTMLDivElement | null, name: string, value: string) {
  root?.style.setProperty(name, value);
}

function getRect(entry: ResizeObserverEntry): Rect {
  const boxSize = entry.borderBoxSize?.[0] || entry.contentBoxSize?.[0];
  if (boxSize) {
    return {
      width: boxSize.inlineSize,
      height: boxSize.blockSize,
    };
  } else {
    return { width: entry.contentRect.width, height: entry.contentRect.height };
  }
}

function observe(elem: HTMLElement | null, onChange: (rect: Rect) => unknown, onCancel: () => unknown) {
  if (elem) {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        onChange(getRect(entry));
      }
    });
    observer.observe(elem);
    return () => {
      observer.disconnect();
      onCancel();
    };
  }
}

export function useDataTableInjectCssVariables({
  scrollCallbacks,
  withRowBorders,
}: UseDataTableInjectCssVariablesOpts) {
  const refs = {
    root: useRef<HTMLDivElement>(null),
    table: useRef<HTMLTableElement>(null),
    scrollViewport: useRef<HTMLElement>(null),
    header: useRef<HTMLTableSectionElement>(null),
    footer: useRef<HTMLTableSectionElement>(null),
    selectionColumnHeader: useRef<HTMLTableCellElement>(null),
  };
  const { root, table, scrollViewport, header, footer, selectionColumnHeader } = refs;

  const stableDependencies = useStableValue({ withRowBorders });
  const stableScrollCallbacks = useStableValue(scrollCallbacks);
  const processScrollingRef = useRef<() => void>(() => void 0);
  const processLastRowBottomBorderRef = useRef<() => void>(() => void 0);
  const onScroll = useCallback<OnScroll>((ev) => {
    stableScrollCallbacks.current.onScroll?.(ev);
    processScrollingRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return observe(
      header.current,
      (rect) => {
        setCssVar(root.current, VAR_HEADER_HEIGHT, `${rect.height}px`);
      },
      () => setCssVar(root.current, VAR_HEADER_HEIGHT, '0')
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [header.current]);

  useEffect(() => {
    return observe(
      footer.current,
      (rect) => {
        setCssVar(root.current, VAR_FOOTER_HEIGHT, `${rect.height}px`);
      },
      () => setCssVar(root.current, VAR_FOOTER_HEIGHT, '0')
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footer.current]);

  useEffect(() => {
    return observe(
      selectionColumnHeader.current,
      (rect) => {
        setCssVar(root.current, VAR_SELECTION_COLUMN_WIDTH, `${rect.width}px`);
      },
      () => setCssVar(root.current, VAR_SELECTION_COLUMN_WIDTH, '0')
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionColumnHeader.current]);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === undefined) {
      return;
    }
    const scrollPosition: Record<Pos, boolean> = {
      top: true,
      bottom: true,
      left: true,
      right: true,
    };
    let tableRect: Rect = { width: 0, height: 0 };
    let scrollRect: Rect = { width: 0, height: 0 };

    function setScrolledTo(pos: Pos, value: boolean) {
      const old = scrollPosition[pos];
      scrollPosition[pos] = value;
      setCssVar(root.current, `--mantine-datatable-${pos}-shadow-opacity`, value ? '0' : '1');
      return old;
    }

    function processFooterPosition() {
      const diff = tableRect.height - scrollRect.height;
      const relative = diff < 0;
      setCssVar(root.current, '--mantine-datatable-footer-position', relative ? 'relative' : 'sticky');
      setCssVar(root.current, '--mantine-datatable-footer-bottom', relative ? `${diff}px` : '0');
    }

    function processLastRowBottomBorder() {
      if (stableDependencies.current.withRowBorders && tableRect.height < scrollRect.height) {
        setCssVar(
          root.current,
          VAR_LAST_ROW_BORDER_BOTTOM,
          `${rem('1px')} solid var(--mantine-datatable-border-color)`
        );
      } else {
        setCssVar(root.current, VAR_LAST_ROW_BORDER_BOTTOM, 'unset');
      }
    }
    processLastRowBottomBorderRef.current = processLastRowBottomBorder;

    function processScrolling() {
      const callbacks = stableScrollCallbacks.current;
      const viewport = scrollViewport.current;
      const scrollTop = viewport?.scrollTop ?? 0;
      const scrollLeft = viewport?.scrollLeft ?? 0;

      const newScrolledToTop = scrollTop === 0;
      const newScrolledToBottom = tableRect.height - scrollTop - scrollRect.height < 1;
      const scrolledToTop = setScrolledTo('top', newScrolledToTop);
      const scrolledToBottom = setScrolledTo('bottom', newScrolledToBottom);
      if (newScrolledToTop && newScrolledToTop !== scrolledToTop) callbacks.onScrollToTop?.();
      if (newScrolledToBottom && newScrolledToBottom !== scrolledToBottom) callbacks.onScrollToBottom?.();

      // In RTL mode, scrollLeft behavior varies by browser:
      // - Chrome/Edge: starts at 0, goes negative when scrolling left (towards visual left)
      // - Firefox: starts at 0, goes negative when scrolling left
      // - Safari: starts at 0, goes negative when scrolling left
      // The key insight: in RTL, scrollLeft=0 means we're at the RIGHT edge (visual start)
      // and negative/max values mean we're at the LEFT edge (visual end)
      const isRtl = viewport ? getComputedStyle(viewport).direction === 'rtl' : false;
      const maxScrollLeft = (viewport?.scrollWidth ?? 0) - scrollRect.width;

      let newScrolledToLeft: boolean;
      let newScrolledToRight: boolean;

      if (isRtl) {
        // In RTL with modern browsers, scrollLeft is 0 at right edge, negative when scrolling left
        const absScrollLeft = Math.abs(scrollLeft);
        // At right edge (RTL start): absScrollLeft ≈ 0, so scrolledToRight = true (no right shadow)
        // At left edge (RTL end): absScrollLeft ≈ maxScrollLeft, so scrolledToLeft = true (no left shadow)
        newScrolledToRight = absScrollLeft < 1;
        newScrolledToLeft = maxScrollLeft - absScrollLeft < 1;
      } else {
        newScrolledToLeft = scrollLeft < 1;
        newScrolledToRight = tableRect.width - scrollLeft - scrollRect.width < 1;
      }

      const scrolledToLeft = setScrolledTo('left', newScrolledToLeft);
      const scrolledToRight = setScrolledTo('right', newScrolledToRight);
      if (newScrolledToLeft && newScrolledToLeft !== scrolledToLeft) callbacks.onScrollToLeft?.();
      if (newScrolledToRight && newScrolledToRight !== scrolledToRight) callbacks.onScrollToRight?.();
    }
    processScrollingRef.current = processScrolling;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        switch (entry.target.tagName) {
          case 'TABLE': {
            tableRect = getRect(entry);
            break;
          }
          case 'DIV': {
            scrollRect = getRect(entry);
            break;
          }
        }
      }
      processScrolling();
      processFooterPosition();
      processLastRowBottomBorder();
    });

    observer.observe(table.current!);
    observer.observe(scrollViewport.current!);

    return () => {
      observer.disconnect();
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    processLastRowBottomBorderRef.current();
  }, [withRowBorders]);

  return {
    refs,
    onScroll,
  };
}
