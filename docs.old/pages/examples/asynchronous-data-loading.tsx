import {
  Box,
  Code,
  Container,
  DefaultMantineColor,
  MANTINE_SIZES,
  MantineSize,
  Paper,
  createStyles,
} from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useCallback, useEffect, useState } from 'react';
import CheckableSegmentedControl from '~/components/CheckableSegmentedControl';
import CodeBlock from '~/components/CodeBlock';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageSubtitle from '~/components/PageSubtitle';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import {
  AsynchronousDataLoadingExample,
  AsynchronousDataLoadingExampleWithCustomLoader,
  LoaderVariant,
} from '~/examples/AsynchronousDataLoadingExamples';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/asynchronous-data-loading';

type Example = 'standard' | 'custom-loader';

export const getStaticProps: GetStaticProps<{ code: Record<Example, string> }> = async () => ({
  props: {
    code: (await readCodeExample('examples/AsynchronousDataLoadingExamples.tsx')) as Record<Example, string>,
  },
});

const INITIAL_VARIANT = 'oval';
const INITIAL_SIZE = 'lg';
const INITIAL_COLOR = 'blue';
const INITIAL_BLUR = 1;

const VARIANTS = ['oval', 'bars', 'dots'];
const BLURS = [1, 2, 3, 4, 5];

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
}));

