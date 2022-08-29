import { Code, Container, MantineSize, Paper, Stack } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useCallback, useEffect, useState } from 'react';
import CheckableSegmentedControl from '~/components/CheckableSegmentedControl';
import CodeBlock from '~/components/CodeBlock';
import ExampleContainer from '~/components/ExampleContainer';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import AsynchronousDataLoadingExample, { LoaderVariant } from '~/examples/AsynchronousDataLoadingExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/asynchronous-data-loading';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/AsynchronousDataLoadingExample.tsx')) as string },
});

const INITIAL_VARIANT = 'oval';
const INITIAL_SIZE = 'lg';
const INITIAL_BLUR = 1;

const SIZES: MantineSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const VARIANTS = ['oval', 'bars', 'dots'];
const BLURS = [1, 2, 3, 4, 5];

export default function Page({ code: initialCode }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [customizeLoaderVariant, setCustomizeLoaderVariant] = useState(false);
  const [loaderVariant, setLoaderVariant] = useState(INITIAL_VARIANT);
  const [customizeLoaderSize, setCustomizeLoaderSize] = useState(false);
  const [loaderSize, setLoaderSize] = useState(INITIAL_SIZE);
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

  const adjustCode = useCallback(
    () =>
      initialCode
        .replace(/( +)loaderVariant=.*\n/, (_, spaces) =>
          customizeLoaderVariant ? `${spaces}loaderVariant="${loaderVariant}"\n` : ''
        )
        .replace(/( +)loaderSize=.*\n/, (_, spaces) =>
          customizeLoaderSize ? `${spaces}loaderSize="${loaderSize}"\n` : ''
        )
        .replace(/( +)loaderBackgroundBlur=.*\n/, (_, spaces) =>
          customizeLoaderBackgroundBlur ? `${spaces}loaderBackgroundBlur={${loaderBackgroundBlur}}\n` : ''
        ),
    [
      customizeLoaderBackgroundBlur,
      customizeLoaderSize,
      customizeLoaderVariant,
      initialCode,
      loaderBackgroundBlur,
      loaderSize,
      loaderVariant,
    ]
  );

  const [code, setCode] = useState(adjustCode());

  useEffect(() => {
    setCode(adjustCode());
  }, [adjustCode]);

  return (
    <Container>
      <PageTitle of={PATH} />
      <Paper my="xl" px="xl" py="sm" withBorder>
        <Stack>
          <CheckableSegmentedControl
            label="Loader variant"
            data={VARIANTS}
            checked={customizeLoaderVariant}
            onCheckedChange={setCustomizeLoaderVariant}
            value={loaderVariant}
            onChange={setLoaderVariant}
          />
          <CheckableSegmentedControl
            label="Loader Size"
            data={SIZES}
            checked={customizeLoaderSize}
            onCheckedChange={setCustomizeLoaderSize}
            value={loaderSize}
            onChange={setLoaderSize}
          />
          <CheckableSegmentedControl
            label="Background blur"
            data={BLURS.map(String)}
            checked={customizeLoaderBackgroundBlur}
            onCheckedChange={setCustomizeLoaderBackgroundBlur}
            value={String(loaderBackgroundBlur)}
            onChange={(v) => setLoaderBackgroundBlur(Number(v))}
          />
        </Stack>
      </Paper>
      <ExampleContainer>
        <AsynchronousDataLoadingExample
          customizeLoaderVariant={customizeLoaderVariant}
          loaderVariant={loaderVariant as LoaderVariant}
          customizeLoaderSize={customizeLoaderSize}
          loaderSize={loaderSize as MantineSize}
          customizeLoaderBackgroundBlur={customizeLoaderBackgroundBlur}
          loaderBackgroundBlur={loaderBackgroundBlur}
        />
      </ExampleContainer>
      <PageText>
        Simply set the `fetching` property to `true` to indicate data loading state by overlaying a{' '}
        <ExternalLink to="https://mantine.dev/core/loader/">Loader</ExternalLink> over the <Code>DataTable</Code> rows.
        <br />
        You can further customize the Loader appearance with <Code>loaderSize</Code>, <Code>loaderVariant</Code> and{' '}
        <Code>loaderBackgroundBlur</Code>.
      </PageText>
      <PageText info>
        If your <Code>DataTable</Code> is not vertically scrollable and contains no initial data, make sure to set its
        `minHeight` to minimize the “content jump” and accommodate the <Code>Loader</Code> height.
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
