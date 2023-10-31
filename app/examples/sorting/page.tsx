import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import SortingExample from './SortingExample';
import SortingExampleCustomIcons from './SortingExampleCustomIcons';

const PATH: Route = '/examples/sorting';

export const metadata = getRouteMetadata(PATH);

export default async function SortingExamplePage() {
  const code = await allPromiseProps({
    'SortingExample.tsx': readCodeFile<string>(`${PATH}/SortingExample.tsx`),
    'SortingExampleCustomIcons.tsx': readCodeFile<string>(`${PATH}/SortingExampleCustomIcons.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <SortingExample />
      <Txt>In order to enable sorting, you’ll have to:</Txt>
      <UnorderedList compact>
        <li>
          add a <Code>sortable: true</Code> property to each sorting candidate column;
        </li>
        <li>
          add a <Code>sortStatus</Code> property to the DataTable component, pointing to an object describing the
          current sort status;
        </li>
        <li>
          add a handler called <Code>onSortStatusChange</Code> to the DataTable to perform the required action when a
          sortable column header is clicked.
        </li>
      </UnorderedList>
      <CodeBlock code={code['SortingExample.tsx']} />
      <Txt idea>
        If you enable sorting, you might want to consider{' '}
        <InternalLink to="/examples/disabling-text-selection">disabling text selection</InternalLink>; otherwise,
        repeatedly clicking on the same column header will naturally result in a text selection on the column title
        text, which may be annoying for some users.
      </Txt>
      <PageSubtitle value="Custom sort icons" />
      <Txt>
        If you want to use custom icons for sorting, you can pass them to the <Code>sortIcons</Code> prop:
      </Txt>
      <CodeBlock code={code['SortingExampleCustomIcons.tsx']} />
      <SortingExampleCustomIcons />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
