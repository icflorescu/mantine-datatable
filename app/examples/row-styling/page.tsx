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
        You can style individual rows based on their data using the <Code>rowColor</Code>,{' '}
        <Code>rowBackgroundColor</Code>, <Code>rowClassName</Code> and <Code>rowStyle</Code> properties.
        <br />
        They are the row-level counterparts of the <Code>c</Code>, <Code>backgroundColor</Code>, <Code>className</Code>{' '}
        and <Code>style</Code> <InternalLink to="/examples/overriding-the-default-styles">properties</InternalLink> of
        the DataTable component, but they accept functions that receive the current record and its index, so each row
        can be styled differently (<Code>rowClassName</Code> also accepts a plain string).
      </Txt>
      <PageSubtitle value="Using rowColor and rowBackgroundColor" />
      <Txt>
        The <Code>rowColor</Code> and <Code>rowBackgroundColor</Code> properties accept a function that receives the
        current record and its index as arguments and returns either a <Code>MantineColor</Code> (a key of{' '}
        <Code>theme.colors</Code> or any valid CSS color string) to be applied to the row, or an object with{' '}
        <Code>light</Code> and <Code>dark</Code> keys and <Code>MantineColor</Code> values to be applied in light and
        dark color schemes respectively. Return <Code>undefined</Code> to leave a row with its default colors.
      </Txt>
      <RowStylingWithColorPropertiesExample />
      <Txt>Here is the code used to produce the result above:</Txt>
      <CodeBlock code={code['RowStylingWithColorPropertiesExample.tsx']} />
      <PageSubtitle value="Using rowClassName" />
      <Txt>
        The <Code>rowClassName</Code> property accepts either a string, to apply the same class name to every row, or a
        function that receives the current record and its index as arguments and returns the class name to be applied to
        the row (or <Code>undefined</Code> for no extra class).
      </Txt>
      <RowStylingWithClassNameExample />
      <Txt>Here is the code used to produce the result above:</Txt>
      <CodeBlock
        tabs={{ code, keys: ['RowStylingWithClassNameExample.tsx', 'RowStylingWithClassNameExample.module.css'] }}
      />
      <PageSubtitle value="Using rowStyle" />
      <Txt>
        The <Code>rowStyle</Code> property accepts a function that receives the current record and its index as
        arguments and returns either a style object to be applied to the row, or a function that accepts the current
        theme and returns such an object.
      </Txt>
      <RowStylingWithStyleObjectExample />
      <Txt>Here is the code used to produce the result above:</Txt>
      <CodeBlock code={code['RowStylingWithStyleObjectExample.tsx']} />
      <Txt>And here is how you could build the style based on the current theme, by returning a function:</Txt>
      <RowStylingWithStyleFunctionExample />
      <Txt>Here is the code used to produce the result above:</Txt>
      <CodeBlock code={code['RowStylingWithStyleFunctionExample.tsx']} />
      <Txt idea>
        If you need to style individual cells rather than whole rows, have a look at the column{' '}
        <Code>cellsClassName</Code> and <Code>cellsStyle</Code> properties, described in the{' '}
        <InternalLink to="/examples/column-properties-and-styling">column properties and styling</InternalLink> example.
      </Txt>
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
