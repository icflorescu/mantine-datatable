import { Code } from '@mantine/core';
import type { Route } from 'next';
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
        The <Code>DataTable</Code> component exposes a <Code>bodyRef</Code> property that can be used to pass a ref to
        the underlying table <Code>tbody</Code> element. This ref can be passed to the <Code>useAutoAnimate()</Code>{' '}
        hook from the excellent <ExternalLink to="https://auto-animate.formkit.com/">AutoAnimate</ExternalLink> library
        to animate table rows when they are added, removed or reordered.
      </Txt>
      <UsingWithAutoAnimateExample />
      <Txt warning title="Warning!">
        AutoAnimate does not play well with{' '}
        <InternalLink to="/examples/pinning-the-first-column">column pinning</InternalLink>. Combining the two on the
        same table will prevent rows from animating, because the pinning machinery measures column widths synchronously
        after every render and the resulting layout reads interfere with AutoAnimate&apos;s observation of the same{' '}
        <Code>tbody</Code>.
      </Txt>
      <Txt info title="Heads up">
        In React strict mode (the default in Next.js dev), the official <Code>useAutoAnimate()</Code> adapter
        double-invokes its ref callback on mount, which corrupts AutoAnimate&apos;s per-parent enabled state and breaks
        animations after client-side navigations. The example above bypasses the adapter and calls{' '}
        <Code>autoAnimate(node)</Code> directly from a stable ref callback that fires exactly once per real{' '}
        <Code>tbody</Code>. Production builds are unaffected and would work fine with the official hook.
      </Txt>
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code} />
      <Txt>Head over to the next example to learn more.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
