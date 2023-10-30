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
        If you find yourself repeating the same properties over and over again for multiple columns, you can use{' '}
        <Code>defaultColumnProps</Code> (which accepts a subset of{' '}
        <InternalLink to="/examples/column-properties-and-styling">column properties</InternalLink>) to set them once
        and use as a fallback for all columns.
      </Txt>
      <DefaultColumnPropertiesExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code} />
      <Txt>
        In certain scenarios, you can also use a render fallback function. Head over to the next example to learn more.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
