import { Box, Code } from '@mantine/core';
import { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { ColorsExample } from './ColorsExample';
import { StylingWithClassNameExample } from './StylingWithClassNameExample';
import { StylingWithClassNamesExample } from './StylingWithClassNamesExample';
import { StylingWithStyleFunctionExample } from './StylingWithStyleFunctionExample';
import { StylingWithStyleObjectExample } from './StylingWithStyleObjectExample';
import { StylingWithStyleObjectsAndFunctionsExample } from './StylingWithStyleObjectsAndFunctionsExample';

const PATH: Route = '/examples/overriding-the-default-styles';

export const metadata = getRouteMetadata(PATH);

export default async function OverridingTheDefaultStylesExamplePage() {
  const code = await allPromiseProps({
    'ColorsExample.tsx': readCodeFile<string>(`${PATH}/ColorsExample.tsx`),
    'StylingWithClassNameExample.tsx': readCodeFile<string>(`${PATH}/StylingWithClassNameExample.tsx`),
    'StylingWithStyleObjectExample.tsx': readCodeFile<string>(`${PATH}/StylingWithStyleObjectExample.tsx`),
    'StylingWithStyleFunctionExample.tsx': readCodeFile<string>(`${PATH}/StylingWithStyleFunctionExample.tsx`),
    'StylingWithClassNameExample.module.css': readCodeFile<string>(`${PATH}/StylingWithClassNameExample.module.css`),
    'StylingWithClassNamesExample.tsx': readCodeFile<string>(`${PATH}/StylingWithClassNamesExample.tsx`),
    'StylingWithClassNamesExample.module.css': readCodeFile<string>(`${PATH}/StylingWithClassNamesExample.module.css`),
    'StylingWithStyleObjectsAndFunctionsExample.tsx': readCodeFile<string>(
      `${PATH}/StylingWithStyleObjectsAndFunctionsExample.tsx`
    ),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        {PRODUCT_NAME} closely follows the current Mantine theme, so it should look great out of the box in most cases.
      </Txt>
      <Txt warning title="Keep in mind">
        <Box mb="sm">
          If you want to customize your application’s look-and-feel and keep a consistent design across all areas of the
          screen, you should do so by providing a custom theme to the top-level <Code>MantineProvider</Code> wrapper
          instead of overriding individual component styles.
        </Box>
        <div>You will achieve a better result with less effort and your code will be easier to maintain.</div>
      </Txt>
      <Txt>
        However, if you’re not happy with the default {PRODUCT_NAME} styling, there are several ways to override it.
      </Txt>
      <PageSubtitle value="With color properties" />
      <Txt>
        You can quickly customize the default colors using the <Code>c</Code>, <Code>backgroundColor</Code>,{' '}
        <Code>borderColor</Code> and <Code>rowBorderColor</Code> properties.
        <br />
        Each of these properties can be set to a <Code>MantineColor</Code> (key of <Code>theme.colors</Code> or any
        valid CSS color <Code>string</Code>) or an object with <Code>dark</Code> and <Code>light</Code> keys and{' '}
        <Code>MantineColor</Code> values, which will be used to style dark and light themes accordingly.
      </Txt>
      <Txt>
        The <Code>c</Code> property refers to the text color and is applied to:
      </Txt>
      <UnorderedList compact>
        <li>the table body, header and footer;</li>
        <li>
          the <InternalLink to="/examples/pagination">pagination</InternalLink> component (if present).
        </li>
      </UnorderedList>
      <Txt>
        The <Code>backgroundColor</Code> is applied to:
      </Txt>
      <UnorderedList compact>
        <li>the table body, header and footer;</li>
        <li>
          the <InternalLink to="/examples/pagination">pagination</InternalLink> component (if present).
        </li>
      </UnorderedList>
      <Txt>
        The <Code>borderColor</Code> is applied to:
      </Txt>
      <UnorderedList compact>
        <li>
          the table outer border (if enabled by{' '}
          <InternalLink to="/examples/basic-table-properties">
            <Code>withTableBorder</Code> property
          </InternalLink>
          );
        </li>
        <li>header bottom border;</li>
        <li>
          footer top border (see{' '}
          <InternalLink to="/examples/column-properties-and-styling" scrollTo="Column footers">
            column footers
          </InternalLink>
          );
        </li>
        <li>
          <InternalLink to="/examples/pagination">pagination</InternalLink> top border (if present).
        </li>
      </UnorderedList>
      <Txt>
        The <Code>rowBorderColor</Code> is applied to:
      </Txt>
      <UnorderedList compact>
        <li>the bottom of each row;</li>
        <li>
          the column borders (if enabled by{' '}
          <InternalLink to="/examples/basic-table-properties">
            <Code>withTableBorder</Code> property
          </InternalLink>
          ).
        </li>
      </UnorderedList>
      <Txt>
        If you’re using <InternalLink to="/examples/pagination">pagination</InternalLink>, you can also customize its
        colors using the <Code>paginationTextColor</Code> and <Code>paginationActiveTextColor</Code> properties.
      </Txt>
      <Txt>For example, this code:</Txt>
      <CodeBlock code={code['ColorsExample.tsx']} />
      <Txt>…will produce the following table:</Txt>
      <ColorsExample />
      <Txt>
        There are even more elaborate ways to destroy the default styling of {PRODUCT_NAME} besides setting its{' '}
        <InternalLink to="/examples/basic-table-properties">basic properties</InternalLink> and the aforementioned
        colors.
      </Txt>
      <PageSubtitle value="With className" />
      <Txt>
        You can specify a <Code>className</Code> that will target the DataTable component root:
      </Txt>
      <StylingWithClassNameExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock tabs={{ code, keys: ['StylingWithClassNameExample.tsx', 'StylingWithClassNameExample.module.css'] }} />
      <PageSubtitle value="With a style object or function" />
      <Txt>
        You can target the DataTable component root with a <Code>style</Code> object:
      </Txt>
      <StylingWithStyleObjectExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['StylingWithStyleObjectExample.tsx']} />
      <Txt>
        The <Code>style</Code> property also accepts a function that receives the current theme as argument and returns
        a style object:
      </Txt>
      <StylingWithStyleFunctionExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['StylingWithStyleFunctionExample.tsx']} />
      <PageSubtitle value="With multiple class names" />
      <Txt>
        You can specifically target the component root, table, header, footer and pagination with different{' '}
        <Code>classNames</Code>:
      </Txt>
      <StylingWithClassNamesExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock
        tabs={{ code, keys: ['StylingWithClassNamesExample.tsx', 'StylingWithClassNamesExample.module.css'] }}
      />
      <PageSubtitle value="With multiple style objects or functions" />
      <Txt>
        You can specifically target the component root, table, header, footer and pagination with different{' '}
        <Code>styles</Code> objects or functions:
      </Txt>
      <StylingWithStyleObjectsAndFunctionsExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['StylingWithStyleObjectsAndFunctionsExample.tsx']} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
