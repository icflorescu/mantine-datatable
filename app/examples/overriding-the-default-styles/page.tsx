import { Box, Code } from '@mantine/core';
import type { Route } from 'next';
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
import { CssVariablesExample } from './CssVariablesExample';
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
    'CssVariablesExample.tsx': readCodeFile<string>(`${PATH}/CssVariablesExample.tsx`),
    'CssVariablesExample.module.css': readCodeFile<string>(`${PATH}/CssVariablesExample.module.css`),
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
        The quickest way to customize the default colors is to use the <Code>c</Code>, <Code>backgroundColor</Code>,{' '}
        <Code>borderColor</Code>, <Code>rowBorderColor</Code>, <Code>stripedColor</Code> and{' '}
        <Code>highlightOnHoverColor</Code> properties.
        <br />
        Each of them accepts either a <Code>MantineColor</Code> (a key of <Code>theme.colors</Code> or any valid CSS
        color <Code>string</Code>), or an object with <Code>light</Code> and <Code>dark</Code> keys and{' '}
        <Code>MantineColor</Code> values, to be used for the light and dark color schemes respectively.
      </Txt>
      <Txt>
        The <Code>c</Code> property sets the text color and is applied to:
      </Txt>
      <UnorderedList compact>
        <li>the table body, header and footer;</li>
        <li>
          the <InternalLink to="/examples/pagination">pagination</InternalLink> text and page buttons (if present).
        </li>
      </UnorderedList>
      <Txt>
        The <Code>backgroundColor</Code> property is applied to:
      </Txt>
      <UnorderedList compact>
        <li>the table body, header and footer;</li>
        <li>
          the <InternalLink to="/examples/pagination">pagination</InternalLink> area (if present).
        </li>
      </UnorderedList>
      <Txt>
        The <Code>borderColor</Code> property is applied to:
      </Txt>
      <UnorderedList compact>
        <li>
          the table outer border (if enabled by the{' '}
          <InternalLink to="/examples/basic-table-properties">
            <Code>withTableBorder</Code> property
          </InternalLink>
          );
        </li>
        <li>the header bottom border;</li>
        <li>
          the footer top border (see{' '}
          <InternalLink to="/examples/column-properties-and-styling" scrollTo="Column footers">
            column footers
          </InternalLink>
          );
        </li>
        <li>
          the <InternalLink to="/examples/pagination">pagination</InternalLink> top border and page button borders (if
          present).
        </li>
      </UnorderedList>
      <Txt>
        The <Code>rowBorderColor</Code> property defaults to the <Code>borderColor</Code> value and is applied to:
      </Txt>
      <UnorderedList compact>
        <li>the bottom border of each row;</li>
        <li>
          the column borders (if enabled by the{' '}
          <InternalLink to="/examples/basic-table-properties">
            <Code>withColumnBorders</Code> property
          </InternalLink>
          ).
        </li>
      </UnorderedList>
      <Txt>
        The <Code>stripedColor</Code> property sets the background color of odd rows when the <Code>striped</Code>{' '}
        property is enabled, while <Code>highlightOnHoverColor</Code> sets the background color of the row under the
        mouse cursor when the <Code>highlightOnHover</Code> property is enabled (see{' '}
        <InternalLink to="/examples/basic-table-properties">basic table properties</InternalLink>).
      </Txt>
      <Txt>
        If you’re using <InternalLink to="/examples/pagination">pagination</InternalLink>, you can also customize the
        colors of the active page button with the <Code>paginationActiveTextColor</Code> and{' '}
        <Code>paginationActiveBackgroundColor</Code> properties.
      </Txt>
      <Txt>For example, this code:</Txt>
      <CodeBlock code={code['ColorsExample.tsx']} />
      <Txt>…will produce the following table (hover over the rows to see the highlight color):</Txt>
      <ColorsExample />
      <Txt idea title="Styling individual rows">
        If you need to set the text or background color of individual rows based on their data, have a look at the{' '}
        <Code>rowColor</Code> and <Code>rowBackgroundColor</Code> properties described in the{' '}
        <InternalLink to="/examples/row-styling">row styling</InternalLink> example.
      </Txt>
      <PageSubtitle value="With CSS variables" />
      <Txt>
        Under the hood, the color properties above are implemented with CSS variables defined on the component root (the
        element with the <Code>mantine-datatable</Code> class). You can override these variables in your own CSS, which
        also gives you access to colors that don’t have a dedicated property, such as the background color of selected
        rows:
      </Txt>
      <UnorderedList compact>
        <li>
          <Code>--mantine-datatable-color</Code>
        </li>
        <li>
          <Code>--mantine-datatable-background-color</Code>
        </li>
        <li>
          <Code>--mantine-datatable-border-color</Code>
        </li>
        <li>
          <Code>--mantine-datatable-row-border-color</Code>
        </li>
        <li>
          <Code>--mantine-datatable-striped-color</Code>
        </li>
        <li>
          <Code>--mantine-datatable-highlight-on-hover-color</Code>
        </li>
        <li>
          <Code>--mantine-datatable-selection-color</Code> (background color of{' '}
          <InternalLink to="/examples/records-selection">selected rows</InternalLink>, defaults to{' '}
          <Code>--mantine-primary-color-light</Code>)
        </li>
      </UnorderedList>
      <Txt>
        In the example below, a <Code>className</Code> is used to change the colors of the selected and hovered rows:
      </Txt>
      <CssVariablesExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock tabs={{ code, keys: ['CssVariablesExample.tsx', 'CssVariablesExample.module.css'] }} />
      <Txt warning title="Mind the CSS order">
        Your overrides have the same specificity as the {PRODUCT_NAME} rules defining these variables, so they only take
        effect if your styles are loaded after the {PRODUCT_NAME} ones (or if the {PRODUCT_NAME} styles are placed in a
        CSS layer). See the <InternalLink to="/styling">styling guide</InternalLink> for details.
      </Txt>
      <Txt>
        Besides its <InternalLink to="/examples/basic-table-properties">basic properties</InternalLink> and the
        aforementioned colors, there are several more elaborate ways to change (or completely override) the default
        styling of {PRODUCT_NAME}.
      </Txt>
      <PageSubtitle value="With className" />
      <Txt>
        You can pass a <Code>className</Code> that will be applied to the DataTable component root:
      </Txt>
      <StylingWithClassNameExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock tabs={{ code, keys: ['StylingWithClassNameExample.tsx', 'StylingWithClassNameExample.module.css'] }} />
      <PageSubtitle value="With a style object or function" />
      <Txt>
        You can style the DataTable component root with a <Code>style</Code> object:
      </Txt>
      <StylingWithStyleObjectExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['StylingWithStyleObjectExample.tsx']} />
      <Txt>
        The <Code>style</Code> property also accepts a function that receives the current theme as its argument and
        returns a style object:
      </Txt>
      <StylingWithStyleFunctionExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['StylingWithStyleFunctionExample.tsx']} />
      <PageSubtitle value="With multiple class names" />
      <Txt>
        You can target the component root, table, header, footer and pagination individually by passing an object with{' '}
        <Code>root</Code>, <Code>table</Code>, <Code>header</Code>, <Code>footer</Code> and <Code>pagination</Code> keys
        to the <Code>classNames</Code> property:
      </Txt>
      <StylingWithClassNamesExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock
        tabs={{ code, keys: ['StylingWithClassNamesExample.tsx', 'StylingWithClassNamesExample.module.css'] }}
      />
      <PageSubtitle value="With multiple style objects or functions" />
      <Txt>
        Similarly, the <Code>styles</Code> property accepts an object with the same keys and style objects (or functions
        receiving the current theme and returning style objects) as values:
      </Txt>
      <StylingWithStyleObjectsAndFunctionsExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['StylingWithStyleObjectsAndFunctionsExample.tsx']} />
      <PageSubtitle value="With global class names" />
      <Txt>
        Finally, {PRODUCT_NAME} elements have static class names you can target in your global stylesheets, such as{' '}
        <Code>mantine-datatable</Code> (the root), <Code>mantine-datatable-table</Code>,{' '}
        <Code>mantine-datatable-header</Code>, <Code>mantine-datatable-row</Code>, <Code>mantine-datatable-footer</Code>{' '}
        and <Code>mantine-datatable-pagination</Code>. Prefer the approaches above when possible, though: they are
        scoped to a single table and less likely to be affected by changes in the component’s internal structure.
      </Txt>
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