export default function Page({
  code: { standard: initialStandardCode, 'custom-loader': customLoaderCode },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [customizeLoaderVariant, setCustomizeLoaderVariant] = useState(false);
  const [loaderVariant, setLoaderVariant] = useState(INITIAL_VARIANT);
  const [customizeLoaderSize, setCustomizeLoaderSize] = useState(false);
  const [loaderSize, setLoaderSize] = useState(INITIAL_SIZE);
  const [customizeLoaderColor, setCustomizeLoaderColor] = useState(false);
  const [loaderColor, setLoaderColor] = useState(INITIAL_COLOR);
  const [customizeLoaderBackgroundBlur, setCustomizeLoaderBackgroundBlur] = useState(false);
  const [loaderBackgroundBlur, setLoaderBackgroundBlur] = useState(INITIAL_BLUR);

  useEffect(() => {
    if (!customizeLoaderVariant) setLoaderVariant(INITIAL_VARIANT);
  }, [customizeLoaderVariant]);

  useEffect(() => {
    if (!customizeLoaderSize) setLoaderSize(INITIAL_SIZE);
  }, [customizeLoaderSize]);

  useEffect(() => {
    if (!customizeLoaderBackgroundBlur) setLoaderBackgroundBlur(INITIAL_BLUR);
  }, [customizeLoaderBackgroundBlur]);

  const adjustStandardCode = useCallback(
    () =>
      initialStandardCode
        .replace(/( +)loaderVariant=.*\n/, (_, spaces) =>
          customizeLoaderVariant ? `${spaces}loaderVariant="${loaderVariant}"\n` : ''
        )
        .replace(/( +)loaderSize=.*\n/, (_, spaces) =>
          customizeLoaderSize ? `${spaces}loaderSize="${loaderSize}"\n` : ''
        )
        .replace(/( +)loaderColor=.*\n/, (_, spaces) =>
          customizeLoaderColor ? `${spaces}loaderColor="${loaderColor}"\n` : ''
        )
        .replace(/( +)loaderBackgroundBlur=.*\n/, (_, spaces) =>
          customizeLoaderBackgroundBlur ? `${spaces}loaderBackgroundBlur={${loaderBackgroundBlur}}\n` : ''
        ),
    [
      customizeLoaderBackgroundBlur,
      customizeLoaderColor,
      customizeLoaderSize,
      customizeLoaderVariant,
      initialStandardCode,
      loaderBackgroundBlur,
      loaderColor,
      loaderSize,
      loaderVariant,
    ]
  );

  const [standardCode, setStandardCode] = useState(adjustStandardCode());

  useEffect(() => {
    setStandardCode(adjustStandardCode());
  }, [adjustStandardCode]);

  const { classes, cx } = useStyles();

  return (
    <Container>
      <PageTitle of={PATH} />
      <Paper my="xl" px="xl" py="sm" withBorder>
        <Box py="sm" className={cx(classes.controlGroups, classes.controls)}>
          <div className={classes.controls}>
            <CheckableSegmentedControl
              label="Loader variant"
              documentAs="loaderVariant"
              data={VARIANTS}
              checked={customizeLoaderVariant}
              onCheckedChange={setCustomizeLoaderVariant}
              value={loaderVariant}
              onChange={setLoaderVariant}
            />
            <CheckableSegmentedControl
              label="Loader size"
              documentAs="loaderSize"
              data={MANTINE_SIZES as unknown as string[]}
              checked={customizeLoaderSize}
              onCheckedChange={setCustomizeLoaderSize}
              value={loaderSize}
              onChange={setLoaderSize}
            />
          </div>
          <div className={classes.controls}>
            <CheckableSegmentedControl
              label="Loader color"
              documentAs="loaderColor"
              data={['blue', 'green', 'grape']}
              checked={customizeLoaderColor}
              onCheckedChange={setCustomizeLoaderColor}
              value={loaderColor}
              onChange={setLoaderColor}
            />
            <CheckableSegmentedControl
              label="Background blur"
              documentAs="loaderBackgroundBlur"
              data={BLURS.map(String)}
              checked={customizeLoaderBackgroundBlur}
              onCheckedChange={setCustomizeLoaderBackgroundBlur}
              value={String(loaderBackgroundBlur)}
              onChange={(v) => setLoaderBackgroundBlur(Number(v))}
            />
          </div>
        </Box>
      </Paper>
      <AsynchronousDataLoadingExample
        customizeLoaderVariant={customizeLoaderVariant}
        loaderVariant={loaderVariant as LoaderVariant}
        customizeLoaderSize={customizeLoaderSize}
        loaderSize={loaderSize as MantineSize}
        customizeLoaderColor={customizeLoaderColor}
        loaderColor={loaderColor as DefaultMantineColor}
        customizeLoaderBackgroundBlur={customizeLoaderBackgroundBlur}
        loaderBackgroundBlur={loaderBackgroundBlur}
      />
      <PageText>
        Simply set a <Code>fetching: true</Code> property to the <Code>DataTable</Code> to indicate data loading state
        by overlaying a <ExternalLink to="https://mantine.dev/core/loader/">Loader</ExternalLink> over the{' '}
        <Code>DataTable</Code> rows.
        <br />
        You can customize the loader appearance with:
        <ul>
          <li>
            <Code>loaderSize</Code> →{' '}
            <Code>&apos;xs&apos; | &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos;</Code>
          </li>
          <li>
            <Code>loaderVariant</Code> → <Code>&apos;oval&apos; | &apos;bars&apos; | &apos;dots&apos;</Code>
          </li>
          <li>
            <Code>loaderColor</Code> → loader{' '}
            <ExternalLink to="https://mantine.dev/theming/colors/">color</ExternalLink>
          </li>
          <li>
            <Code>loaderBackgroundBlur</Code> → loader background blur in pixels
          </li>
        </ul>
      </PageText>
      <PageText info>
        If your <Code>DataTable</Code> is not vertically scrollable and contains no initial data, make sure to set its{' '}
        <Code>minHeight</Code> to minimize the “content jump” and accommodate the <Code>Loader</Code> height.
      </PageText>
      <CodeBlock language="typescript" content={standardCode} />
      <PageSubtitle value="Using a custom loader component" />
      <PageText>
        If you’re not happy with standard Mantine{' '}
        <ExternalLink to="https://mantine.dev/core/loader/">Loader</ExternalLink> variants, you can pass your own
        component to the <Code>customLoader</Code> property.
      </PageText>
      <PageText info>
        If you’re using a <Code>customLoader</Code>, do not set <Code>loaderSize</Code>, <Code>loaderVariant</Code> and{' '}
        <Code>loaderColor</Code> properties.
      </PageText>
      <AsynchronousDataLoadingExampleWithCustomLoader />
      <CodeBlock language="typescript" content={customLoaderCode} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
