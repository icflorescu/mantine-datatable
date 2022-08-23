import { createStyles, Text, ThemeIcon } from '@mantine/core';
import { FC, ReactNode } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    gap: theme.spacing.md,
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      width: `calc(50% - ${theme.spacing.lg}px)`,
      flexDirection: 'column',
    },
  },
  icon: {
    background: theme.fn.gradient({ from: theme.colors.blue[6], to: theme.colors.cyan[6] }),
  },
  title: {
    marginTop: '-0.33em',
  },
}));

type HopePageFeatureProps = {
  icon: FC<{ size?: string | number }>;
  title: ReactNode;
  children: ReactNode;
};

export default function HomePageFeature({ icon: Icon, title, children }: HopePageFeatureProps) {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <ThemeIcon className={classes.icon} size={48} radius="md">
        <Icon />
      </ThemeIcon>
      <div>
        <Text className={classes.title} weight="500">
          {title}
        </Text>
        <Text color="dimmed" size="sm">
          {children}
        </Text>
      </div>
    </div>
  );
}
