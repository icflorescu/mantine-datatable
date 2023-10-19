import { Code } from '@mantine/core';
import { MANTINE_LINK, PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getFirstExampleRoute, getRouteMetadata } from '~/lib/utils';
import { SimpleExample } from './examples/SimpleExample';

const PATH = '/getting-started';

export const metadata = getRouteMetadata(PATH);

export default async function GettingStartedPage() {
  const code = await allPromiseProps({
    'RootLayout.tsx': readCodeFile<string>(`${PATH}/examples/RootLayout.tsx`),
    'layout.css': readCodeFile<string>(`${PATH}/examples/layout.css`),
    'SimpleExample.tsx': readCodeFile<string>(`${PATH}/examples/SimpleExample.tsx`),
  });

  const { href: firstExampleHref } = getFirstExampleRoute();

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        {PRODUCT_NAME} depends on <Code>@mantine/core</Code>, <Code>@mantine/hooks</Code> and <Code>clsx</Code>.
      </Txt>
      <Txt>
        Create a new <ExternalLink to={`${MANTINE_LINK}/getting-started/`}>application with Mantine</ExternalLink> and
        install the package:
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
        Wrap your application in a <Code>ContextMenuProvider</Code> <strong>inside</strong> the{' '}
        <Code>MantineProvider</Code> and don’t forget to import the necessary CSS files{' '}
        <strong>in the correct order</strong>.
      </Txt>
      <Txt idea>
        The <Code>@mantine/core</Code> package styles must be applied before {PRODUCT_NAME} styles.
      </Txt>
      <Txt>
        For example, if you’re using a <ExternalLink to={`${MANTINE_LINK}/guides/next/`}></ExternalLink>Next.js
        application with an app router, your <Code>layout.tsx</Code> could look like this:
      </Txt>
      <CodeBlock tabs={{ code, keys: ['RootLayout.tsx', 'layout.css'] }} />
      <PageSubtitle value="Use the hook in your code" />
      <Txt>
        Import the <Code>useContextMenu</Code> hook and use it in your components like so:
      </Txt>
      <CodeBlock code={code['SimpleExample.tsx']} />
      <Txt>
        The above code will produce the following result &mdash; right-click on the image (or long-tap on mobile
        devices) to trigger the context menu:
      </Txt>
      <SimpleExample />
      <Txt>
        Next, let’s make sure you have a good understanding of how <InternalLink to="/styling">styling</InternalLink>{' '}
        works before browsing the <InternalLink to={firstExampleHref}>usage examples</InternalLink> and taking a look at
        the <InternalLink to="/type-definitions">type definitions</InternalLink> page.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
