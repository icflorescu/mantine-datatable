import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
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
        By default, the DataTable assumes that each record has an <Code>id</Code> property holding a unique value of a
        primitive type (such as a string or a number).
        <br />
        Record IDs are used internally as React keys when rendering rows, and to identify records in features such as{' '}
        <InternalLink to="/examples/records-selection">records selection</InternalLink> and{' '}
        <InternalLink to="/examples/expanding-rows">row expansion</InternalLink> (for instance, the{' '}
        <Code>rowExpansion.expanded.recordIds</Code> array holds the IDs of the expanded records).
      </Txt>
      <Txt>
        If your records use a different unique property, set the <Code>idAccessor</Code> property of the DataTable to
        its name, like so:
      </Txt>
      <CodeBlock code={code['NonStandardRecordIdsStringExample.tsx']} />
      <Txt>The code above will produce the following result:</Txt>
      <NonStandardRecordIdsStringExample />
      <Txt info>
        If the unique value is stored in a nested object, you can use dot notation to point to it, e.g.{' '}
        <Code>{'idAccessor="meta.uuid"'}</Code>.
      </Txt>
      <PageSubtitle value="Using functions to generate composite record IDs" />
      <Txt>
        You can also pass a function that receives a record and returns its ID. This is useful when no single property
        is unique and you need to build a <em>composite</em> ID from several record properties:
      </Txt>
      <CodeBlock code={code['NonStandardRecordIdsFunctionExample.tsx']} />
      <Txt>The code above will produce the following result:</Txt>
      <NonStandardRecordIdsFunctionExample />
      <Txt warning title="Make sure IDs are unique">
        Duplicate record IDs lead to React key collisions and to unpredictable behavior when selecting or expanding
        rows.
      </Txt>
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
