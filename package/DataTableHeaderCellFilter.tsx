import { ActionIcon, Popover, PopoverDropdown, PopoverTarget } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { IconFilter } from './icons/IconFilter';
import { IconFilterFilled } from './icons/IconFilterFilled';
import type { DataTableColumn } from './types';

type DataTableHeaderCellFilterProps<T> = {
  children: DataTableColumn<T>['filter'];
  filterPopoverProps: DataTableColumn<T>['filterPopoverProps'];
  isActive: boolean;
};

export function DataTableHeaderCellFilter<T>({
  children,
  isActive,
  filterPopoverProps,
}: DataTableHeaderCellFilterProps<T>) {
  const [isOpen, { close, toggle }] = useDisclosure(false);
  const Icon = isActive ? IconFilterFilled : IconFilter;
  const ref = useClickOutside(close);

  return (
    <Popover withArrow shadow="md" opened={isOpen} onClose={close} trapFocus {...filterPopoverProps}>
      <PopoverTarget>
        <ActionIcon
          className="mantine-datatable-header-cell-filter-action-icon"
          data-active={isActive || undefined}
          size="sm"
          variant="default"
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Icon />
        </ActionIcon>
      </PopoverTarget>
      <PopoverDropdown ref={ref} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
        {typeof children === 'function' ? children({ close }) : children}
      </PopoverDropdown>
    </Popover>
  );
}
