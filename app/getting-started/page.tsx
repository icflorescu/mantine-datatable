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
        {PRODUCT_NAME} depends on <Code>@mantine/core</Code>, <Code>@mantine/hooks</Code> and <Code>clsx</Code>.
      </Txt>
      <Txt>
        Create a new <ExternalLink to={`${MANTINE_LINK}/getting-started/`}>application with Mantine</ExternalLink>,
        install <Code>{process.env.PACKAGE_NAME}</Code> and make sure you have the <Code>clsx</Code> dependency
        installed as well:
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
        Don’t forget to import the necessary CSS files and apply the styles <strong>in the correct order</strong>.
      </Txt>
      <Txt warning title="Very important">
        The <Code>@mantine/core</Code> package styles must be applied before {PRODUCT_NAME} styles.
        <br />
        Make sure to go through and <strong>understand</strong> the information in the{' '}
        <InternalLink to="/styling">styling guide</InternalLink> before jumping into examples or starting your own
        project.
      </Txt>
      <Txt>
        For example, if you’re using a <ExternalLink to={`${MANTINE_LINK}/guides/next/`}></ExternalLink>Next.js
        application with an app router, your <Code>layout.tsx</Code> could look like this:
      </Txt>
      <CodeBlock tabs={{ code, keys: ['RootLayout.tsx', 'layout.css'] }} />
      <Txt>Then you can import the component and use it in your application like so:</Txt>
      <CodeBlock code={code['GettingStartedExample.tsx']} />
      <Txt>The above code will produce the following result:</Txt>
      <GettingStartedExample />
      <Txt>
        Next, let’s make sure you have a good understanding of how <InternalLink to="/styling">styling</InternalLink>{' '}
        works before browsing the <InternalLink to={firstExampleHref}>usage examples</InternalLink> and taking a look at
        the <InternalLink to="/type-definitions">type definitions</InternalLink> page.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
