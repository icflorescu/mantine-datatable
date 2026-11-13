import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { LOADER_TYPES, MANTINE_SIZES } from '~/lib/constants';
import { getRouteMetadata } from '~/lib/utils';
import { AsynchronousDataLoadingExamplePageContent } from './AsynchronousDataLoadingExamplePageContent';
import { AsynchronousDataLoadingExampleWithCustomLoader } from './AsynchronousDataLoadingExamples';

const PATH: Route = '/examples/asynchronous-data-loading';

export const metadata = getRouteMetadata(PATH);

export default async function AsynchronousDataLoadingExamplePage() {
  const code = await readCodeFile<Record<'default' | 'custom-loader', string>>(
    `${PATH}/AsynchronousDataLoadingExamples.tsx`
  );

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        When loading data asynchronously, set the <Code>fetching</Code> property to <Code>true</Code> while the request
        is in flight. The DataTable will indicate the loading state by overlaying a{' '}
        <ExternalLink to="https://mantine.dev/core/loader/">Mantine Loader</ExternalLink> over its rows. Play with the
        loader properties in the interactive example below:
      </Txt>
      <AsynchronousDataLoadingExamplePageContent initialCode={code.default} />
      <Txt>You can customize the loader appearance with the following properties:</Txt>
      <UnorderedList>
        <li>
          <Code>
            loaderSize: {MANTINE_SIZES.map((v) => `'${v}'`).join(' | ')} | (string & {'{}'}) | number
          </Code>
          <br />
          The loader size. You can also pass a number (in pixels) or any valid CSS size string.
        </li>
        <li>
          <Code>loaderType: {LOADER_TYPES.map((v) => `'${v}'`).join(' | ')}</Code>
          <br />
          The loader type. Defaults to the loader type set in your Mantine theme.
        </li>
        <li>
          <Code>loaderColor</Code>
          <br />
          The loader <ExternalLink to="https://mantine.dev/theming/colors/">color</ExternalLink>. Defaults to the
          theme’s primary color.
        </li>
        <li>
          <Code>loaderBackgroundBlur: number</Code>
          <br />
          The loader background blur, in pixels. No blur by default.
        </li>
      </UnorderedList>
      <Txt idea title="Keep in mind">
        If your DataTable is not{' '}
        <InternalLink to="/examples/scrollable-vs-auto-height">vertically scrollable</InternalLink> and has no initial
        data, make sure to set its <Code>minHeight</Code> to accommodate the loader and minimize the “content jump” when
        the records arrive.
      </Txt>
      <Txt>
        If you’re using <InternalLink to="/examples/pagination">pagination</InternalLink>, the pagination footer will
        display the <Code>loadingText</Code> (<Code>...</Code> by default) while fetching and the total number of
        records is unknown. The <InternalLink to="/examples/empty-state">empty state</InternalLink> indicator is not
        displayed while fetching.
      </Txt>
      <CodeBlock code={code.default} />
      <PageSubtitle value="Using a custom loader component" />
      <Txt>
        If you’re not happy with the standard Mantine{' '}
        <ExternalLink to="https://mantine.dev/core/loader/">Loader</ExternalLink> types, you can pass your own component
        to the <Code>customLoader</Code> property.
        <br />
        In this case, you can’t set the <Code>loaderSize</Code>, <Code>loaderType</Code> and <Code>loaderColor</Code>{' '}
        properties (TypeScript will complain if you do), but you can still use <Code>loaderBackgroundBlur</Code>.
      </Txt>
      <AsynchronousDataLoadingExampleWithCustomLoader />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['custom-loader']} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
