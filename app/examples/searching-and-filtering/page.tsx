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
import { SearchingAndFilteringExample } from './SearchingAndFilteringExample';

const PATH: Route = '/examples/searching-and-filtering';

export const metadata = getRouteMetadata(PATH);

export default async function SearchingAndFilteringExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/SearchingAndFilteringExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        Adjust the array of <Code>records</Code> you’re feeding to {PRODUCT_NAME} based on your own logic in order to
        perform searching and filtering.
        <br />
        In order to support column-based filtering you can use the <Code>filter</Code> and <Code>filtering</Code>{' '}
        <InternalLink to="/examples/column-properties-and-styling">column properties</InternalLink>.
        <br />
        Here’s a possible (rather naive and rough around the edges) implementation:
      </Txt>
      <SearchingAndFilteringExample />
      <Txt>The code for this example is as follows:</Txt>
      <CodeBlock code={code} />
      <Txt idea>
        To use the Mantine Component with a popover inside the filter column property, you need to render the child
        properties without using a Portal. Please refer to the Mantine documentation on{' '}
        <ExternalLink to="https://mantine.dev/core/popover/#nested-popovers">Nested Popovers</ExternalLink> for more
        details.
      </Txt>
      <Txt info title="Why no built-in “Excel-like” searching and filtering support?">
        You’ll often have to implement searching and filtering data in your projects.
        <br />
        However there’s simply no way for {PRODUCT_NAME} to accommodate every possible usage scenario out there. Most of
        the times you’d have to deal with pagination, sorting, asynchronous loading; sometimes you’d have to place a
        search box or custom filtering criteria selectors in the header of your entire website/application.
        <br />
        Not to mention that in real-life you’d most often do the actual filtering and/or searching in a server API.
        <br />
        The responsibilities and areas of control are most of the times spread across your application’s UI and
        architectural layers, and trying to fit all this in a standard component design and behavior would needlessly
        constrain the developer.
      </Txt>
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
