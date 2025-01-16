import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { VirtualizationExample } from './VirtualizationExample';

const PATH: Route = '/examples/virtualization';

export const metadata = getRouteMetadata(PATH);

export default async function VirtualizationExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/VirtualizationExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        The <Code>DataTable</Code> component exposes a <Code>bodyRef</Code> property that can be used to pass a ref to
        the underlying table <Code>tbody</Code> element. This ref can be passed to the <Code>useAutoAnimate()</Code>{' '}
        hook from the excellent <ExternalLink to="https://auto-animate.formkit.com/">AutoAnimate</ExternalLink> library
        to animate table rows when they are added, removed or reordered.
      </Txt>
      <VirtualizationExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code} />
      <Txt>Head over to the next example to learn more.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
