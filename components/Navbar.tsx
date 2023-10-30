import { AppShellNavbar, Box, ScrollArea } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { getNavbarButtonsInfo } from '~/lib/utils';
import classes from './Navbar.module.css';
import { NavbarButton } from './NavbarButton';
import { NavbarDynamicLinkButtons } from './NavbarDynamicLinkButtons';
import { NavbarExamples } from './NavbarExamples';

export type NavbarProps = {
  onClick: () => void;
};

export function Navbar({ onClick }: NavbarProps) {
  const buttonsInfo = getNavbarButtonsInfo();

  const { ref: viewportRef, height: viewportHeight } = useElementSize<HTMLDivElement>();

  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [scrolledToBottom, setScrolledToBottom] = useState(true);

  const onScrollPositionChange = ({ y }: { y: number }) => {
    setScrolledToTop(y === 0);
    setScrolledToBottom(Math.ceil(viewportHeight) + y === (viewportRef.current?.scrollHeight || 0));
  };

  useEffect(() => {
    setScrolledToBottom(Math.ceil(viewportHeight) === (viewportRef.current?.scrollHeight || 0));
  }, [viewportHeight, viewportRef]);

  return (
    <AppShellNavbar onClick={onClick}>
      <div
        className={clsx(classes.scrollShadow, classes.scrollShadowTop, {
          [classes.scrollShadowVisible]: !scrolledToTop,
        })}
      />
      <ScrollArea viewportRef={viewportRef} onScrollPositionChange={onScrollPositionChange}>
        <Box py="md">
          {buttonsInfo['before-examples'].map((item) => (
            <NavbarButton key={item.href} {...item} />
          ))}
          <NavbarExamples items={buttonsInfo['examples']} />
          {buttonsInfo['after-examples'].map((item) => (
            <NavbarButton key={item.href} {...item} />
          ))}
          <NavbarDynamicLinkButtons />
        </Box>
      </ScrollArea>
      <div
        className={clsx(classes.scrollShadow, classes.scrollShadowBottom, {
          [classes.scrollShadowVisible]: !scrolledToBottom,
        })}
      />
    </AppShellNavbar>
  );
}
