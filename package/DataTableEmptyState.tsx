import { Center, Text, type MantineSpacing, type StyleProp } from '@mantine/core';
import { IconDatabaseOff } from './icons/IconDatabaseOff';

type DataTableEmptyStateProps = React.PropsWithChildren<{
  icon: React.ReactNode | undefined;
  text: string;
  pt: StyleProp<MantineSpacing>;
  pb: StyleProp<MantineSpacing>;
  active: boolean;
}>;

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
          <Text component="div" size="sm" c="dimmed">
            {text}
          </Text>
        </>
      )}
    </Center>
  );
}
