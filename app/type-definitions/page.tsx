import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';

const PATH = '/type-definitions';
export const metadata = getRouteMetadata(PATH);

export default async function TypeDefinitionsPage() {
  const code = (await readCodeFile(`/../package/types.ts`)) as string;
  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        {PRODUCT_NAME} is written in TypeScript and the component properties are well documented with additional JSDoc
        annotations, so you can harness the full power of your IDE to build type safe applications with confidence.
      </Txt>
      <Txt>Have a look at the types below to grasp the full power of {PRODUCT_NAME}:</Txt>
      <CodeBlock code={code} language="ts" />
      <PageNavigation of={PATH} />
    </>
  );
}
