import { Center, Text } from '@mantine/core';
import { IconDatabaseOff } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import classes from './styles/DataTableEmptyState.css';
import cx from 'clsx';

type DataTableEmptyStateProps = {
  icon: ReactNode | undefined;
  text: string;
  pt: number;
  pb: number;
  active: boolean;
  children: ReactNode | undefined;
};

export default function DataTableEmptyState({ icon, text, pt, pb, active, children }: DataTableEmptyStateProps) {
  return (
    <Center pt={pt} pb={pb} className={cx(classes.root, { [classes.active]: active })}>
      {children || (
        <>
          {icon || (
            <div className={classes.standardIcon}>
              <IconDatabaseOff />
            </div>
          )}
          <Text size="sm" color="dimmed">
            {text}
          </Text>
        </>
      )}
    </Center>
  );
}
