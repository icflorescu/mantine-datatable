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
import { UnorderedList } from '~/components/UnorderedList';
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
    noLayers: allPromiseProps({
      'main.tsx': readCodeFile<string>(`${PATH}/examples/no-layers/main.tsx`),
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
        Mantine doesn’t use CSS-in-JS: all <Code>@mantine/*</Code> packages ship native CSS files, which can be imported
        from <Code>@mantine/{'{package}'}/styles.css</Code> or <Code>@mantine/{'{package}'}/styles.layer.css</Code>.
      </Txt>
      <Txt>
        Similarly, {PRODUCT_NAME} ships native CSS files, which can be imported from{' '}
        <Code>{process.env.PACKAGE_NAME}/styles.css</Code> or <Code>{process.env.PACKAGE_NAME}/styles.layer.css</Code>.
      </Txt>
      <Txt warning title="Order matters">
        {PRODUCT_NAME} styles build on top of the <Code>@mantine/core</Code> styles, so they <strong>must</strong> be
        applied <strong>after</strong> them. If they’re not, the table may look broken (for instance, missing borders,
        wrong spacing or misplaced pinned columns).
      </Txt>
      <PageSubtitle value="Importing styles without CSS layers" />
      <Txt>
        If your bundler preserves the order of CSS imports (as <ExternalLink to="https://vite.dev">Vite</ExternalLink>{' '}
        does, for instance), the simplest approach is to import the <Code>styles.css</Code> files in the right order, at
        the root of your application:
      </Txt>
      <CodeBlock tabs={{ code: code.noLayers, keys: ['main.tsx'] }} />
      <PageSubtitle value="Controlling the order of styles with CSS layers" />
      <Txt>
        Some bundlers and frameworks (
        <ExternalLink to="https://github.com/vercel/next.js/issues/16630">including Next.js</ExternalLink>) don’t let
        you control the order in which imported stylesheets are applied.
      </Txt>
      <Txt>
        As the Mantine documentation{' '}
        <ExternalLink to={`${MANTINE_LINK}/styles/mantine-styles/#css-layers`}>suggests</ExternalLink>, you can work
        around this by using{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/CSS/@layer">CSS layers</ExternalLink>.
      </Txt>
      <Txt idea>
        Please keep in mind that:
        <Box component="ul" ml={-20}>
          <li>
            <Code>@mantine/{'{package}'}/styles.layer.css</Code> files place their styles in a layer named{' '}
            <Code>mantine</Code>;
          </li>
          <li>
            <Code>{process.env.PACKAGE_NAME}/styles.layer.css</Code> places its styles in a layer named{' '}
            <Code>{process.env.PACKAGE_NAME}</Code>.
          </li>
        </Box>
      </Txt>
      <Txt>
        For example, in a Next.js application you can ensure the correct order of styles by importing the{' '}
        <Code>styles.layer.css</Code> files and declaring the layer order with the <Code>@layer</Code> directive, like
        so:
      </Txt>
      <CodeBlock tabs={{ code: code.simple, keys: ['RootLayout.tsx', 'layout.css'] }} />
      <Txt>
        Or, if you want even more control over the order of styles, you can use the{' '}
        <ExternalLink to="https://github.com/postcss/postcss-import">
          <Code>postcss-import</Code>
        </ExternalLink>{' '}
        plugin to choose your own layer names when importing the <Code>styles.css</Code> files, and then declare their
        order with the <Code>@layer</Code> directive, like so:
      </Txt>
      <CodeBlock tabs={{ code: code.fineGrained, keys: ['RootLayout.tsx', 'postcss.config.js', 'layout.css'] }} />
      <Txt info>
        Keep in mind that styles which are <strong>not</strong> placed in any layer always take precedence over layered
        styles. This means your own, un-layered CSS will override both Mantine and {PRODUCT_NAME} styles, regardless of
        specificity.
      </Txt>
      <PageSubtitle value="Customizing the look of your tables" />
      <Txt>
        {PRODUCT_NAME} follows the current Mantine theme, so the best way to achieve a consistent look-and-feel is to
        customize the theme you pass to <Code>MantineProvider</Code>. When you need to go further, you can:
      </Txt>
      <UnorderedList compact>
        <li>
          use the <InternalLink to="/examples/basic-table-properties">basic table properties</InternalLink> to control
          borders, spacing, font size, shadow, striping and more;
        </li>
        <li>
          set custom colors, class names or styles, as shown in the{' '}
          <InternalLink to="/examples/overriding-the-default-styles">overriding the default styles</InternalLink>{' '}
          example;
        </li>
        <li>
          style individual <InternalLink to="/examples/column-properties-and-styling">columns</InternalLink> and{' '}
          <InternalLink to="/examples/row-styling">rows</InternalLink>.
        </li>
      </UnorderedList>
      <PageSubtitle value="Migrating from Mantine V6" />
      <Txt idea>
        {PRODUCT_NAME} V7 was a major release with{' '}
        <ExternalLink to={`${REPO_LINK}/blob/main/CHANGELOG.md`}>breaking changes</ExternalLink>, made to support{' '}
        <ExternalLink to="https://v7.mantine.dev">Mantine V7</ExternalLink>, which{' '}
        <ExternalLink to={`${MANTINE_LINK}/changelog/7-0-0/#migration-to-native-css`}>
          migrated to native CSS
        </ExternalLink>
        .
        <br />
        Since then, styling is no longer done with CSS-in-JS (
        <ExternalLink to="https://emotion.sh">Emotion</ExternalLink>
        ), so the <Code>createStyles</Code> function is no longer available, neither to libraries built on top of
        Mantine nor to your own code.
        <br />
        If you’re migrating an application that used {PRODUCT_NAME} with Mantine V6, please read the Mantine{' '}
        <ExternalLink to={`${MANTINE_LINK}/changelog/7-0-0/`}>V7.0</ExternalLink> and{' '}
        <ExternalLink to={`${MANTINE_LINK}/changelog/7-1-0/`}>V7.1</ExternalLink> changelogs to understand the new
        styling approach and how to use CSS layers to control the order of styles in your application.
      </Txt>
      <Txt>
        Now that you understand how styling works, feel free to browse the{' '}
        <InternalLink to={firstExampleHref}>code examples</InternalLink> to see {PRODUCT_NAME} in action and learn how
        to use it, and refer to the <InternalLink to="/type-definitions">type definitions</InternalLink> page for an
        exhaustive list of customizable options.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
