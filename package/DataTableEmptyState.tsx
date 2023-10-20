import { Center, Text, type MantineSpacing, type StyleProp } from '@mantine/core';
import { IconDatabaseOff } from '@tabler/icons-react';
import clsx from 'clsx';

type DataTableEmptyStateProps = {
  icon: React.ReactNode | undefined;
  text: string;
  pt: StyleProp<MantineSpacing>;
  pb: StyleProp<MantineSpacing>;
  active: boolean;
  children: React.ReactNode | undefined;
};

export function DataTableEmptyState({ icon, text, pt, pb, active, children }: DataTableEmptyStateProps) {
  return (
    <Center
      pt={pt}
      pb={pb}
      className={clsx('mantine-datatable-empty-state', { 'mantine-datatable-empty-state-active': active })}
    >
      {children || (
        <>
          {icon || (
            <div className="mantine-datatable-empty-state-icon">
              <IconDatabaseOff />
            </div>
          )}
          <Text size="sm" c="dimmed">
            {text}
          </Text>
        </>
      )}
    </Center>
  );
}
