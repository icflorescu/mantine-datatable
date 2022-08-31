import { Title } from '@mantine/core';
import Head from 'next/head';
import { SEO_DEFAULT_DESCRIPTION } from '~/config';
import { getPageMeta } from '~/lib/page';

export default function PageTitle({ of }: { of: string }) {
  const { title, description } = getPageMeta(of);
  const titleWithSuffix = `${title} | Mantine DataTable`;
  return (
    <>
      <Head>
        <title>{titleWithSuffix}</title>
        <meta property="og:title" content={titleWithSuffix} />
        <meta name="description" content={description ?? SEO_DEFAULT_DESCRIPTION} />
        <meta property="og:description" content={description ?? SEO_DEFAULT_DESCRIPTION} />
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
