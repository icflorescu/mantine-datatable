'use client';

import { ActionIcon, Center, Group, Popover } from '@mantine/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from './hooks/useIsomorphicLayoutEffect';
import { IconArrowLeft } from './icons/IconArrowLeft';
import { IconArrowRight } from './icons/IconArrowRight';
import { IconPin } from './icons/IconPin';
import { IconX } from './icons/IconX';

type DataTablePinnableDropdownProps = {
  currentPinned: 'left' | 'right' | undefined;
  onPinChange: (pinned: 'left' | 'right' | undefined) => void;
};

export function DataTablePinnableDropdown({ currentPinned, onPinChange }: DataTablePinnableDropdownProps) {
  const [opened, setOpened] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRtl, setIsRtl] = useState(false);

  // Detect RTL from DOM - more reliable than useDirection() which may not see local DirectionProvider
  const detectDirection = useCallback(() => {
    if (containerRef.current) {
      const computedDir = getComputedStyle(containerRef.current).direction;
      setIsRtl(computedDir === 'rtl');
    }
  }, []);

  // Use layout effect for synchronous detection (no flash)
  useIsomorphicLayoutEffect(() => {
    detectDirection();
  }, [detectDirection]);

  // Re-detect on open (in case direction changed)
  useEffect(() => {
    if (opened) {
      detectDirection();
    }
  }, [opened, detectDirection]);

  // In RTL mode, visual arrows should map to opposite logical sides:
  // - Left arrow (visually pointing left) → physical left edge → 'right' in RTL
  // - Right arrow (visually pointing right) → physical right edge → 'left' in RTL
  const leftArrowPinValue: 'left' | 'right' = isRtl ? 'right' : 'left';
  const rightArrowPinValue: 'left' | 'right' = isRtl ? 'left' : 'right';

  // For highlighting: check if current pinned matches what this arrow would set
  const isLeftArrowActive = currentPinned === leftArrowPinValue;
  const isRightArrowActive = currentPinned === rightArrowPinValue;

  return (
    <Popover opened={opened} onChange={setOpened} position="bottom" withArrow shadow="sm">
      <Popover.Target>
        <Center
          ref={containerRef}
          className="mantine-datatable-header-cell-pinnable-icon"
          role="button"
          aria-label="Pin column"
          onMouseEnter={() => setOpened(true)}
          onMouseLeave={() => setOpened(false)}
        >
          <ActionIcon size="xs" variant="light" onClick={(e) => e.stopPropagation()}>
            <IconPin />
          </ActionIcon>
        </Center>
      </Popover.Target>

      <Popover.Dropdown
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setOpened(true)}
        onMouseLeave={() => setOpened(false)}
        className="mantine-datatable-pinnable-dropdown"
      >
        <Group gap={4}>
          <ActionIcon
            size="sm"
            variant={isLeftArrowActive ? 'filled' : 'light'}
            onClick={() => onPinChange(isLeftArrowActive ? undefined : leftArrowPinValue)}
            aria-label="Pin left"
          >
            <IconArrowLeft />
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant={isRightArrowActive ? 'filled' : 'light'}
            onClick={() => onPinChange(isRightArrowActive ? undefined : rightArrowPinValue)}
            aria-label="Pin right"
          >
            <IconArrowRight />
          </ActionIcon>
          {currentPinned && (
            <ActionIcon size="sm" variant="light" color="red" onClick={() => onPinChange(undefined)} aria-label="Unpin">
              <IconX />
            </ActionIcon>
          )}
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
