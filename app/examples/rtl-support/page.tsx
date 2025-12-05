import { Code } from '@mantine/core';
import type { Route } from 'next';
import { MANTINE_LINK, PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { RTLSupportExample } from './RTLSupportExample';

const PATH: Route = '/examples/rtl-support';

export const metadata = getRouteMetadata(PATH);

export default async function RTLSupportExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/RTLSupportExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        Since <strong>v8.3.9</strong>, {PRODUCT_NAME} fully supports RTL (Right-to-Left) layouts (thanks to the{' '}
        <ExternalLink to="https://github.com/icflorescu/mantine-datatable/pull/781/">outstanding work</ExternalLink> of{' '}
        <ExternalLink to="https://github.com/ReemX">Reem Assaf</ExternalLink>), making it suitable for languages like
        Arabic, Hebrew, Persian, and Urdu. When wrapped in Mantine&apos;s <Code>DirectionProvider</Code>, all DataTable
        features automatically adapt to the text direction. See the{' '}
        <ExternalLink to={`${MANTINE_LINK}/styles/rtl/`}>Mantine RTL documentation</ExternalLink> for more details on
        setting up RTL in your application.
      </Txt>
      <Txt>
        The example below demonstrates RTL support with pinned columns, row selection, sorting, pagination, and column
        resizing. Use the toggle to switch between LTR and RTL modes:
      </Txt>
      <RTLSupportExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
