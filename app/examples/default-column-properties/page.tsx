import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { DefaultColumnPropertiesExample } from './DefaultColumnPropertiesExample';

const PATH: Route = '/examples/default-column-properties';

export const metadata = getRouteMetadata(PATH);

export default async function DefaultColumnPropertiesExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/DefaultColumnPropertiesExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        If you find yourself repeating the same properties over and over again for multiple columns, you can use the{' '}
        <Code>defaultColumnProps</Code> DataTable prop to set them once and use them as a fallback for all columns.
      </Txt>
      <Txt>
        <Code>defaultColumnProps</Code> accepts the same properties as a{' '}
        <InternalLink to="/examples/column-properties-and-styling">column definition</InternalLink>, except for{' '}
        <Code>accessor</Code>, <Code>hidden</Code>, <Code>visibleMediaQuery</Code> and <Code>render</Code> (for the
        latter, see the <InternalLink to="/examples/default-column-render">default column render</InternalLink>{' '}
        example). The default properties are shallow-merged with each column’s own properties, so a property set on a
        column always takes precedence over its default value.
      </Txt>
      <Txt>
        In the example below, all columns are right-aligned, truncated with an ellipsis and styled the same way by
        default, but the first column overrides the default alignment:
      </Txt>
      <DefaultColumnPropertiesExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code} />
      <Txt warning>
        Properties that enable stateful column features &mdash; <Code>toggleable</Code>, <Code>defaultToggle</Code>,{' '}
        <Code>resizable</Code>, <Code>pinned</Code> and <Code>pinnable</Code> &mdash; are read from the column
        definitions themselves, so set them on each column rather than in <Code>defaultColumnProps</Code>. If you want
        to avoid repetition, spread a shared object into each column definition instead, as shown in the{' '}
        <InternalLink to="/examples/column-resizing">column resizing</InternalLink> example.
      </Txt>
      <Txt>
        If you need a fallback for the <Code>render</Code> function, head over to the next example to learn about{' '}
        <Code>defaultColumnRender</Code>.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
