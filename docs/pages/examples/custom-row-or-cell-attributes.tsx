import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import CustomRowOrCellAttributesExample from '~/examples/CustomRowOrCellAttributesExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/custom-row-or-cell-attributes';

export const getStaticProps: GetStaticProps<{
  code: string;
}> = async () => ({
  props: { code: (await readCodeExample('examples/CustomRowOrCellAttributesExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>Adding custom attributes to table rows or table cells could be useful for testing purposes.</PageText>
      <PageText>
        You can add custom attributes to the table rows using the <Code>customRowAttributes</Code> property. It accepts
        a function that receives two arguments, <Code>record</Code> and <Code>recordIndex</Code> and returns an object
        with attributes to add to the row.
      </PageText>
      <PageText>
        Similarly, each column can have its own <Code>customCellAttributes</Code> property that accepts a function that
        receives two arguments, <Code>record</Code> and <Code>recordIndex</Code> and returns an object with attributes
        to add to the cell.
      </PageText>
      <PageText>Inspect the table below to see the attributes generated for each row and cell:</PageText>
      <CustomRowOrCellAttributesExample />
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
