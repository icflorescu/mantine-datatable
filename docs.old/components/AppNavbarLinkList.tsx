import { Box, Collapse, createStyles } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AppNavbarButton, { AppNavbarButtonDisplayProps } from './AppNavbarButton';
import AppNavbarLinkListItem from './AppNavbarLinkListItem';

const useStyles = createStyles({
  items: {
    position: 'relative',
  },
  connector: {
    position: 'absolute',
    top: -8,
    left: 24,
    width: 2,
    bottom: 20,
    transform: 'scale3d(1, 0, 1)',
    transformOrigin: 'top',
    transition: 'transform .75s ease-out',
  },
  connectorVisible: {
    transform: 'scale3d(1, 1, 1)',
  },
});

type AppNavbarLinkList = Omit<AppNavbarButtonDisplayProps, 'icon'> & {
  items: { title: string; description?: string; to: string }[];
};

export default function AppNavbarLinkList({ color, title, items }: AppNavbarLinkList) {
  const localStorageKey = `${title}-navlinks-open`;

  const [open, setOpen] = useLocalStorage({
    key: localStorageKey,
    defaultValue: false,
    getInitialValueInEffect: true,
  });

  const [connectorVisible, setConnectorVisible] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (open) {
      timeout = setTimeout(() => {
        setConnectorVisible(true);
      }, 200);
    } else {
      setConnectorVisible(false);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [open]);

  const { asPath } = useRouter();

  useEffect(() => {
    if (items.map((item) => item.to).includes(asPath)) {
      setOpen(true);
    }
  }, [asPath, items, localStorageKey, setOpen]);

  const { classes, cx } = useStyles();

  return (
    <>
      <AppNavbarButton
        icon={IconChevronRight}
        rotateIcon={open}
        color={color}
        title={title}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      />
      <Collapse className={classes.items} in={open} transitionDuration={200}>
        <Box
          className={cx(classes.connector, { [classes.connectorVisible]: connectorVisible })}
          sx={(theme) => ({ background: theme.fn.rgba(theme.colors[color || 'blue'][6], 0.5) })}
        />
        {items.map(({ title, description, to }) => (
          <AppNavbarLinkListItem
            key={to}
            title={title}
            description={description}
            to={to}
            color={color}
            active={asPath === to || asPath.startsWith(`${to}#`)}
          />
        ))}
      </Collapse>
    </>
  );
}
