import { CodeBlock } from '~/components/CodeBlock';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';

const PATH = '/examples/basic-usage';

export const metadata = getRouteMetadata(PATH);

export default async function BasicUsageExamplePage() {
  const code = (await readCodeFile(`${PATH}/BasicUsageExample.tsx`)) as string;

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>Write content...</Txt>
      <CodeBlock code={code} />
      <PageNavigation of={PATH} />
    </>
  );
}
