import { createStyles, Grid, MantineSize, Paper, Slider, Stack, Switch } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import ExampleContainer from '~/components/ExampleContainer';
import PageText from '~/components/PageText';
import companies from '~/data/companies.json';

const SIZES: { value: number; size: MantineSize }[] = [
  { value: 1, size: 'xs' },
  { value: 2, size: 'sm' },
  { value: 3, size: 'md' },
  { value: 4, size: 'lg' },
  { value: 5, size: 'xl' },
];

const INITIAL_HORIZONTAL_SPACING = 'xs';
const INITIAL_VERTICAL_SPACING = 'xs';
const INITIAL_FONT_SIZE = 'sm';

const useStyles = createStyles({
  slider: {
    marginLeft: 50,
    width: 120,
  },
});

export default function CustomizeBasicPropertiesExample({
  initialCode,
  setCode,
}: {
  initialCode: string;
  setCode: (code: string) => void;
}) {
  const [withVerticalBorders, setWithVerticalBorders] = useState(false);
  const [striped, setStriped] = useState(false);
  const [highlightOnHover, setHighlightOnHover] = useState(false);
  const [customizeHorizontalSpacing, setCustomizeHorizontalSpacing] = useState(false);
  const [horizontalSpacing, setHorizontalSpacing] = useState<MantineSize>(INITIAL_HORIZONTAL_SPACING);
  const [customizeVerticalSpacing, setCustomizeVerticalSpacing] = useState(false);
  const [verticalSpacing, setVerticalSpacing] = useState<MantineSize>(INITIAL_VERTICAL_SPACING);
  const [customizeFontSize, setCustomizeFontSize] = useState(false);
  const [fontSize, setFontSize] = useState<MantineSize>(INITIAL_FONT_SIZE);

  useEffect(() => {
    if (!customizeHorizontalSpacing) setHorizontalSpacing(INITIAL_HORIZONTAL_SPACING);
  }, [customizeHorizontalSpacing]);

  useEffect(() => {
    if (!customizeVerticalSpacing) setVerticalSpacing(INITIAL_VERTICAL_SPACING);
  }, [customizeVerticalSpacing]);

  useEffect(() => {
    setCode(
      initialCode
        .replace('\n  withVerticalBorders={withVerticalBorders}', withVerticalBorders ? '\n  withVerticalBorders' : '')
        .replace('\n  striped={striped}', striped ? '\n  striped' : '')
        .replace('\n  highlightOnHover={highlightOnHover}', highlightOnHover ? '\n  highlightOnHover' : '')
        .replace(
          '\n  horizontalSpacing={customizeHorizontalSpacing ? horizontalSpacing : undefined}',
          customizeHorizontalSpacing ? `\n  horizontalSpacing="${horizontalSpacing}"` : ''
        )
        .replace(
          '\n  verticalSpacing={customizeVerticalSpacing ? verticalSpacing : undefined}',
          customizeVerticalSpacing ? `\n  verticalSpacing="${verticalSpacing}"` : ''
        )
        .replace(
          '\n  fontSize={customizeFontSize ? fontSize : undefined}',
          customizeFontSize ? `\n  fontSize="${fontSize}"` : ''
        )
    );
  }, [
    initialCode,
    setCode,
    withVerticalBorders,
    striped,
    highlightOnHover,
    customizeHorizontalSpacing,
    horizontalSpacing,
    customizeVerticalSpacing,
    verticalSpacing,
    customizeFontSize,
    fontSize,
  ]);

  const { classes } = useStyles();

  return (
    <>
      <Paper my="xl" p="sm" withBorder>
        <Grid gutter="lg">
          <Grid.Col span={12} xs={6} sm={4}>
            <Switch
              label="Vertical borders"
              checked={withVerticalBorders}
              onChange={() => setWithVerticalBorders((v) => !v)}
            />
          </Grid.Col>
          <Grid.Col span={12} xs={6} sm={4}>
            <Switch label="Striped" checked={striped} onChange={() => setStriped((v) => !v)} />
          </Grid.Col>
          <Grid.Col span={12} xs={6} sm={4}>
            <Switch
              label="Hightlight on hover"
              checked={highlightOnHover}
              onChange={() => setHighlightOnHover((v) => !v)}
            />
          </Grid.Col>
          <Grid.Col span={12} xs={6} sm={4}>
            <Stack spacing="xs">
              <Switch
                label="Horizontal spacing"
                checked={customizeHorizontalSpacing}
                onChange={() => setCustomizeHorizontalSpacing((v) => !v)}
              />
              <Slider
                className={classes.slider}
                marks={SIZES}
                min={1}
                max={5}
                disabled={!customizeHorizontalSpacing}
                value={SIZES.find((s) => s.size === horizontalSpacing)!.value}
                label={(value) => SIZES.find((s) => s.value === value)!.size}
                onChange={(value) => setHorizontalSpacing(SIZES.find((s) => s.value === value)!.size)}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={12} xs={6} sm={4}>
            <Stack spacing="xs">
              <Switch
                label="Vertical spacing"
                checked={customizeVerticalSpacing}
                onChange={() => setCustomizeVerticalSpacing((v) => !v)}
              />
              <Slider
                className={classes.slider}
                marks={SIZES}
                min={1}
                max={5}
                disabled={!customizeVerticalSpacing}
                value={SIZES.find((s) => s.size === verticalSpacing)!.value}
                label={(value) => SIZES.find((s) => s.value === value)!.size}
                onChange={(value) => setVerticalSpacing(SIZES.find((s) => s.value === value)!.size)}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={12} xs={6} sm={4}>
            <Stack spacing="xs">
              <Switch label="Font size" checked={customizeFontSize} onChange={() => setCustomizeFontSize((v) => !v)} />
              <Slider
                className={classes.slider}
                marks={SIZES}
                min={1}
                max={5}
                disabled={!customizeFontSize}
                value={SIZES.find((s) => s.size === fontSize)!.value}
                label={(value) => SIZES.find((s) => s.value === value)!.size}
                onChange={(value) => setFontSize(SIZES.find((s) => s.value === value)!.size)}
              />
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
      <PageText>Output:</PageText>
      <ExampleContainer>
        {/* example-start */}
        <DataTable
          withVerticalBorders={withVerticalBorders}
          striped={striped}
          highlightOnHover={highlightOnHover}
          horizontalSpacing={customizeHorizontalSpacing ? horizontalSpacing : undefined}
          verticalSpacing={customizeVerticalSpacing ? verticalSpacing : undefined}
          fontSize={customizeFontSize ? fontSize : undefined}
          columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
          records={companies}
        />
        {/* example-end */}
      </ExampleContainer>
    </>
  );
  // example-end
}
