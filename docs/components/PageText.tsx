import { Alert, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { InfoCircle } from 'tabler-icons-react';

export default function PageText({ info, children }: { info?: boolean; children: ReactNode }) {
  return info ? (
    <Alert my="xl" styles={{ message: { lineHeight: 1.6 } }} icon={<InfoCircle />}>
      {children}
    </Alert>
  ) : (
    <Text my="xl">{children}</Text>
  );
}
