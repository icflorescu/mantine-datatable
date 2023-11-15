import { Box, Code } from '@mantine/core';
import type { Route } from 'next';
import { MANTINE_LINK, PRODUCT_NAME, REPO_LINK } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getFirstExampleRoute, getRouteMetadata } from '~/lib/utils';

const PATH: Route = '/styling';
export const metadata = getRouteMetadata(PATH);

export default async function StylingPage() {
  const code = await allPromiseProps({
    simple: allPromiseProps({
      'RootLayout.tsx': readCodeFile<string>(`${PATH}/examples/simple/RootLayout.tsx`),
      'layout.css': readCodeFile<string>(`${PATH}/examples/simple/layout.css`),
    }),
    fineGrained: allPromiseProps({
      'RootLayout.tsx': readCodeFile<string>(`${PATH}/examples/fine-grained/RootLayout.tsx`),
      'postcss.config.js': readCodeFile<string>(`${PATH}/examples/fine-grained/postcss.config.js`),
      'layout.css': readCodeFile<string>(`${PATH}/examples/fine-grained/layout.css`),
    }),
  });
  const { href: firstExampleHref } = getFirstExampleRoute();

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        {PRODUCT_NAME} V7 is a major release with{' '}
        <ExternalLink to={`${REPO_LINK}/blob/main/CHANGELOG.md`}>breaking changes</ExternalLink> and is compatible with{' '}
        <ExternalLink to={MANTINE_LINK}>Mantine V7</ExternalLink>.
        <br />
        One of the breaking changes in Mantine V7 is the{' '}
        <ExternalLink to={`${MANTINE_LINK}/changelog/7-0-0/#migration-to-native-css`}>
          migration to native CSS
        </ExternalLink>
        .
        <br />
        The styling is no longer done with CSS-in-JS (<ExternalLink to="https://emotion.sh">Emotion</ExternalLink>),
        hence the <Code>createStyles</Code> function is no longer available for use in other libraries built on top of
        it or in your own code.
      </Txt>
      <Txt idea>
        If you have used {PRODUCT_NAME} with Mantine V6 and you’re migrating to V7, please make sure to check out the
        Mantine <ExternalLink to={`${MANTINE_LINK}/changelog/7-0-0/`}>V7.0</ExternalLink> and{' '}
        <ExternalLink to={`${MANTINE_LINK}/changelog/7-1-0/`}>V7.1</ExternalLink> changelogs to understand the new
        styling approach and how you can use CSS layers to control the order of styles in your application.
      </Txt>
      <Txt>
        In V7, all <Code>@mantine/*</Code> packages are shipped with native CSS files which can be imported from{' '}
        <Code>@mantine/{'{package}'}/styles.css</Code> or <Code>@mantine/{'{package}'}/styles.layer.css</Code>.
      </Txt>
      <Txt>
        Similarly, {PRODUCT_NAME} comes with native CSS files which can be imported from{' '}
        <Code>{process.env.PACKAGE_NAME}/styles.css</Code> or <Code>{process.env.PACKAGE_NAME}/styles.layer.css</Code>.
      </Txt>
      <PageSubtitle value="Controlling the order of styles with CSS layers" />
      <Txt>
        Some bundlers and frameworks (
        <ExternalLink to="https://github.com/vercel/next.js/issues/16630">including Next.js</ExternalLink>) do not allow
        you to control the order of stylesheets in your application when importing CSS files.
      </Txt>
      <Txt>
        As Mantine documentation{' '}
        <ExternalLink to={`${MANTINE_LINK}/styles/mantine-styles/#css-layers`}>suggests</ExternalLink>, you can mitigate
        this by making use of{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/CSS/@layer">CSS layers</ExternalLink>.
      </Txt>
      <Txt idea>
        Please keep in mind that:
        <Box component="ul" ml={-20}>
          <li>
            <Code>@mantine/{'{package}'}/styles.layer.css</Code> files will place styles in a layer named{' '}
            <Code>mantine</Code>
          </li>
          <li>
            <Code>{process.env.PACKAGE_NAME}/styles.layer.css</Code> will place styles in a layer called{' '}
            <Code>{process.env.PACKAGE_NAME}</Code>
          </li>
        </Box>
      </Txt>
      <Txt>
        For example, in a Next.js application you could ensure the correct order of styles either by importing the{' '}
        <Code>styles.layer.css</Code> files and using the <Code>@layer</Code> directive, like so:
      </Txt>
      <CodeBlock tabs={{ code: code['simple'], keys: ['RootLayout.tsx', 'layout.css'] }} />
      <Txt>
        Or, if you want to have even more control over the order of styles, you can make use of the{' '}
        <Code>postcss-import</Code> plugin to control the layer names when importing the <Code>styles.css</Code> files,
        and then use the <Code>@layer</Code> directive, like so:
      </Txt>
      <CodeBlock tabs={{ code: code['fineGrained'], keys: ['RootLayout.tsx', 'postcss.config.js', 'layout.css'] }} />
      <Txt>
        Now that you understand how styling works, feel free to browse the{' '}
        <InternalLink to={firstExampleHref}>code examples</InternalLink> to see the DataTable in action and learn how to
        use it, and refer to the <InternalLink to="/type-definitions">type definitions</InternalLink> page for an
        exhaustive list of customizable options.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
