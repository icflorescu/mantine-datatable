import { Center, Text, type MantineSpacing, type StyleProp } from '@mantine/core';
import { IconDatabaseOff } from '@tabler/icons-react';

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
    <Center pt={pt} pb={pb} className="mantine-datatable-empty-state" data-active={active || undefined}>
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
