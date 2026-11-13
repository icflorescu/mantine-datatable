import { Code } from '@mantine/core';
import type { Route } from 'next';
import { MANTINE_LINK, PRODUCT_NAME } from '~/app/config';
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
import { RTLSupportExample } from './RTLSupportExample';

const PATH: Route = '/examples/rtl-support';

export const metadata = getRouteMetadata(PATH);

export default async function RTLSupportExamplePage() {
  const code = await allPromiseProps({
    'RTLSupportExample.tsx': readCodeFile<string>(`${PATH}/RTLSupportExample.tsx`),
    'RTLSupportExample.module.css': readCodeFile<string>(`${PATH}/RTLSupportExample.module.css`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        Since <strong>v8.3.9</strong>, {PRODUCT_NAME} fully supports right-to-left (RTL) layouts, making it suitable for
        languages such as Arabic, Hebrew, Persian and Urdu (thanks to the{' '}
        <ExternalLink to="https://github.com/icflorescu/mantine-datatable/pull/781/">outstanding work</ExternalLink> of{' '}
        <ExternalLink to="https://github.com/ReemX">Reem Assaf</ExternalLink>). There is no RTL-specific property to
        set: all DataTable features automatically adapt to the text direction of the surrounding document.
      </Txt>
      <PageSubtitle value="Setting up RTL" />
      <Txt>
        Set up RTL in your application as described in the{' '}
        <ExternalLink to={`${MANTINE_LINK}/styles/rtl/`}>Mantine RTL documentation</ExternalLink>, which means:
      </Txt>
      <UnorderedList compact>
        <li>
          setting the <Code>dir="rtl"</Code> attribute on an ancestor element &mdash; usually the root{' '}
          <Code>{'<html>'}</Code> element. {PRODUCT_NAME} relies on the computed CSS direction for its layout, borders,
          scroll shadows and pinned columns;
        </li>
        <li>
          wrapping your application in Mantine’s <Code>DirectionProvider</Code>, which some Mantine components rely on
          to determine the text direction; {PRODUCT_NAME} also uses it to make column resizing handles work in the right
          direction.
        </li>
      </UnorderedList>
      <Txt>
        The example below sets both locally, on a wrapper element around each table, so you can switch between LTR and
        RTL modes with the toggle. It showcases a basic table,{' '}
        <InternalLink to="/examples/column-dragging-and-toggling">column dragging</InternalLink>, and a table with{' '}
        <InternalLink to="/examples/pinning-the-first-column">pinned columns</InternalLink>,{' '}
        <InternalLink to="/examples/records-selection">row selection</InternalLink>,{' '}
        <InternalLink to="/examples/sorting">sorting</InternalLink>,{' '}
        <InternalLink to="/examples/pagination">pagination</InternalLink> and{' '}
        <InternalLink to="/examples/column-resizing">column resizing</InternalLink>:
      </Txt>
      <RTLSupportExample />
      <Txt info title="Column pinning in RTL mode">
        In RTL mode, “left” and “right” should be read as “start” and “end”: <Code>pinFirstColumn</Code> pins the first
        column to the right edge of the table, <Code>pinLastColumn</Code> pins the last column to the left edge, and the
        same goes for <InternalLink to="/examples/pinning-arbitrary-columns">arbitrary columns</InternalLink> pinned
        with <Code>pinned: 'left'</Code> or <Code>pinned: 'right'</Code>.
      </Txt>
      <Txt>Here is the code:</Txt>
      <CodeBlock tabs={{ code, keys: ['RTLSupportExample.tsx', 'RTLSupportExample.module.css'] }} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
