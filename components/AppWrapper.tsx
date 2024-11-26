'use client';

import { AppShell, AppShellMain, Container } from '@mantine/core';
import { useDisclosure, useResizeObserver } from '@mantine/hooks';
import { useEffect } from 'react';
import classes from './AppWrapper.module.css';
import { Footer } from './Footer';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { TrustedBy } from './TrustedBy';

export function AppWrapper({ children }: React.PropsWithChildren) {
  const [navbarExpanded, { toggle: toggleNavbar, close: collapseNavbar }] = useDisclosure(false);
  const [ref] = useResizeObserver();

  useEffect(() => {
    document.body.classList.toggle('noscroll', navbarExpanded);
  }, [navbarExpanded]);

  return (
    <AppShell
      style={{ '--app-wrapper-footer-height': `${ref.current?.getBoundingClientRect().height || 154}px` }}
      header={{ height: 60 }}
      navbar={{ width: 260, breakpoint: 'sm', collapsed: { mobile: !navbarExpanded } }}
    >
      <Header navbarExpanded={navbarExpanded} toggleNavbar={toggleNavbar} />
      <Navbar onClick={collapseNavbar} />
      <AppShellMain className={classes.main}>
        <div className={classes.content}>
          <Container>{children}</Container>
          <TrustedBy />
        </div>
      </AppShellMain>
      <Footer ref={ref} />
    </AppShell>
  );
}
