import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
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
        {PRODUCT_NAME} doesn’t filter your data; to implement searching and filtering, adjust the array of{' '}
        <Code>records</Code> you’re passing to the component according to your own logic.
      </Txt>
      <Txt>
        To help you build column-based filtering UIs, {PRODUCT_NAME} supports the following{' '}
        <InternalLink to="/examples/column-properties-and-styling">column properties</InternalLink>:
      </Txt>
      <UnorderedList>
        <li>
          <Code>filter</Code>
          <br />
          The content of a popover that opens when the user clicks the filter button added to the column header. It can
          be a <Code>ReactNode</Code> or a function receiving an object with a <Code>close</Code> method (so you can
          close the popover programmatically, e.g. after resetting a filter) and returning a <Code>ReactNode</Code>.
        </li>
        <li>
          <Code>filtering: boolean</Code>
          <br />
          When <Code>true</Code>, the filter button is highlighted to indicate that a filter is in effect.
        </li>
        <li>
          <Code>filterPopoverProps</Code>
          <br />
          Additional <ExternalLink to="https://mantine.dev/core/popover/?t=props">Mantine Popover props</ExternalLink>{' '}
          to customize the filter popover (position, width, shadow, etc.).
        </li>
        <li>
          <Code>filterPopoverDisableClickOutside: boolean</Code>
          <br />
          When <Code>true</Code>, disables the click-outside handler {PRODUCT_NAME} attaches to the filter popover
          dropdown. You can combine it with <Code>{'filterPopoverProps={{ closeOnClickOutside: false }}'}</Code> if you
          want the popover to stay open until the user closes it explicitly.
        </li>
      </UnorderedList>
      <Txt>Here’s a possible (rather naive and rough around the edges) implementation:</Txt>
      <SearchingAndFilteringExample />
      <Txt>The code for this example is as follows:</Txt>
      <CodeBlock code={code} />
      <Txt idea>
        If your filter uses Mantine components that render a dropdown (such as <Code>Select</Code>,{' '}
        <Code>MultiSelect</Code> or <Code>DatePickerInput</Code>), render their dropdowns without a portal (e.g.{' '}
        <Code>{'comboboxProps={{ withinPortal: false }}'}</Code>, as in the example above); otherwise, clicking inside
        the dropdown will close the filter popover. See the Mantine documentation on{' '}
        <ExternalLink to="https://mantine.dev/core/popover/#nested-popovers">nested popovers</ExternalLink> for more
        details.
      </Txt>
      <Txt idea>
        If you’re combining filtering with <InternalLink to="/examples/pagination">pagination</InternalLink>, remember
        to reset the current page to <Code>1</Code> whenever the filter criteria change.
      </Txt>
      <Txt info title="Why no built-in “Excel-like” searching and filtering support?">
        You’ll often have to implement searching and filtering in your projects.
        <br />
        However, there’s simply no way for {PRODUCT_NAME} to accommodate every possible usage scenario out there. Most
        of the time you’ll have to deal with pagination, sorting and asynchronous loading; sometimes you’ll have to
        place a search box or custom filter selectors in the header of your entire website or application.
        <br />
        Not to mention that in real life you’ll most often do the actual searching and filtering in a server API.
        <br />
        The responsibilities and areas of control are usually spread across your application’s UI and architectural
        layers, and trying to fit all this into a standard component design would needlessly constrain the developer.
      </Txt>
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
