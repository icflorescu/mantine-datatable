import { ActionIcon, Popover } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter } from '@tabler/icons-react';
import type { DataTableColumn } from './types';

type DataTableHeaderCellFilterProps<T> = {
  children: DataTableColumn<T>['filter'];
  isActive: boolean;
};

export default function DataTableHeaderCellFilter<T>({ children, isActive }: DataTableHeaderCellFilterProps<T>) {
  const [isOpen, { close, toggle }] = useDisclosure(false);

  return (
    <Popover withArrow withinPortal shadow="md" opened={isOpen} onClose={close} trapFocus>
      <Popover.Target>
        <ActionIcon
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
          variant={isActive ? 'default' : 'subtle'}
        >
          <IconFilter size={14} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown onClick={(e) => e.preventDefault()}>
        {typeof children === 'function' ? children({ close }) : children}
      </Popover.Dropdown>
    </Popover>
  );
}
