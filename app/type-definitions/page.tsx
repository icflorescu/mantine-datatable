import { readdir } from 'node:fs/promises';
import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { TypedColumnsExample } from './TypedColumnsExample';

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
  const typedColumnsCode = await readCodeFile<string>(`${PATH}/TypedColumnsExample.tsx`);
  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        {PRODUCT_NAME} is written in TypeScript and its properties are documented with JSDoc annotations, so you can
        harness the full power of your IDE (autocompletion, inline documentation and type checking) to build type-safe
        applications with confidence.
      </Txt>
      <PageSubtitle value="Using the types in your code" />
      <Txt>
        <Code>DataTable</Code> is a generic component that infers the type of your records from the <Code>records</Code>{' '}
        property. When you declare columns inline, there’s nothing else to do: render functions and event handlers are
        typed automatically, and accessors are autocompleted with your record keys (any string is still accepted, to
        allow dot-notation paths and virtual columns, so accessor typos aren’t caught by the compiler).
      </Txt>
      <Txt>
        All the types listed below are exported by the package, so you can also use them explicitly; for instance, when
        declaring column definitions outside of the component, or when typing the state used for{' '}
        <InternalLink to="/examples/sorting">sorting</InternalLink> (<Code>DataTableSortStatus</Code>):
      </Txt>
      <CodeBlock code={typedColumnsCode} />
      <Txt>The code above produces the following result:</Txt>
      <TypedColumnsExample />
      <PageSubtitle value="Type files" />
      <Txt>Here are the {PRODUCT_NAME} type definition files:</Txt>
      {files.map((code) => {
        const [name] = Object.keys(code);
        return <CodeBlock key={name} tabs={{ code, keys: [name] }} />;
      })}
      <PageNavigation of={PATH} />
    </>
  );
}
