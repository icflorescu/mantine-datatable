import { Box, createStyles, MantineColor, Text, UnstyledButton } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme, { color = 'blue' }: { color?: MantineColor }) => ({
  root: {
    display: 'block',
    transition: 'background .15s ease',
    '&:hover': {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    },
    '&:active': {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
    },
  },
  active: {
    background: theme.fn.rgba(theme.colors[color][6], theme.colorScheme === 'dark' ? 0.2 : 0.1),
    '&:hover': {
      background:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.fn.lighten(theme.colors[color][6], 0.1), 0.2)
          : theme.fn.rgba(theme.fn.darken(theme.colors[color][6], 0.1), 0.15),
    },
    '&:active': {
      background:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.fn.lighten(theme.colors[color][6], 0.3), 0.2)
          : theme.fn.rgba(theme.fn.darken(theme.colors[color][6], 0.3), 0.15),
    },
  },
  content: {
    display: 'flex',
    gap: 16,
  },
  bullet: {
    flex: '0 0 12px',
    height: 12,
    marginTop: 5,
    background: theme.colors[color][6],
    borderRadius: '50%',
  },
  text: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7],
  },
}));

type AppNavbarLinkListItemProps = {
  title: string;
  to: string;
  color?: MantineColor;
  active: boolean;
};

export default function AppNavbarLinkListItem({ title, to, color, active }: AppNavbarLinkListItemProps) {
  const { classes, cx } = useStyles({ color });

  return (
    <Link key={to} href={to} passHref>
      <UnstyledButton pl={19} py={8} className={cx(classes.root, { [classes.active]: active })} component="a">
        <div className={classes.content}>
          <Box className={classes.bullet} />
          <Text className={classes.text} size="sm" weight={500}>
            {title}
          </Text>
        </div>
      </UnstyledButton>
    </Link>
  );
}
