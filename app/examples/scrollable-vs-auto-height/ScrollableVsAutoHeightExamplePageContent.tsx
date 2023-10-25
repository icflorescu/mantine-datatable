'use client';

import { Paper, Switch } from '@mantine/core';
import { useState } from 'react';
import { CodeBlock } from '~/components/CodeBlock';
import { AutoHeightExample, ScrollableExample } from './ScrollableVsAutoHeightExamples';

export function ScrollableVsAutoHeightExamplePageContent({
  code,
}: {
  code: Record<'scrollable' | 'auto-height' | 'scroll-area-props', string>;
}) {
  const [scrollable, setScrollable] = useState(true);

  return (
    <>
      <Paper my="xl" mx="auto" maw={360} p="md" withBorder>
        <Switch
          label="Set height to make it vertically-scrollable"
          checked={scrollable}
          onChange={() => setScrollable((value) => !value)}
        />
      </Paper>
      <CodeBlock code={code[scrollable ? 'scrollable' : 'auto-height']} />
      {scrollable ? <ScrollableExample /> : <AutoHeightExample />}
    </>
  );
}
