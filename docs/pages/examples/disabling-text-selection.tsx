import { Code, Container, createStyles, Paper, Switch } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useCallback, useEffect, useState } from 'react';
import CodeBlock from '~/components/CodeBlock';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import DisablingTextSelectionExample from '~/examples/DisablingTextSelectionExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/disabling-text-selection';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/DisablingTextSelectionExample.tsx')) as string },
});

const useStyles = createStyles({
  control: { fontSize: 0 },
});

export default function Page({ code: initialCode }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [textSelectionDisabled, setTextSelectionDisabled] = useState(false);

  const adjustCode = useCallback(
    () =>
      initialCode.replace(/( +)textSelectionDisabled=.*\n/, (_, spaces) =>
        textSelectionDisabled ? `${spaces}textSelectionDisabled\n` : ''
      ),
    [initialCode, textSelectionDisabled]
  );

  const [code, setCode] = useState(adjustCode());

  useEffect(() => {
    setCode(adjustCode());
  }, [adjustCode]);

  const { classes } = useStyles();

  return (
    <Container>
      <PageTitle of={PATH} />
      <Code hidden>textSelectionDisabled</Code>
      <PageText>
        The <Code>DataTable</Code> component conveniently allows you to disable text selection.
        <br />
        For instance, for usability reasons, it would make sense to disable text selection if you:
        <ul>
          <li>
            work with <InternalLink to="/examples/records-selection">records selection</InternalLink>;
          </li>
          <li>
            <InternalLink to="/examples/handling-row-clicks">handle row clicks</InternalLink>;
          </li>
          <li>
            use a <InternalLink to="/examples/row-context-menu">row context-menu triggered by click event</InternalLink>
            ;
          </li>
          <li>
            use <InternalLink to="/examples/sorting">sorting</InternalLink>.
          </li>
        </ul>
      </PageText>
      <Paper my="xl" px="xl" py="md" withBorder>
        <Switch
          className={classes.control}
          label="Disable text selection"
          checked={textSelectionDisabled}
          onChange={() => setTextSelectionDisabled((v) => !v)}
        />
      </Paper>
      <DisablingTextSelectionExample textSelectionDisabled={textSelectionDisabled} />
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
