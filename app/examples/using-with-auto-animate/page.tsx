import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { UsingWithAutoAnimateExample } from './UsingWithAutoAnimateExample';

const PATH: Route = '/examples/using-with-auto-animate';

export const metadata = getRouteMetadata(PATH);

export default async function UsingWithAutoAnimateExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/UsingWithAutoAnimateExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        The <Code>bodyRef</Code> property gives you access to the underlying <Code>{'<tbody>'}</Code> element of the
        table. You can hand it over to the excellent{' '}
        <ExternalLink to="https://auto-animate.formkit.com/">AutoAnimate</ExternalLink> library to smoothly animate rows
        as they are added, removed or reordered. Use the buttons below the table to see it in action:
      </Txt>
      <UsingWithAutoAnimateExample />
      <Txt>
        AutoAnimate tracks rows by their DOM elements, which {PRODUCT_NAME} keys by record ID. Make sure each record has
        a unique, stable ID (see{' '}
        <InternalLink to="/examples/non-standard-record-ids">non-standard record IDs</InternalLink> if your records
        don’t have an <Code>id</Code> property); otherwise reordered rows will simply be re-rendered in place, without
        animation.
      </Txt>
      <Txt warning title="Warning">
        AutoAnimate does not play well with{' '}
        <InternalLink to="/examples/pinning-the-first-column">column pinning</InternalLink>. Rows won’t animate on a
        table with pinned columns, because the pinning logic measures column widths synchronously after every render,
        and these layout reads interfere with AutoAnimate’s observation of the same <Code>{'<tbody>'}</Code>.
      </Txt>
      <Txt info title="Heads up">
        In React strict mode (enabled by default in Next.js development builds), the official{' '}
        <Code>useAutoAnimate()</Code> hook double-invokes its ref callback on mount, which corrupts AutoAnimate’s
        per-element state and breaks animations after client-side navigation. To work around this, the example calls{' '}
        <Code>autoAnimate(node)</Code> directly from a stable ref callback that runs exactly once per{' '}
        <Code>{'<tbody>'}</Code> element. Production builds are not affected, so the official hook works fine there.
      </Txt>
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code} />
      <Txt>Head over to the next example to learn more.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
