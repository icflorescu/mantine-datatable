import { Code } from '@mantine/core';
import type { Route } from 'next';
import { MANTINE_LINK, PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getFirstExampleRoute, getRouteMetadata } from '~/lib/utils';
import { GettingStartedExample } from './examples/GettingStartedExample';

const PATH: Route = '/getting-started';

export const metadata = getRouteMetadata(PATH);

export default async function GettingStartedPage() {
  const code = await allPromiseProps({
    'RootLayout.tsx': readCodeFile<string>(`${PATH}/examples/RootLayout.tsx`),
    'layout.css': readCodeFile<string>(`${PATH}/examples/layout.css`),
    'GettingStartedExample.tsx': readCodeFile<string>(`${PATH}/examples/GettingStartedExample.tsx`),
  });

  const { href: firstExampleHref } = getFirstExampleRoute();

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        {PRODUCT_NAME} is built on top of <ExternalLink to={MANTINE_LINK}>Mantine</ExternalLink> and has no dependencies
        of its own. Its peer dependencies are <Code>@mantine/core</Code> and <Code>@mantine/hooks</Code> (version 9 or
        newer), <Code>react</Code> and <Code>react-dom</Code> (version 19 or newer), and <Code>clsx</Code> (version 2 or
        newer).
      </Txt>
      <Txt info title="Using an older Mantine version?">
        The major version of {PRODUCT_NAME} follows the major version of Mantine it supports. The current version is
        built for Mantine 9; if your application uses Mantine 8 or 7, install the matching major version of{' '}
        {PRODUCT_NAME} (for example, <Code>{process.env.PACKAGE_NAME}@8</Code>). If you’re still on Mantine 6, see the{' '}
        <InternalLink to="/mantine-v6-support">Mantine V6 support</InternalLink> page.
      </Txt>
      <Txt>
        Start by creating an{' '}
        <ExternalLink to={`${MANTINE_LINK}/getting-started/`}>application with Mantine</ExternalLink>, then install{' '}
        <Code>{process.env.PACKAGE_NAME}</Code> along with <Code>clsx</Code>:
      </Txt>
      <CodeBlock
        tabs={[
          {
            language: 'shell',
            fileName: 'yarn',
            code: `yarn add ${process.env.PACKAGE_NAME} clsx`,
          },
          { language: 'shell', fileName: 'npm', code: `npm i ${process.env.PACKAGE_NAME} clsx` },
          { language: 'shell', fileName: 'pnpm', code: `pnpm i ${process.env.PACKAGE_NAME} clsx` },
        ]}
      />
      <Txt>
        Next, import the necessary CSS files and make sure the styles are applied <strong>in the correct order</strong>.
      </Txt>
      <Txt warning title="Very important">
        The <Code>@mantine/core</Code> styles must be applied before the {PRODUCT_NAME} styles.
        <br />
        Make sure you read and <strong>understand</strong> the information in the{' '}
        <InternalLink to="/styling">styling guide</InternalLink> before jumping into examples or starting your own
        project.
      </Txt>
      <Txt>
        For example, if you’re using a <ExternalLink to={`${MANTINE_LINK}/guides/next/`}>Next.js</ExternalLink>{' '}
        application with the app router, your root <Code>layout.tsx</Code> could look like this:
      </Txt>
      <CodeBlock tabs={{ code, keys: ['RootLayout.tsx', 'layout.css'] }} />
      <Txt>Then you can import the component and use it in your application like so:</Txt>
      <CodeBlock code={code['GettingStartedExample.tsx']} />
      <Txt info>
        This example uses <ExternalLink to={`${MANTINE_LINK}/x/notifications/`}>Mantine Notifications</ExternalLink> to
        react to row clicks. The <Code>@mantine/notifications</Code> package is <strong>not</strong> required by{' '}
        {PRODUCT_NAME}; install and set it up separately if you want to run the code as-is.
      </Txt>
      <Txt>The above code will produce the following result:</Txt>
      <GettingStartedExample />
      <Txt>
        Note that <Code>DataTable</Code> is a generic component: the type of the records is inferred from the{' '}
        <Code>records</Code> property, so callbacks such as <Code>render</Code> or <Code>onRowClick</Code> are fully
        typed and column <Code>accessor</Code> values are autocompleted, without any extra effort on your part.
      </Txt>
      <Txt>
        Before browsing the <InternalLink to={firstExampleHref}>usage examples</InternalLink> and the{' '}
        <InternalLink to="/type-definitions">type definitions</InternalLink>, make sure you have a good understanding of
        how <InternalLink to="/styling">styling</InternalLink> works.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
