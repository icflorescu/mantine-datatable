import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { BasicUsageExample } from './BasicUsageExample';

const PATH: Route = '/examples/basic-usage';

export const metadata = getRouteMetadata(PATH);

export default async function BasicUsageExamplePage() {
  const code = await allPromiseProps({
    'BasicUsageExample.tsx': readCodeFile<string>(`${PATH}/BasicUsageExample.tsx`),
    'companies.json': readCodeFile<string>('/../data/companies.json'),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        In its most basic usage scenario, the DataTable component only requires <Code>records</Code> and{' '}
        <Code>columns</Code> properties to be set:
      </Txt>
      <CodeBlock tabs={{ code, keys: ['BasicUsageExample.tsx', 'companies.json'] }} />
      <Txt>The code above will produce the following result:</Txt>
      <BasicUsageExample />
      <Txt>
        However, there’s much more you can do with {PRODUCT_NAME}.
        <br />
        Head over to the next example to learn about its basic properties.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
