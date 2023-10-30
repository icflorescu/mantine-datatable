import type { Route } from 'next';
import { MANTINE_LINK } from '~/app/config';
import { ExternalLink } from '~/components/ExternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { BasicTablePropertiesPageContent } from './BasicTablePropertiesPageContent';

const PATH: Route = '/examples/basic-table-properties';

export const metadata = getRouteMetadata(PATH);

export default async function BasicTablePropertiesExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/BasicTablePropertiesExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        The DataTable component exposes some basic properties of the internal{' '}
        <ExternalLink to={`${MANTINE_LINK}/core/table/`}>Mantine Table</ExternalLink> component and implements a number
        of additional ones. Try customizing some of them interactively below:
      </Txt>
      <BasicTablePropertiesPageContent initialCode={code} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
