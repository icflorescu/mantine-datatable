import { Title } from '@mantine/core';
import Head from 'next/head';
import { getPageTitle } from '~/lib/page';

export default function PageTitle({ of }: { of: string }) {
  const title = getPageTitle(of);
  return (
    <>
      <Head>
        <title>{`${title} | Mantine DataTable`}</title>
      </Head>
      <Title
        order={2}
        sx={(theme) => ({
          color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[8],
          fontSize: '1.5rem',
          marginBottom: '1em',
          [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
            fontSize: '1.75rem',
          },
          [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            fontSize: '2rem',
          },
          [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
            marginTop: '1em',
          },
        })}
      >
        {title}
      </Title>
    </>
  );
}
