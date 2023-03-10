import { Center, createStyles, Text } from '@mantine/core';
import { IconDatabaseOff } from '@tabler/icons-react';
import type { ReactNode } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'column',
    pointerEvents: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[6],
    opacity: 0,
    transition: 'opacity .15s ease',
  },
  active: {
    opacity: 1,
  },
  standardIcon: {
    fontSize: 0,
    borderRadius: '50%',
    padding: theme.spacing.xs,
    background: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
  },
}));

type DataTableEmptyStateProps = {
  icon: ReactNode | undefined;
  text: string;
  pt: number;
  pb: number;
  active: boolean;
  children: ReactNode | undefined;
};

export default function DataTableEmptyState({ icon, text, pt, pb, active, children }: DataTableEmptyStateProps) {
  const { classes, cx } = useStyles();
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
