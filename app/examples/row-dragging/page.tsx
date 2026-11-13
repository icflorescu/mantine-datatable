import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME, REPO_LINK } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { RowDraggingExample } from './RowDraggingExample';

const PATH: Route = '/examples/row-dragging';

export const metadata = getRouteMetadata(PATH);

export default async function RowDraggingExamplePage() {
  const code = await allPromiseProps({
    'RowDraggingExample.tsx': readCodeFile<string>(`${PATH}/RowDraggingExample.tsx`),
    'RowDraggingExample.module.css': readCodeFile<string>(`${PATH}/RowDraggingExample.module.css`),
    'companies.json': readCodeFile<string>('/../data/companies.json'),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        {PRODUCT_NAME} doesn’t include a drag-and-drop implementation of its own, but it exposes the building blocks you
        need to make rows draggable with a library such as{' '}
        <ExternalLink to="https://github.com/hello-pangea/dnd">@hello-pangea/dnd</ExternalLink> (support was added in{' '}
        <ExternalLink to={`${REPO_LINK}/pull/616`}>this PR</ExternalLink>). Drag a row by its handle to see it in
        action:
      </Txt>
      <RowDraggingExample />
      <PageSubtitle value="How it works" />
      <Txt>The implementation relies on the following DataTable features:</Txt>
      <UnorderedList>
        <li>
          <Code>tableWrapper</Code> &rarr; a function receiving the table as <Code>children</Code> and returning a React
          node that wraps it; use it to wrap the table in a <Code>Droppable</Code> container;
        </li>
        <li>
          <Code>rowFactory</Code> &rarr; a function that lets you take over the rendering of each row. It receives an
          object with the current <Code>record</Code>, its <Code>index</Code>, the default <Code>rowProps</Code> (class
          name, style, event handlers, etc.), the row cells as <Code>children</Code> and, if you use{' '}
          <InternalLink to="/examples/expanding-rows">row expansion</InternalLink>, the <Code>expandedElement</Code> to
          render after the row. Use it to wrap each row in a <Code>Draggable</Code> component;
        </li>
        <li>
          <Code>DataTableDraggableRow</Code> &rarr; a table row component exported by {PRODUCT_NAME}. Pass it the{' '}
          <Code>rowProps</Code> received by <Code>rowFactory</Code>, along with an <Code>isDragging</Code> flag. While a
          row is being dragged, the component fixes its cell widths to match the header cells, so that the row keeps its
          shape, and sets <Code>data-is-dragging="true"</Code> on it, which you can use for styling.
        </li>
      </UnorderedList>
      <Txt>
        Since the drag handle is rendered by <Code>rowFactory</Code> in an extra cell, you’ll need to add a matching
        column with <Code>hiddenContent</Code> set to <Code>true</Code>, so that the header and body cells stay aligned.
        Giving the columns explicit widths and setting the table layout to <Code>fixed</Code> prevents them from
        changing size while dragging.
      </Txt>
      <Txt>Here is the code:</Txt>
      <CodeBlock tabs={{ code, keys: ['RowDraggingExample.tsx', 'RowDraggingExample.module.css', 'companies.json'] }} />
      <Txt info title="Heads up">
        <Code>@hello-pangea/dnd</Code> is not a dependency of {PRODUCT_NAME}, so you’ll need to install it separately.
        Also remember to update your records in the <Code>onDragEnd</Code> handler &mdash; the DataTable simply renders
        the records you pass to it, in the given order.
      </Txt>
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
