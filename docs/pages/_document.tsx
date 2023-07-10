import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { DOCSEARCH_APP_ID, SEO_CREATOR, SEO_DEFAULT_DESCRIPTION, SEO_DEFAULT_TITLE } from '~/config';

const getInitialProps = createGetInitialProps();

export default class CustomDocument extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head>
          {process.env.CANONICAL_URL && (
            <>
              <link rel="canonical" href={process.env.CANONICAL_URL} />
              <meta property="og:url" content={process.env.CANONICAL_URL} />
              <meta property="og:image" content={`${process.env.CANONICAL_URL}mantine-datatable-repo.png`} />
              <meta property="og:image:alt" content={SEO_DEFAULT_DESCRIPTION} />
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:url" content={process.env.CANONICAL_URL} />
              <meta name="twitter:image" content={`${process.env.CANONICAL_URL}mantine-datatable-repo.png`} />
              <meta name="twitter:creator" content={SEO_CREATOR} />
            </>
          )}
          <meta property="og:site_name" content={SEO_DEFAULT_TITLE} />
          <meta property="og:type" content="object" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=BenchNine:wght@400&display=swap&text=MantineDTbl"
            rel="stylesheet"
          />
          <link rel="apple-touch-icon" sizes="180x180" href={`${process.env.BASE_PATH}/apple-touch-icon.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`${process.env.BASE_PATH}/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`${process.env.BASE_PATH}/favicon-16x16.png`} />
          <link rel="manifest" href={`${process.env.BASE_PATH}/site.webmanifest`} />
          <link rel="mask-icon" href={`${process.env.BASE_PATH}/safari-pinned-tab.svg`} color="#5bbad5" />
          <link rel="preconnect" href={`https://${DOCSEARCH_APP_ID}-dsn.algolia.net`} crossOrigin="anonymous" />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="theme-color" content="#1971c2" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
