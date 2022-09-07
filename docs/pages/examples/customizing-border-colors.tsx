import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import ExternalLink from '~/components/ExternalLink';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import {
  CustomizingBorderColorsWithFunctionsExample,
  CustomizingBorderColorsWithStringsExample,
} from '~/examples/CustomizingBorderColorsExamples';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/customizing-border-colors';

export const getStaticProps: GetStaticProps<{
  code: Record<string, string>;
}> = async () => ({
  props: {
    code: (await readCodeExample('examples/CustomizingBorderColorsExamples.tsx')) as Record<string, string>,
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        If you’re not happy with the default border colors derived from Mantine’s{' '}
        <ExternalLink to="https://mantine.dev/core/table/">Table</ExternalLink> component, you can customize them using{' '}
        <Code>borderColor</Code> and <Code>rowBorderColor</Code> properties.
      </PageText>
      <PageText>
        The <Code>borderColor</Code> is applied to:
        <ul>
          <li>
            the table outer border (if enabled by <Code>withBorder</Code> property);
          </li>
          <li>header bottom border;</li>
          <li>
            pagination top border (if <InternalLink to="/examples/pagination">pagination is used</InternalLink>).
          </li>
        </ul>
        The <Code>rowBorderColor</Code> is applied to:
        <ul>
          <li>the bottom of each row;</li>
          <li>
            the column borders (if enabled by <Code>withColumnBorders</Code> property).
          </li>
        </ul>
      </PageText>
      <PageText>For example:</PageText>
      <CodeBlock language="typescript" content={code['strings']} />
      <CustomizingBorderColorsWithStringsExample />
      <PageText>
        These properties also accept functions that receive the current{' '}
        <ExternalLink to="https://mantine.dev/theming/theme-object/">theme</ExternalLink> as an argument. For instance,
        here’s how you could set the border colors in accordance to the{' '}
        <ExternalLink to="https://mantine.dev/guides/dark-theme/">currently selected color scheme</ExternalLink>:
      </PageText>
      <CodeBlock language="typescript" content={code['functions']} />
      <CustomizingBorderColorsWithFunctionsExample />
      <PageNavigation of={PATH} />
    </Container>
  );
}
