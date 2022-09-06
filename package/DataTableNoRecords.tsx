import { Center, createStyles, Text } from '@mantine/core';
import { DatabaseOff } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'column',
    pointerEvents: 'none',
    opacity: 0,
    transition: 'opacity .15s ease',
  },
  active: {
    opacity: 1,
  },
  icon: {
    fontSize: 0,
    borderRadius: '50%',
    padding: theme.spacing.xs,
    background: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[6],
  },
}));

type DataTableNoRecordsProps = {
  text: string;
  pt: number;
  pb: number;
  active: boolean;
};

export default function DataTableNoRecords({ text, pt, pb, active }: DataTableNoRecordsProps) {
  const { classes, cx } = useStyles();
  return (
    <Center pt={pt} pb={pb} className={cx(classes.root, { [classes.active]: active })}>
      <div className={classes.icon}>
        <DatabaseOff />
      </div>
      <Text size="sm" color="dimmed">
        {text}
      </Text>
    </Center>
  );
}
