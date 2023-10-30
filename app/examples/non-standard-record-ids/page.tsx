import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { NonStandardRecordIdsFunctionExample } from './NonStandardRecordIdsFunctionExample';
import { NonStandardRecordIdsStringExample } from './NonStandardRecordIdsStringExample';

const PATH: Route = '/examples/non-standard-record-ids';

export const metadata = getRouteMetadata(PATH);

export default async function NonStandardRecordIdsExamplePage() {
  const code = await allPromiseProps({
    'NonStandardRecordIdsStringExample.tsx': readCodeFile<string>(`${PATH}/NonStandardRecordIdsStringExample.tsx`),
    'NonStandardRecordIdsFunctionExample.tsx': readCodeFile<string>(`${PATH}/NonStandardRecordIdsFunctionExample.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        By default, the DataTable will assume each record to have a property called <Code>id</Code>, holding a unique
        value of a primitive data type.
        <br />
        The record IDs are used internally as <Code>.map()</Code> keys and to compare records when necessary.
      </Txt>
      <Txt>
        You can override the default ID property name by adding an <Code>idAccessor</Code> property on the DataTable,
        like so:
      </Txt>
      <CodeBlock code={code['NonStandardRecordIdsStringExample.tsx']} />
      <Txt>The code above will produce the following result:</Txt>
      <NonStandardRecordIdsStringExample />
      <PageSubtitle value="Using functions to generate composite record IDs" />
      <Txt>
        You can also use a function to generate record IDs. This is useful for composite IDs, for example, when you need
        to generate a unique ID based on multiple record properties:
      </Txt>
      <CodeBlock code={code['NonStandardRecordIdsFunctionExample.tsx']} />
      <Txt>The code above will produce the following result:</Txt>
      <NonStandardRecordIdsFunctionExample />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
