import { Box, Code, Container, MANTINE_SIZES, MantineSize, Paper, Switch, createStyles } from '@mantine/core';
import { DataTableVerticalAlignment } from 'mantine-datatable';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useCallback, useEffect, useState } from 'react';
import CheckableSegmentedControl from '~/components/CheckableSegmentedControl';
import CodeBlock from '~/components/CodeBlock';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import BasicTablePropertiesExample from '~/examples/BasicTablePropertiesExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/basic-table-properties';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/BasicTablePropertiesExample.tsx')) as string },
});

const INITIAL_BORDER_RADIUS: MantineSize = 'sm';
const INITIAL_SHADOW: MantineSize = 'sm';
const INITIAL_HORIZONTAL_SPACING: MantineSize = 'xs';
const INITIAL_VERTICAL_SPACING: MantineSize = 'xs';
const INITIAL_FONT_SIZE: MantineSize = 'sm';
const INITIAL_VERTICAL_ALIGNMENT: DataTableVerticalAlignment = 'center';

const VERTICAL_ALIGNMENTS: DataTableVerticalAlignment[] = ['top', 'center', 'bottom'];

const useStyles = createStyles((theme) => ({
  controlGroups: {
    [`@media(min-width: ${theme.breakpoints.sm})`]: {
      flexDirection: 'row',
      gap: theme.spacing.xl,
      justifyContent: 'space-between',
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
  const [withBorder, setWithBorder] = useState(false);
  const [noHeader, setNoHeader] = useState(false);
  const [customizeBorderRadius, setCustomizeBorderRadius] = useState(false);
  const [borderRadius, setBorderRadius] = useState<MantineSize>(INITIAL_BORDER_RADIUS);
  const [customizeShadow, setCustomizeShadow] = useState(false);
  const [shadow, setShadow] = useState<MantineSize>(INITIAL_BORDER_RADIUS);
  const [withColumnBorders, setWithColumnBorders] = useState(false);
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
    if (!withBorder) setCustomizeBorderRadius(false);
  }, [withBorder]);

  useEffect(() => {
    if (!customizeShadow) setShadow(INITIAL_SHADOW);
  }, [customizeShadow]);

  useEffect(() => {
    if (customizeBorderRadius) {
      setWithBorder(true);
    } else {
      setBorderRadius(INITIAL_BORDER_RADIUS);
    }
  }, [customizeBorderRadius]);

  useEffect(() => {
    if (!customizeHorizontalSpacing) setHorizontalSpacing(INITIAL_HORIZONTAL_SPACING);
  }, [customizeHorizontalSpacing]);

  useEffect(() => {
    if (!customizeVerticalSpacing) setVerticalSpacing(INITIAL_VERTICAL_SPACING);
  }, [customizeVerticalSpacing]);

  const adjustCode = useCallback(
    () =>
      initialCode
        .replace(/( +)withBorder=.*\n/, (_, spaces) => (withBorder ? `${spaces}withBorder\n` : ''))
        .replace(/( +)noHeader=.*\n/, (_, spaces) => (noHeader ? `${spaces}noHeader\n` : ''))
        .replace(/( +)borderRadius=.*\n/, (_, spaces) =>
          customizeBorderRadius ? `${spaces}borderRadius="${borderRadius}"\n` : ''
        )
        .replace(/( +)shadow=.*\n/, (_, spaces) => (customizeShadow ? `${spaces}shadow="${shadow}"\n` : ''))
        .replace(/( +)withColumnBorders=.*\n/, (_, spaces) => (withColumnBorders ? `${spaces}withColumnBorders\n` : ''))
        .replace(/( +)striped=.*\n/, (_, spaces) => (striped ? `${spaces}striped\n` : ''))
        .replace(/( +)highlightOnHover=.*\n/, (_, spaces) => (highlightOnHover ? `${spaces}highlightOnHover\n` : ''))
        .replace(/( +)horizontalSpacing=.*\n/, (_, spaces) =>
          customizeHorizontalSpacing ? `${spaces}horizontalSpacing="${horizontalSpacing}"\n` : ''
        )
        .replace(/( +)verticalSpacing=.*\n/, (_, spaces) =>
          customizeVerticalSpacing ? `${spaces}verticalSpacing="${verticalSpacing}"\n` : ''
        )
        .replace(/( +)fontSize=.*\n/, (_, spaces) => (customizeFontSize ? `${spaces}fontSize="${fontSize}"\n` : ''))
        .replace(/( +)verticalAlignment=.*\n/, (_, spaces) =>
          customizeVerticalAlignment ? `${spaces}verticalAlignment="${verticalAlignment}"\n` : ''
        ),
    [
      borderRadius,
      customizeBorderRadius,
      customizeFontSize,
      customizeHorizontalSpacing,
      customizeShadow,
      customizeVerticalAlignment,
      customizeVerticalSpacing,
      fontSize,
      highlightOnHover,
      horizontalSpacing,
      initialCode,
      shadow,
      striped,
      verticalAlignment,
      verticalSpacing,
      withBorder,
      noHeader,
      withColumnBorders,
    ]
  );

  const [code, setCode] = useState(adjustCode());

  useEffect(() => {
    setCode(adjustCode());
  }, [adjustCode]);

  const { cx, classes } = useStyles();

  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        The <Code>DataTable</Code> component exposes the basic properties of the internal{' '}
        <ExternalLink to="https://mantine.dev/core/table/">Mantine Table</ExternalLink> component and implements a
        number of additional ones. Try customizing some of them interactively below:
      </PageText>
      <Paper my="xl" px="xl" py="sm" withBorder>
        <Box py="sm" className={cx(classes.controlGroups, classes.controls)}>
          <div className={classes.controls}>
            <Switch
              className={classes.control}
              label="Column borders"
              checked={withColumnBorders}
              onChange={() => setWithColumnBorders((v) => !v)}
            />
            <Code hidden>Column borders, withColumnBorders</Code>
            <Switch
              className={classes.control}
              label="Striped"
              checked={striped}
              onChange={() => setStriped((v) => !v)}
            />
            <Code hidden>Striped</Code>
            <Switch
              className={classes.control}
              label="Hightlight on hover"
              checked={highlightOnHover}
              onChange={() => setHighlightOnHover((v) => !v)}
            />
            <Code hidden>Hightlight on hover, highlightOnHover</Code>
            <Switch
              className={classes.control}
              label="Table border"
              checked={withBorder}
              onChange={() => setWithBorder((v) => !v)}
            />
            <Code hidden>Table border, withBorder</Code>
            <Switch
              className={classes.control}
              label="No header"
              checked={noHeader}
              onChange={() => setNoHeader((v) => !v)}
            />
            <Code hidden>No header, noHeader</Code>
            <CheckableSegmentedControl
              className={classes.control}
              label="Border radius"
              documentAs="borderRadius"
              data={MANTINE_SIZES as unknown as string[]}
              checked={customizeBorderRadius}
              onCheckedChange={setCustomizeBorderRadius}
              value={borderRadius}
              onChange={(value) => setBorderRadius(value as MantineSize)}
            />
          </div>
          <div className={classes.controls}>
            <CheckableSegmentedControl
              className={classes.control}
              label="Shadow"
              documentAs="shadow"
              data={MANTINE_SIZES as unknown as string[]}
              checked={customizeShadow}
              onCheckedChange={setCustomizeShadow}
              value={shadow}
              onChange={(value) => setShadow(value as MantineSize)}
            />
            <CheckableSegmentedControl
              className={classes.control}
              label="Horizontal spacing"
              documentAs="horizontalSpacing"
              data={MANTINE_SIZES as unknown as string[]}
              checked={customizeHorizontalSpacing}
              onCheckedChange={setCustomizeHorizontalSpacing}
              value={horizontalSpacing}
              onChange={(value) => setHorizontalSpacing(value as MantineSize)}
            />
            <CheckableSegmentedControl
              className={classes.control}
              label="Vertical spacing"
              documentAs="verticalSpacing"
              data={MANTINE_SIZES as unknown as string[]}
              checked={customizeVerticalSpacing}
              onCheckedChange={setCustomizeVerticalSpacing}
              value={verticalSpacing}
              onChange={(value) => setVerticalSpacing(value as MantineSize)}
            />
            <CheckableSegmentedControl
              className={classes.control}
              label="Font size"
              documentAs="fontSize"
              data={MANTINE_SIZES as unknown as string[]}
              checked={customizeFontSize}
              onCheckedChange={setCustomizeFontSize}
              value={fontSize}
              onChange={(value) => setFontSize(value as MantineSize)}
            />
            <CheckableSegmentedControl
              className={classes.control}
              label="Vertical alignment"
              documentAs="verticalAlignment"
              data={VERTICAL_ALIGNMENTS}
              checked={customizeVerticalAlignment}
              onCheckedChange={setCustomizeVerticalAlignment}
              value={verticalAlignment}
              onChange={(value) => setVerticalAlignment(value as DataTableVerticalAlignment)}
            />
          </div>
        </Box>
      </Paper>
      <BasicTablePropertiesExample
        withBorder={withBorder}
        noHeader={noHeader}
        customizeBorderRadius={customizeBorderRadius}
        borderRadius={borderRadius}
        customizeShadow={customizeShadow}
        shadow={shadow}
        withColumnBorders={withColumnBorders}
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
      <CodeBlock language="typescript" content={code} />
      <PageText>
        However, there’s much more you can do with Mantine DataTable.
        <br />
        Head over to the next example to discover other features.
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
