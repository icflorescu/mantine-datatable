import { Title } from '@mantine/core';
import Head from 'next/head';
import { SEO_DEFAULT_DESCRIPTION } from '~/config';
import { getPageMeta } from '~/lib/page';

export default function PageTitle({ of }: { of: string }) {
  const { title, description } = getPageMeta(of);
  const titleWithSuffix = `${title} | Mantine DataTable`;
  const descriptionContent = description ?? SEO_DEFAULT_DESCRIPTION;
  return (
    <>
      <Head>
        <title>{titleWithSuffix}</title>
        <meta property="og:title" content={titleWithSuffix} />
        <meta name="twitter:title" content={titleWithSuffix} />
        <meta name="description" content={descriptionContent} />
        <meta property="og:description" content={descriptionContent} />
        <meta name="twitter:description" content={descriptionContent} />
      </Head>
      <Title
        order={2}
        sx={(theme) => ({
          color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[8],
          fontSize: '1.5rem',
          marginBottom: '1em',
          [`@media (min-width: ${theme.breakpoints.sm})`]: {
            fontSize: '1.75rem',
          },
          [`@media (min-width: ${theme.breakpoints.md})`]: {
            fontSize: '2rem',
          },
          [`@media (min-width: ${theme.breakpoints.lg})`]: {
            fontSize: '2.25rem',
            marginTop: '1em',
          },
        })}
      >
        {title}
      </Title>
    </>
  );
}
