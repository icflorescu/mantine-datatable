import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { ContextMenuProvider } from 'mantine-contextmenu';
import type { Metadata } from 'next';
import { AppWrapper } from '~/components/AppWrapper';
import { ThemeAttributeSetter } from '~/components/ThemeAttributeSetter';
import { AUTHOR_LINK, AUTHOR_NAME, PRODUCT_NAME, WEBSITE_LINK } from './config';
import './layout.css';
import classes from './layout.module.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.GITHUB_PAGES === 'TRUE' ? 'https://icflorescu.github.io' : 'http://localhost:3000'),
  alternates: { canonical: process.env.GITHUB_PAGES === 'TRUE' ? `/${process.env.PACKAGE_NAME}/` : '/' },
  manifest: `${process.env.GITHUB_PAGES === 'TRUE' ? WEBSITE_LINK : ''}/manifest.webmanifest`,
  title: `${PRODUCT_NAME}: enhance your users’ experience`,
  description:
    'Design your Mantine applications for productivity and meet your users’ expectations by enhancing your UIs with desktop-grade context menus',
  authors: [{ name: AUTHOR_NAME, url: AUTHOR_LINK }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider
          defaultColorScheme="auto"
          theme={{
            components: {
              Button: { classNames: { label: classes.buttonLabel } },
              Code: { classNames: { root: classes.codeRoot } },
              CodeHighlight: { classNames: { root: classes.codeBlockBox } },
              CodeHighlightTabs: { classNames: { root: classes.codeBlockBox } },
            },
          }}
        >
          <ThemeAttributeSetter />
          <Notifications />
          <ModalsProvider>
            <ContextMenuProvider>
              <AppWrapper>{children}</AppWrapper>
            </ContextMenuProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
