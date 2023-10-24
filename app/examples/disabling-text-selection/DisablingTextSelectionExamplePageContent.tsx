'use client';

import { Paper, Switch } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { CodeBlock } from '~/components/CodeBlock';
import { DisablingTextSelectionExample } from './DisablingTextSelectionExample';

export function DisablingTextSelectionExamplePageContent({ initialCode }: { initialCode: string }) {
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

  return (
    <>
      <Paper my="xl" mx="auto" maw={260} p="md" withBorder>
        <Switch
          label="Disable text selection"
          checked={textSelectionDisabled}
          onChange={() => setTextSelectionDisabled((v) => !v)}
        />
      </Paper>
      <DisablingTextSelectionExample textSelectionDisabled={textSelectionDisabled} />
      <CodeBlock language="tsx" code={code} />
    </>
  );
}
