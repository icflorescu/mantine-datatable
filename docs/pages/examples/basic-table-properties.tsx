import { Code, Container, createStyles, MantineSize, Paper, Switch } from '@mantine/core';
import { DataTableVerticalAlignment } from 'mantine-datatable';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useCallback, useEffect, useState } from 'react';
import CodeBlock from '~/components/CodeBlock';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import CheckableSegmentedControl from '~/components/pages/basic-table-properties/CheckableSegmentedControl';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import BasicTablePropertiesExample from '~/examples/BasicTablePropertiesExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/basic-table-properties';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/BasicTablePropertiesExample.tsx')) as string },
});

const INITIAL_HORIZONTAL_SPACING: MantineSize = 'xs';
const INITIAL_VERTICAL_SPACING: MantineSize = 'xs';
const INITIAL_FONT_SIZE: MantineSize = 'sm';
const INITIAL_VERTICAL_ALIGNMENT: DataTableVerticalAlignment = 'center';

const SIZES: MantineSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const VERTICAL_ALIGNMENTS: DataTableVerticalAlignment[] = ['top', 'center', 'bottom'];

const useStyles = createStyles((theme) => ({
  controlGroups: {
    [`@media(min-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: 'row',
      gap: theme.spacing.xl * 3,
      justifyContent: 'space-around',
    },
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  control: {
    minHeight: 36,
  },
}));

export default function Page({ code: initialCode }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [withVerticalBorders, setWithVerticalBorders] = useState(false);
  const [striped, setStriped] = useState(false);
  const [highlightOnHover, setHighlightOnHover] = useState(false);
  const [customizeHorizontalSpacing, setCustomizeHorizontalSpacing] = useState(false);
  const [horizontalSpacing, setHorizontalSpacing] = useState<MantineSize>(INITIAL_HORIZONTAL_SPACING);
  const [customizeVerticalSpacing, setCustomizeVerticalSpacing] = useState(false);
  const [verticalSpacing, setVerticalSpacing] = useState<MantineSize>(INITIAL_VERTICAL_SPACING);
  const [customizeFontSize, setCustomizeFontSize] = useState(false);
  const [fontSize, setFontSize] = useState<MantineSize>(INITIAL_FONT_SIZE);
  const [customizeVerticalAlignment, setCustomizeVerticalAlignment] = useState(false);
  const [verticalAlignment, setVerticalAlignment] = useState<DataTableVerticalAlignment>(INITIAL_VERTICAL_ALIGNMENT);

  useEffect(() => {
    if (!customizeHorizontalSpacing) setHorizontalSpacing(INITIAL_HORIZONTAL_SPACING);
  }, [customizeHorizontalSpacing]);

  useEffect(() => {
    if (!customizeVerticalSpacing) setVerticalSpacing(INITIAL_VERTICAL_SPACING);
  }, [customizeVerticalSpacing]);

  const adjustInitialCode = useCallback(
    () =>
      initialCode
        .replace(
          '\n      withVerticalBorders={withVerticalBorders}',
          withVerticalBorders ? '\n      withVerticalBorders' : ''
        )
        .replace('\n      striped={striped}', striped ? '\n      striped' : '')
        .replace('\n      highlightOnHover={highlightOnHover}', highlightOnHover ? '\n      highlightOnHover' : '')
        .replace(
          '\n      horizontalSpacing={customizeHorizontalSpacing ? horizontalSpacing : undefined}',
          customizeHorizontalSpacing ? `\n      horizontalSpacing="${horizontalSpacing}"` : ''
        )
        .replace(
          '\n      verticalSpacing={customizeVerticalSpacing ? verticalSpacing : undefined}',
          customizeVerticalSpacing ? `\n      verticalSpacing="${verticalSpacing}"` : ''
        )
        .replace(
          '\n      fontSize={customizeFontSize ? fontSize : undefined}',
          customizeFontSize ? `\n      fontSize="${fontSize}"` : ''
        )
        .replace(
          '\n      verticalAlignment={customizeVerticalAlignment ? verticalAlignment : undefined}',
          customizeVerticalAlignment ? `\n      verticalAlignment="${verticalAlignment}"` : ''
        ),
    [
      customizeFontSize,
      customizeHorizontalSpacing,
      customizeVerticalAlignment,
      customizeVerticalSpacing,
      fontSize,
      highlightOnHover,
      horizontalSpacing,
      initialCode,
      striped,
      verticalAlignment,
      verticalSpacing,
      withVerticalBorders,
    ]
  );

  const [code, setCode] = useState(adjustInitialCode());

  useEffect(() => {
    setCode(adjustInitialCode());
  }, [adjustInitialCode]);

  const { cx, classes } = useStyles();

  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        The <Code>DataTable</Code> component exposes the basic properties of the internal{' '}
        <ExternalLink to="https://mantine.dev/core/table/">Mantine Table</ExternalLink> component and implements a
        number of additional ones. Try customizing some of them interactively below:
      </PageText>
      <Paper my="xl" p="sm" withBorder>
        <div className={cx(classes.controlGroups, classes.controls)}>
          <div className={classes.controls}>
            <Switch
              className={classes.control}
              label="Vertical borders"
              checked={withVerticalBorders}
              onChange={() => setWithVerticalBorders((v) => !v)}
            />
            <Switch
              className={classes.control}
              label="Striped"
              checked={striped}
              onChange={() => setStriped((v) => !v)}
            />
            <Switch
              className={classes.control}
              label="Hightlight on hover"
              checked={highlightOnHover}
              onChange={() => setHighlightOnHover((v) => !v)}
            />
          </div>
          <div className={classes.controls}>
            <CheckableSegmentedControl
              className={classes.control}
              label="Horizontal spacing"
              data={SIZES}
              checked={customizeHorizontalSpacing}
              onCheckedChange={setCustomizeHorizontalSpacing}
              value={horizontalSpacing}
              onChange={(value) => setHorizontalSpacing(value as MantineSize)}
            />
            <CheckableSegmentedControl
              className={classes.control}
              label="Vertical spacing"
              data={SIZES}
              checked={customizeVerticalSpacing}
              onCheckedChange={setCustomizeVerticalSpacing}
              value={verticalSpacing}
              onChange={(value) => setVerticalSpacing(value as MantineSize)}
            />
            <CheckableSegmentedControl
              className={classes.control}
              label="Font size"
              data={SIZES}
              checked={customizeFontSize}
              onCheckedChange={setCustomizeFontSize}
              value={fontSize}
              onChange={(value) => setFontSize(value as MantineSize)}
            />
            <CheckableSegmentedControl
              className={classes.control}
              label="Vertical alignment"
              data={VERTICAL_ALIGNMENTS}
              checked={customizeVerticalAlignment}
              onCheckedChange={setCustomizeVerticalAlignment}
              value={verticalAlignment}
              onChange={(value) => setVerticalAlignment(value as DataTableVerticalAlignment)}
            />
          </div>
        </div>
      </Paper>
      <CodeBlock language="typescript" content={code} />
      <BasicTablePropertiesExample
        withVerticalBorders={withVerticalBorders}
        striped={striped}
        highlightOnHover={highlightOnHover}
        customizeHorizontalSpacing={customizeHorizontalSpacing}
        horizontalSpacing={horizontalSpacing}
        customizeVerticalSpacing={customizeVerticalSpacing}
        verticalSpacing={verticalSpacing}
        customizeFontSize={customizeFontSize}
        fontSize={fontSize}
        customizeVerticalAlignment={customizeVerticalAlignment}
        verticalAlignment={verticalAlignment}
      />
      <PageNavigation of={PATH} />
    </Container>
  );
}
