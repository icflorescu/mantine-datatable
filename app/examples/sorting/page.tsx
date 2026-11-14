import { Code } from '@mantine/core';
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
import SortingExample from './SortingExample';
import SortingExampleCustomIcons from './SortingExampleCustomIcons';
import SortingExampleSortKey from './SortingExampleSortKey';

const PATH: Route = '/examples/sorting';

export const metadata = getRouteMetadata(PATH);

export default async function SortingExamplePage() {
  const code = await allPromiseProps({
    'SortingExample.tsx': readCodeFile<string>(`${PATH}/SortingExample.tsx`),
    'SortingExampleCustomIcons.tsx': readCodeFile<string>(`${PATH}/SortingExampleCustomIcons.tsx`),
    'SortingExampleSortKey.tsx': readCodeFile<string>(`${PATH}/SortingExampleSortKey.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <SortingExample />
      <Txt>To enable sorting, you’ll have to:</Txt>
      <UnorderedList compact>
        <li>
          add a <Code>sortable: true</Code> property to each column that should be sortable;
        </li>
        <li>
          set the DataTable <Code>sortStatus</Code> property to an object describing the current sort status (the column
          accessor and the sort direction, <Code>{"'asc'"}</Code> or <Code>{"'desc'"}</Code>);
        </li>
        <li>
          provide an <Code>onSortStatusChange</Code> handler, which is invoked with the new sort status when the user
          clicks a sortable column header.
        </li>
      </UnorderedList>
      <Txt idea>
        Clicking a sorted column header a third time clears its sorting: <Code>onSortStatusChange</Code> is called with{' '}
        <Code>columnAccessor</Code> set to an empty string, while <Code>direction</Code> resets to <Code>'asc'</Code>.
        Handle this case in your own sorting logic, as shown in the example below.
      </Txt>
      <CodeBlock code={code['SortingExample.tsx']} />
      <Txt info title="Keep in mind">
        {PRODUCT_NAME} doesn’t sort the records for you; it only renders the sort indicators and reports the user’s
        intent. You are responsible for sorting the <Code>records</Code> you pass to the component &mdash; on the
        client, as in the examples on this page, or on the server, by passing the sort status to your API (see the{' '}
        <InternalLink to="/examples/complex-usage-scenario">complex usage scenario</InternalLink>).
        <br />
        Clicking the header of the currently sorted column toggles the sort direction, while clicking another sortable
        column keeps the current direction.
      </Txt>
      <Txt idea>
        If you enable sorting, you might want to consider{' '}
        <InternalLink to="/examples/disabling-text-selection">disabling text selection</InternalLink>; otherwise,
        repeatedly clicking the same column header will select the column title text, which some users may find
        annoying.
      </Txt>
      <PageSubtitle value="Sorting by a different key" />
      <Txt>
        Sometimes the value you want to sort by is not the one designated by the column accessor &mdash; for instance,
        when a column renders a value computed from several record properties. In this case, set the column’s{' '}
        <Code>sortKey</Code> property; it will be included in the sort status object received by{' '}
        <Code>onSortStatusChange</Code>, so you can use it in your sorting logic.
        <br />
        In the example below, the <em>Name</em> column renders the employee’s full name, but is sorted by last name.
        Notice that dot-notation accessors such as <Code>department.name</Code> can be sortable too:
      </Txt>
      <CodeBlock code={code['SortingExampleSortKey.tsx']} />
      <SortingExampleSortKey />
      <PageSubtitle value="Custom sort icons" />
      <Txt>
        To use custom sort icons, pass an object with <Code>sorted</Code> and <Code>unsorted</Code> keys to the{' '}
        <Code>sortIcons</Code> property. The <Code>sorted</Code> icon should point up; it will be flipped vertically
        automatically when the sort direction is descending:
      </Txt>
      <CodeBlock code={code['SortingExampleCustomIcons.tsx']} />
      <SortingExampleCustomIcons />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
