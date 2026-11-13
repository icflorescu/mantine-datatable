// Import CSS first
import './layout.css';
// Then other packages
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { ContextMenuProvider } from 'mantine-contextmenu';
import type { Metadata, Viewport } from 'next';
import { AppWrapper } from '~/components/AppWrapper';
import { ShikiCodeHighlightProvider } from '~/components/ShikiCodeHighlightProvider';
import { ThemeAttributeSetter } from '~/components/ThemeAttributeSetter';
import { AUTHOR_LINK, AUTHOR_NAME, PRODUCT_DESCRIPTION, PRODUCT_NAME, WEB_ROOT, WEBSITE_LINK } from './config';
import classes from './layout.module.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1a1b1e' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.GITHUB_PAGES === 'TRUE' ? WEB_ROOT : 'http://localhost:3000'),
  manifest: `${process.env.GITHUB_PAGES === 'TRUE' ? WEBSITE_LINK : ''}/manifest.webmanifest`,
  applicationName: PRODUCT_NAME,
  title: PRODUCT_NAME,
  description: PRODUCT_DESCRIPTION,
  authors: [{ name: AUTHOR_NAME, url: AUTHOR_LINK }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  keywords: [
    'mantine',
    'mantine datatable',
    'mantine data table',
    'mantine table',
    'react data table',
    'react data grid',
    'react table component',
    'datagrid',
    'react',
    'typescript',
    'ui component',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
          <ShikiCodeHighlightProvider>
            <ThemeAttributeSetter />
            <Notifications />
            <ModalsProvider>
              <ContextMenuProvider repositionOnRepeat>
                <AppWrapper>{children}</AppWrapper>
              </ContextMenuProvider>
            </ModalsProvider>
          </ShikiCodeHighlightProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
