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
      <Code hidden>textSelectionDisabled</Code>
      <Txt>
        The DataTable component conveniently allows you to disable text selection.
        <br />
        For instance, for usability reasons, it would make sense to disable text selection if you:
      </Txt>
      <UnorderedList compact>
        <li>
          work with <InternalLink to="/examples/records-selection">records selection</InternalLink>;
        </li>
        <li>
          <InternalLink to="/examples/handling-row-clicks">handle row clicks</InternalLink>;
        </li>
        <li>
          use <InternalLink to="/examples/using-with-mantine-contextmenu">context-menus</InternalLink> on touch devices;
        </li>
        <li>
          use <InternalLink to="/examples/sorting">sorting</InternalLink>.
        </li>
      </UnorderedList>
      <DisablingTextSelectionExamplePageContent initialCode={code} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
