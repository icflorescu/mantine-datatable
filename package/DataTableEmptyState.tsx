import { Center, Text } from '@mantine/core';
import type { JSX } from 'react';
import { IconDatabaseOff } from './icons/IconDatabaseOff';

type DataTableEmptyStateProps = React.PropsWithChildren<{
  icon: React.ReactNode | undefined;
  text: string;
  active: boolean;
}>;

export function DataTableEmptyState({ icon, text, active, children }: DataTableEmptyStateProps): JSX.Element {
  return (
    <Center className="mantine-datatable-empty-state" data-active={active || undefined}>
      {children || (
        <>
          {icon || (
            <div className="mantine-datatable-empty-state-icon">
              <IconDatabaseOff />
            </div>
          )}
          <Text component="div" size="sm" c="dimmed">
            {text}
          </Text>
        </>
      )}
    </Center>
  );
}
