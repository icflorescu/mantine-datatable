import { Code } from '@mantine/core';
import type { Route } from 'next';
import { MANTINE_LINK, PRODUCT_NAME } from '~/app/config';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { BasicTablePropertiesPageContent } from './BasicTablePropertiesPageContent';

const PATH: Route = '/examples/basic-table-properties';

export const metadata = getRouteMetadata(PATH);

export default async function BasicTablePropertiesExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/BasicTablePropertiesExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        The DataTable component passes most properties of the underlying{' '}
        <ExternalLink to={`${MANTINE_LINK}/core/table/`}>Mantine Table</ExternalLink> component through, and implements
        a number of additional ones. Try customizing some of them interactively below:
      </Txt>
      <BasicTablePropertiesPageContent initialCode={code} />
      <PageSubtitle value="Things to keep in mind" />
      <UnorderedList>
        <li>
          row borders are shown by default; set <Code>withRowBorders={'{false}'}</Code> to hide them;
        </li>
        <li>
          <Code>borderRadius</Code> is meant to round the corners of the outer table border, so it can only be set
          together with <Code>withTableBorder</Code> (TypeScript will complain otherwise);
        </li>
        <li>
          <Code>horizontalSpacing</Code>, <Code>verticalSpacing</Code>, <Code>fz</Code>, <Code>borderRadius</Code> and{' '}
          <Code>shadow</Code> accept a key of the corresponding Mantine theme property (<Code>xs</Code>, <Code>sm</Code>
          , <Code>md</Code>, <Code>lg</Code> or <Code>xl</Code>) as well as any valid CSS value;
        </li>
        <li>
          <Code>verticalAlign</Code> controls the vertical alignment of row cells and defaults to <Code>center</Code>;
          its effect is only visible when some cells span multiple lines (such as the <em>Mission statement</em> column
          above).
        </li>
      </UnorderedList>
      <PageSubtitle value="Other table properties" />
      <Txt>
        Since {PRODUCT_NAME} passes unknown properties down to the Mantine Table component, you can also use other{' '}
        <ExternalLink to={`${MANTINE_LINK}/core/table/?t=props`}>Table properties</ExternalLink>, such as{' '}
        <Code>tabularNums</Code> (which applies <Code>font-variant-numeric: tabular-nums</Code>, so that numbers in
        different rows line up nicely).
      </Txt>
      <Txt>Other examples cover related properties in more detail:</Txt>
      <UnorderedList compact>
        <li>
          <InternalLink to="/examples/overriding-the-default-styles">overriding the default styles</InternalLink>{' '}
          &mdash; text, background, border, striped and hover colors, class names and styles;
        </li>
        <li>
          <InternalLink to="/examples/scrollable-vs-auto-height">scrollable vs. auto-height</InternalLink> &mdash;{' '}
          <Code>height</Code>, <Code>minHeight</Code> and <Code>maxHeight</Code>;
        </li>
        <li>
          <InternalLink to="/examples/disabling-text-selection">disabling text selection</InternalLink> &mdash;{' '}
          <Code>textSelectionDisabled</Code>.
        </li>
      </UnorderedList>
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
