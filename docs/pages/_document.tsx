import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          {process.env.CANONICAL_URL && <link rel="canonical" href={process.env.CANONICAL_URL} />}
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
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
