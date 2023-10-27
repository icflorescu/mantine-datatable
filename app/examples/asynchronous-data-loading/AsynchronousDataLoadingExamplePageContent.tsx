'use client';

import { Paper, type MantineSize } from '@mantine/core';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { CheckableSegmentedControl } from '~/components/CheckableSegmentedControl';
import { CodeBlock } from '~/components/CodeBlock';
import { Txt } from '~/components/Txt';
import { LOADER_TYPES, MANTINE_SIZES } from '~/lib/constants';
import classes from './AsynchronousDataLoadingExamplePageContent.module.css';
import { AsynchronousDataLoadingExample } from './AsynchronousDataLoadingExamples';

const INITIAL_TYPE = 'oval';
const INITIAL_SIZE = 'lg';
const INITIAL_COLOR = 'blue';
const INITIAL_BLUR = 1;

const LOADER_BLURS = [1, 2, 3, 4, 5, 6];

export function AsynchronousDataLoadingExamplePageContent({ initialCode }: { initialCode: string }) {
  const [customizeLoaderType, setCustomizeLoaderType] = useState(false);
  const [loaderType, setLoaderType] = useState(INITIAL_TYPE);
  const [customizeLoaderSize, setCustomizeLoaderSize] = useState(false);
  const [loaderSize, setLoaderSize] = useState(INITIAL_SIZE);
  const [customizeLoaderColor, setCustomizeLoaderColor] = useState(false);
  const [loaderColor, setLoaderColor] = useState(INITIAL_COLOR);
  const [customizeLoaderBackgroundBlur, setCustomizeLoaderBackgroundBlur] = useState(false);
  const [loaderBackgroundBlur, setLoaderBackgroundBlur] = useState(INITIAL_BLUR);

  useEffect(() => {
    if (!customizeLoaderType) setLoaderType(INITIAL_TYPE);
  }, [customizeLoaderType]);

  useEffect(() => {
    if (!customizeLoaderSize) setLoaderSize(INITIAL_SIZE);
  }, [customizeLoaderSize]);

  useEffect(() => {
    if (!customizeLoaderBackgroundBlur) setLoaderBackgroundBlur(INITIAL_BLUR);
  }, [customizeLoaderBackgroundBlur]);

  const adjustCode = useCallback(
    () =>
      initialCode
        .replace(/( +)loaderType=.*\n/, (_, spaces) =>
          customizeLoaderType ? `${spaces}loaderType="${loaderType}"\n` : ''
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
      customizeLoaderType,
      initialCode,
      loaderBackgroundBlur,
      loaderColor,
      loaderSize,
      loaderType,
    ]
  );

  const [code, setCode] = useState(adjustCode());

  useEffect(() => {
    setCode(adjustCode());
  }, [adjustCode]);

  return (
    <>
      <Paper className={clsx(classes.controlGroups)} mt="lg" mb="xl" mx="auto" p="md" withBorder>
        <div className={classes.controls}>
          <CheckableSegmentedControl
            label="Loader type"
            documentAs="loaderType"
            data={LOADER_TYPES}
            checked={customizeLoaderType}
            onCheckedChange={setCustomizeLoaderType}
            value={loaderType}
            onChange={setLoaderType}
          />
          <CheckableSegmentedControl
            label="Loader size"
            documentAs="loaderSize"
            data={MANTINE_SIZES}
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
            data={LOADER_BLURS.map(String)}
            checked={customizeLoaderBackgroundBlur}
            onCheckedChange={setCustomizeLoaderBackgroundBlur}
            value={String(loaderBackgroundBlur)}
            onChange={(v) => setLoaderBackgroundBlur(Number(v))}
          />
        </div>
      </Paper>
      <AsynchronousDataLoadingExample
        customizeLoaderType={customizeLoaderType}
        loaderType={loaderType}
        customizeLoaderSize={customizeLoaderSize}
        loaderSize={loaderSize as MantineSize}
        customizeLoaderColor={customizeLoaderColor}
        loaderColor={loaderColor}
        customizeLoaderBackgroundBlur={customizeLoaderBackgroundBlur}
        loaderBackgroundBlur={loaderBackgroundBlur}
      />
      <Txt>Code:</Txt>
      <CodeBlock code={code} />
    </>
  );
}
