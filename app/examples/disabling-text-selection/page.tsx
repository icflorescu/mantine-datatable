import { Code } from '@mantine/core';
import type { Route } from 'next';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { DisablingTextSelectionExamplePageContent } from './DisablingTextSelectionExamplePageContent';

const PATH: Route = '/examples/disabling-text-selection';

export const metadata = getRouteMetadata(PATH);

export default async function DisablingTextSelectionExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/DisablingTextSelectionExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        Set the <Code>textSelectionDisabled</Code> property to prevent users from selecting text inside the DataTable.
        <br />
        This improves usability whenever clicking on the table is meant to trigger an action rather than to select text,
        for instance if you:
      </Txt>
      <UnorderedList compact>
        <li>
          work with <InternalLink to="/examples/records-selection">records selection</InternalLink>;
        </li>
        <li>
          handle <InternalLink to="/examples/handling-row-clicks">row clicks</InternalLink> or{' '}
          <InternalLink to="/examples/handling-cell-clicks">cell clicks</InternalLink>, especially double-clicks, which
          would otherwise select the clicked word;
        </li>
        <li>
          use <InternalLink to="/examples/expanding-rows">expandable rows</InternalLink>;
        </li>
        <li>
          use <InternalLink to="/examples/using-with-mantine-contextmenu">context menus</InternalLink> on touch devices;
        </li>
        <li>
          use <InternalLink to="/examples/sorting">sorting</InternalLink>.
        </li>
      </UnorderedList>
      <Txt>Toggle the switch below and try selecting some text in the table to see the difference:</Txt>
      <DisablingTextSelectionExamplePageContent initialCode={code} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
