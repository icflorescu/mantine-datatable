import { createStyles, Group, MantineColor, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { FC, ForwardedRef, forwardRef, MouseEventHandler } from 'react';

const useStyles = createStyles((theme, { color = 'blue' }: { color?: MantineColor }) => ({
  root: {
    display: 'block',
    width: '100%',
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
  icon: {
    transition: 'transform .15s ease',
  },
  rotate: {
    transform: 'rotate3d(0, 0, 1, 90deg)',
  },
}));

export type AppNavbarButtonDisplayProps = {
  color?: MantineColor;
  icon: FC<{ size?: string | number }>;
  title: string;
  description?: string;
};

type AppNavbarButtonProps = AppNavbarButtonDisplayProps & {
  rotateIcon?: boolean;
  active?: boolean;
  href?: string;
  externalLink?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default forwardRef(function AppNavbarButton(
  { color, icon: Icon, title, description, href, externalLink, onClick, active, rotateIcon }: AppNavbarButtonProps,
  ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>
) {
  const { classes, cx } = useStyles({ color });
  return (
    <UnstyledButton
      className={cx(classes.root, { [classes.active]: active })}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={ref}
      component={href ? 'a' : 'button'}
      href={href}
      aria-label={description}
      target={externalLink ? '_blank' : undefined}
      onClick={onClick}
    >
      <Group px="sm" py="xs" spacing="xs">
        <ThemeIcon className={cx(classes.icon, { [classes.rotate]: rotateIcon })} size="md" radius="lg" color={color}>
          <Icon size={16} />
        </ThemeIcon>
        <Text size="sm" weight={500}>
          {title}
        </Text>
      </Group>
    </UnstyledButton>
  );
});
