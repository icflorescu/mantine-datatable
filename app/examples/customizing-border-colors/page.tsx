import { Code } from '@mantine/core';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { CustomizingBorderColorsExample } from './CustomizingBorderColorsExample';

const PATH = '/examples/customizing-border-colors';

export const metadata = getRouteMetadata(PATH);

export default async function CustomizingBorderColorsExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/CustomizingBorderColorsExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        If you’re not happy with the default border colors derived from Mantine’s{' '}
        <ExternalLink to="https://mantine.dev/core/table/">Table</ExternalLink> component, you can customize them using{' '}
        <Code>borderColor</Code> and <Code>rowBorderColor</Code> properties.
      </Txt>
      <Txt>
        The <Code>borderColor</Code> is applied to:
      </Txt>
      <ul>
        <li>
          the table outer border (if enabled by <Code>withTableBorder</Code> property);
        </li>
        <li>header bottom border;</li>
        <li>
          pagination top border (if <InternalLink to="/examples/pagination">pagination is used</InternalLink>).
        </li>
      </ul>
      <Txt>
        The <Code>rowBorderColor</Code> is applied to:
      </Txt>
      <ul>
        <li>the bottom of each row;</li>
        <li>
          the column borders (if enabled by <Code>withColumnBorders</Code> property).
        </li>
      </ul>
      <Txt>For example:</Txt>
      <CodeBlock code={code} />
      <CustomizingBorderColorsExample />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
