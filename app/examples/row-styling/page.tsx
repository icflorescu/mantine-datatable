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
import { RowStylingWithClassNameExample } from './RowStylingWithClassNameExample';
import { RowStylingWithColorPropertiesExample } from './RowStylingWithColorPropertiesExample';
import { RowStylingWithStyleFunctionExample } from './RowStylingWithStyleFunctionExample';
import { RowStylingWithStyleObjectExample } from './RowStylingWithStyleObjectExample';

const PATH: Route = '/examples/row-styling';

export const metadata = getRouteMetadata(PATH);

export default async function RowStylingExamplePage() {
  const code = await allPromiseProps({
    'RowStylingWithColorPropertiesExample.tsx': readCodeFile<string>(
      `${PATH}/RowStylingWithColorPropertiesExample.tsx`
    ),
    'RowStylingWithClassNameExample.tsx': readCodeFile<string>(`${PATH}/RowStylingWithClassNameExample.tsx`),
    'RowStylingWithClassNameExample.module.css': readCodeFile<string>(
      `${PATH}/RowStylingWithClassNameExample.module.css`
    ),
    'RowStylingWithStyleObjectExample.tsx': readCodeFile<string>(`${PATH}/RowStylingWithStyleObjectExample.tsx`),
    'RowStylingWithStyleFunctionExample.tsx': readCodeFile<string>(`${PATH}/RowStylingWithStyleFunctionExample.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        You can style individual rows using the <Code>rowColor</Code>, <Code>rowBackgroundColor</Code>,{' '}
        <Code>rowClassName</Code> and <Code>rowStyle</Code> properties.
        <br />
        They work the same way as the <Code>c</Code>, <Code>backgroundColor</Code>, <Code>className</Code> and{' '}
        <Code>style</Code> <InternalLink to="/examples/overriding-the-default-styles">properties</InternalLink> of the
        DataTable component, but target rows instead of the component root.
      </Txt>
      <PageSubtitle value="With color properties" />
      <Txt>
        The <Code>c</Code> and <Code>backgroundColor</Code> properties accept a function that receives the current
        record and its index as arguments and returns either a <Code>MantineColor</Code> to be applied to the row, or an
        object with <Code>light</Code> and <Code>dark</Code> keys and <Code>MantineColor</Code> values to be applied to
        the row in light and dark themes respectively.
      </Txt>
      <RowStylingWithColorPropertiesExample />
      <Txt>Here is the code used to produce the result above:</Txt>
      <CodeBlock code={code['RowStylingWithColorPropertiesExample.tsx']} />
      <PageSubtitle value="Using rowClassName" />
      <Txt>
        The <Code>rowClassName</Code> property accepts a function that receives the current record and its index as
        arguments and returns a string representing the class name to be applied to the row.
      </Txt>
      <RowStylingWithClassNameExample />
      <Txt>Here is the code used to produce the result above:</Txt>
      <CodeBlock
        tabs={{ code, keys: ['RowStylingWithClassNameExample.tsx', 'RowStylingWithClassNameExample.module.css'] }}
      />
      <PageSubtitle value="Using rowStyle" />
      <Txt>
        The <Code>rowStyle</Code> property accepts a function that receives the current record and its index as
        arguments and returns either an object representing the style to be applied to the row, or a function accepting
        the current theme and returning such an object.
      </Txt>
      <RowStylingWithStyleObjectExample />
      <Txt>Here is the code used to produce the result above:</Txt>
      <CodeBlock code={code['RowStylingWithStyleObjectExample.tsx']} />
      <Txt>And here is how you could build a style by returning a function that accepts the current theme:</Txt>
      <RowStylingWithStyleFunctionExample />
      <Txt>Code:</Txt>
      <CodeBlock code={code['RowStylingWithStyleFunctionExample.tsx']} />
      <Txt>Head over to the next example to learn about its basic properties.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
