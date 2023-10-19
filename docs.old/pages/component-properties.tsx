import { Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'component-properties';

const TYPE_DEFINITION_FILES = [
  'DataTableProps.ts',
  'DataTableColumnProps.ts',
  'DataTableDefaultColumnProps.ts',
  'DataTableColumn.ts',
  'DataTableColumnGroup.ts',
  'DataTableColumnTextAlignment.ts',
  'DataTableVerticalAlignment.ts',
  'DataTableOuterBorderProps.ts',
  'DataTableEmptyStateProps.ts',
  'DataTableLoaderProps.ts',
  'DataTablePaginationProps.ts',
  'DataTablePageSizeSelectorProps.ts',
  'DataTableSortProps.ts',
  'DataTableSortStatus.ts',
  'DataTableSelectionProps.ts',
  'DataTableContextMenuProps.ts',
  'DataTableContextMenuItemProps.ts',
  'DataTableRowExpansionProps.ts',
  'DataTableRowExpansionCollapseProps.ts',
  'DataTableCellClickHandler.ts',
];

export const getStaticProps: GetStaticProps<{
  code: string[];
}> = async () => ({
  props: {
    code: await Promise.all(
      TYPE_DEFINITION_FILES.map((file) => readCodeExample(`../package/types/${file}`) as Promise<string>)
    ),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        Mantine DataTable component is written in TypeScript and its properties are well documented with additional
        JSDoc annotations, so you can harness the full power of your IDE to build type safe applications with
        confidence.
      </PageText>
      <PageText>Here are the type definitions:</PageText>
      {TYPE_DEFINITION_FILES.map((file, index) => (
        <CodeBlock key={file} language="typescript" fileName={file} content={code[index]} noCopy />
      ))}
      <PageNavigation of={PATH} />
    </Container>
  );
}
