import { Code } from '@mantine/core';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { LOADER_TYPES, MANTINE_SIZES } from '~/lib/constants';
import { getRouteMetadata } from '~/lib/utils';
import { AsynchronousDataLoadingExamplePageContent } from './AsynchronousDataLoadingExamplePageContent';
import { AsynchronousDataLoadingExampleWithCustomLoader } from './AsynchronousDataLoadingExamples';

const PATH = '/examples/asynchronous-data-loading';

export const metadata = getRouteMetadata(PATH);

export default async function AsynchronousDataLoadingExamplePage() {
  const code = await readCodeFile<Record<'default' | 'custom-loader', string>>(
    `${PATH}/AsynchronousDataLoadingExamples.tsx`
  );

  return (
    <>
      <PageTitle of={PATH} />
      <AsynchronousDataLoadingExamplePageContent initialCode={code['default']} />
      <Txt>
        Simply set a <Code>fetching: true</Code> property to the DataTable to indicate data loading state by overlaying
        a <ExternalLink to="https://mantine.dev/core/loader/">Loader</ExternalLink> over the DataTable rows.
        <br />
        You can customize the loader appearance with:
      </Txt>
      <ul>
        <li>
          <Code>loaderSize</Code> → <Code>{MANTINE_SIZES.map((v) => `'${v}'`).join(' | ')}</Code>
        </li>
        <li>
          <Code>loaderType</Code> → <Code>{LOADER_TYPES.map((v) => `'${v}'`).join(' | ')}</Code>
        </li>
        <li>
          <Code>loaderColor</Code> → loader <ExternalLink to="https://mantine.dev/theming/colors/">color</ExternalLink>
        </li>
        <li>
          <Code>loaderBackgroundBlur</Code> → loader background blur in pixels
        </li>
      </ul>
      <Txt idea>
        If your <Code>DataTable</Code> is not vertically scrollable and contains no initial data, make sure to set its{' '}
        <Code>minHeight</Code> to minimize the “content jump” and accommodate the <Code>Loader</Code> height.
      </Txt>
      <CodeBlock code={code['default']} />
      <PageSubtitle value="Using a custom loader component" />
      <Txt>
        If you’re not happy with standard Mantine{' '}
        <ExternalLink to="https://mantine.dev/core/loader/">Loader</ExternalLink> types, you can pass your own component
        to the <Code>customLoader</Code> property.
      </Txt>
      <Txt warning>
        If you’re using a <Code>customLoader</Code>, do not set <Code>loaderSize</Code>, <Code>loaderType</Code> and{' '}
        <Code>loaderColor</Code> properties.
      </Txt>
      <AsynchronousDataLoadingExampleWithCustomLoader />
      <CodeBlock code={code['custom-loader']} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
