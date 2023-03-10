import { createStyles, px, Text, ThemeIcon } from '@mantine/core';
import { FC, ReactNode } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    gap: theme.spacing.md,
    [`@media (min-width: ${theme.breakpoints.xs})`]: {
      width: `calc(50% - ${px(theme.spacing.lg)}px)`,
      flexDirection: 'column',
    },
  },
  icon: {
    background: theme.fn.gradient({ from: theme.colors.blue[6], to: theme.colors.cyan[6] }),
  },
  title: {
    marginTop: '-0.33em',
  },
  description: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[8],
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
        <Text className={classes.description} size="sm">
          {children}
        </Text>
      </div>
    </div>
  );
}
