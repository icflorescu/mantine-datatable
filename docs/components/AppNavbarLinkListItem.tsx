import { Box, createStyles, getStylesRef, MantineColor, Text, UnstyledButton } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme, { color = 'blue' }: { color?: MantineColor }) => {
  const hoverBackground = theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1];
  const pressedBackground = theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3];

  return {
    root: {
      display: 'block',
      transition: 'background .15s ease',
      '&:hover': {
        background: hoverBackground,
        [`.${getStylesRef('bullet')}`]: { borderColor: hoverBackground },
      },
      '&:active': {
        background: pressedBackground,
        [`.${getStylesRef('bullet')}`]: { borderColor: pressedBackground },
      },
    },
    active: {
      background: theme.fn.rgba(theme.colors[color][6], theme.colorScheme === 'dark' ? 0.2 : 0.1),
      '&:hover': {
        background:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.fn.lighten(theme.colors[color][6], 0.1), 0.2)
            : theme.fn.rgba(theme.fn.darken(theme.colors[color][6], 0.1), 0.15),
        [`.${getStylesRef('bullet')}`]: { borderColor: hoverBackground },
      },
      '&:active': {
        background:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.fn.lighten(theme.colors[color][6], 0.3), 0.2)
            : theme.fn.rgba(theme.fn.darken(theme.colors[color][6], 0.3), 0.15),
        [`.${getStylesRef('bullet')}`]: { borderColor: pressedBackground },
      },
    },
    bullet: {
      ref: getStylesRef('bullet'),
      flex: '0 0 16px',
      height: 16,
      margin: '3px 0 0 -2px',
      background: theme.colors[color][6],
      border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[0]}`,
      transition: 'border-color .15s ease',
      borderRadius: '50%',
      zIndex: 1,
    },
    content: {
      display: 'flex',
      gap: 16,
    },
    text: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7],
    },
  };
});

type AppNavbarLinkListItemProps = {
  title: string;
  description?: string;
  to: string;
  color?: MantineColor;
  active: boolean;
};

export default function AppNavbarLinkListItem({ title, description, to, color, active }: AppNavbarLinkListItemProps) {
  const { classes, cx } = useStyles({ color });

  return (
    <UnstyledButton
      pl={19}
      py={8}
      className={cx(classes.root, { [classes.active]: active })}
      component={Link}
      href={to}
      aria-label={description}
    >
      <div className={classes.content}>
        <Box className={classes.bullet} />
        <Text className={classes.text} size="sm" weight={500}>
          {title}
        </Text>
      </div>
    </UnstyledButton>
  );
}
