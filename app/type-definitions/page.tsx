import type { Route } from 'next';
import { readdir } from 'node:fs/promises';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';

const PATH: Route = '/type-definitions';
export const metadata = getRouteMetadata(PATH);

const TYPE_FILES_PATH = 'package/types';

export default async function TypeDefinitionsPage() {
  const filesNames = await readdir(TYPE_FILES_PATH);

  const files = await Promise.all(
    filesNames
      .filter((name) => name !== 'index.ts')
      .map((name) => allPromiseProps({ [name]: readCodeFile(`/../${TYPE_FILES_PATH}/${name}`) }))
  );
  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        {PRODUCT_NAME} is written in TypeScript and the component properties are well documented with additional JSDoc
        annotations, so you can harness the full power of your IDE to build type safe applications with confidence.
      </Txt>
      <Txt>Here are the {PRODUCT_NAME} type files:</Txt>
      {files.map((code) => {
        const [name] = Object.keys(code);
        return <CodeBlock key={name} tabs={{ code, keys: [name] }} />;
      })}
      <PageNavigation of={PATH} />
    </>
  );
}
