import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import AppWrapper from '~/components/AppWrapper';

export default function _App(props: AppProps) {
  const { Component, pageProps } = props;

  const queryClient = new QueryClient();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <>
      <Head>
        <title>Mantine DataTable</title>
        <meta name="description" content="DataTable component for building data-rich applications" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme,
              components: {
                Code: {
                  styles: (theme) => ({
                    root: {
                      border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
                    },
                  }),
                },
                Prism: {
                  styles: (theme) => ({
                    root: {
                      border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
                      '&&': { borderRadius: 0 },
                    },
                  }),
                },
              },
            }}
          >
            <AppWrapper>
              <Component {...pageProps} />
            </AppWrapper>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
}
