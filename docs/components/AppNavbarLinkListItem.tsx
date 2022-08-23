import { Box, createStyles, Group, MantineColor, Text, UnstyledButton } from '@mantine/core';
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
  bullet: {
    zIndex: 1,
    width: 12,
    height: 12,
    background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.white,
    border: `2px solid ${theme.colors[color][6]}`,
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
      <UnstyledButton className={cx(classes.root, { [classes.active]: active })} component="a">
        <Group pl={19} py={8} spacing={16}>
          <Box className={classes.bullet} />
          <Text className={classes.text} size="sm" weight={500}>
            {title}
          </Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}
