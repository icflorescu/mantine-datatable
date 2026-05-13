import { type RefObject, useCallback, useEffect, useState } from 'react';
import type { DataTableColumn } from '../types';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export type PinnedColumnInfo = {
  position: 'left' | 'right';
  logicalSide: 'left' | 'right';
  offset: number;
  isBoundary: boolean;
};

export function useDataTablePinnedColumns<T>({
  columns,
  theadRef,
  tbodyRef,
  selectionColumnHeaderRef,
  selectionVisible,
  pinFirstColumn,
  pinLastColumn,
}: {
  columns: DataTableColumn<T>[];
  theadRef: RefObject<HTMLTableSectionElement | null>;
  tbodyRef: RefObject<HTMLTableSectionElement | null>;
  selectionColumnHeaderRef: RefObject<HTMLTableCellElement | null>;
  selectionVisible: boolean;
  pinFirstColumn?: boolean;
  pinLastColumn?: boolean;
}): {
  pinnedMap: Map<string, PinnedColumnInfo>;
  hasLeftPinned: boolean;
  hasRightPinned: boolean;
} {
  const [pinnedMap, setPinnedMap] = useState<Map<string, PinnedColumnInfo>>(new Map());

  const recalculate = useCallback(() => {
    const measurementSection = theadRef.current ?? tbodyRef.current;
    if (!measurementSection) return;

    const isTheadSource = !!theadRef.current;
    const measurementRow = isTheadSource
      ? measurementSection.querySelector<HTMLTableRowElement>('tr:last-of-type')
      : measurementSection.querySelector<HTMLTableRowElement>('tr:first-of-type');
    if (!measurementRow) return;

    const isRtl = getComputedStyle(measurementSection).direction === 'rtl';

    const widths = new Map<string, number>();

    if (isTheadSource) {
      measurementRow.querySelectorAll<HTMLElement>('th[data-accessor]').forEach((th) => {
        const accessor = th.dataset.accessor;
        if (accessor) {
          const w = th.getBoundingClientRect().width;
          if (w > 0) widths.set(accessor, w);
        }
      });
    } else {
      const visibleCols = columns.filter((c) => !c.hidden);
      const tds = measurementRow.querySelectorAll<HTMLElement>(
        'td:not(.mantine-datatable-row-selector-cell):not(.mantine-datatable-row-expansion-cell)'
      );
      tds.forEach((td, i) => {
        if (visibleCols[i]) {
          const w = td.getBoundingClientRect().width;
          if (w > 0) widths.set(String(visibleCols[i].accessor), w);
        }
      });
    }

    let selectionWidth = 0;
    if (selectionVisible) {
      const selCell =
        selectionColumnHeaderRef.current ??
        measurementSection.querySelector<HTMLElement>(
          isTheadSource ? '.mantine-datatable-header-selector-cell' : '.mantine-datatable-row-selector-cell'
        );
      if (selCell) selectionWidth = selCell.getBoundingClientRect().width;
    }

    const renderedAccessors = columns
      .filter((c) => !c.hidden && widths.has(String(c.accessor)))
      .map((c) => String(c.accessor));

    const resolvedPinned = new Map<string, 'left' | 'right'>();
    for (const col of columns) {
      const acc = String(col.accessor);
      if (!renderedAccessors.includes(acc)) continue;

      if (col.pinned) {
        resolvedPinned.set(acc, col.pinned);
      } else if (pinFirstColumn && acc === renderedAccessors[0] && !resolvedPinned.has(acc)) {
        resolvedPinned.set(acc, 'left');
      } else if (pinLastColumn && acc === renderedAccessors[renderedAccessors.length - 1] && !resolvedPinned.has(acc)) {
        resolvedPinned.set(acc, 'right');
      }
    }

    const leftPinned = renderedAccessors.filter((acc) => resolvedPinned.get(acc) === 'left');
    const rightPinned = renderedAccessors.filter((acc) => resolvedPinned.get(acc) === 'right');

    const newMap = new Map<string, PinnedColumnInfo>();

    let leftOffset = selectionWidth;
    leftPinned.forEach((acc, i) => {
      newMap.set(acc, {
        position: isRtl ? 'right' : 'left',
        logicalSide: 'left',
        offset: leftOffset,
        isBoundary: i === leftPinned.length - 1,
      });
      leftOffset += widths.get(acc) || 0;
    });

    let rightOffset = -0.4; // Webkit subpixel gap fix (see old CSS: right: rem(-0.4px))
    const rightReversed = [...rightPinned].reverse();
    rightReversed.forEach((acc, i) => {
      newMap.set(acc, {
        position: isRtl ? 'left' : 'right',
        logicalSide: 'right',
        offset: rightOffset,
        isBoundary: i === rightReversed.length - 1,
      });
      rightOffset += widths.get(acc) || 0;
    });

    setPinnedMap((prev) => {
      if (prev.size !== newMap.size) return newMap;
      for (const [k, v] of newMap) {
        const pv = prev.get(k);
        if (
          !pv ||
          pv.position !== v.position ||
          pv.logicalSide !== v.logicalSide ||
          pv.offset !== v.offset ||
          pv.isBoundary !== v.isBoundary
        ) {
          return newMap;
        }
      }
      return prev;
    });
  }, [columns, selectionVisible, theadRef, tbodyRef, selectionColumnHeaderRef, pinFirstColumn, pinLastColumn]);

  useEffect(() => {
    const section = theadRef.current ?? tbodyRef.current;
    if (!section) return;

    const isTheadSource = !!theadRef.current;
    const row = isTheadSource ? section.querySelector('tr:last-of-type') : section.querySelector('tr:first-of-type');
    if (!row) return;

    const observer = new ResizeObserver(recalculate);
    row.querySelectorAll(isTheadSource ? 'th' : 'td').forEach((cell) => {
      observer.observe(cell);
    });

    return () => observer.disconnect();
  }, [theadRef, tbodyRef, recalculate]);

  useIsomorphicLayoutEffect(recalculate, [recalculate]);

  const hasLeftPinned = [...pinnedMap.values()].some((info) => info.logicalSide === 'left');
  const hasRightPinned = [...pinnedMap.values()].some((info) => info.logicalSide === 'right');

  return { pinnedMap, hasLeftPinned, hasRightPinned };
}
