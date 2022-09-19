import { Alert, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { AlertCircle, InfoCircle } from 'tabler-icons-react';

export default function PageText({
  info,
  warning,
  children,
}: {
  info?: boolean;
  warning?: boolean;
  children: ReactNode;
}) {
  return info || warning ? (
    <Alert
      my="xl"
      color={warning ? 'red' : undefined}
      styles={{ message: { lineHeight: 1.6 } }}
      icon={info ? <InfoCircle /> : <AlertCircle />}
    >
      {children}
    </Alert>
  ) : (
    <Text my="xl">{children}</Text>
  );
}
