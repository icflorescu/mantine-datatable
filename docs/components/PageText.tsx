import { Alert, Text } from '@mantine/core';
import { IconAlertCircle, IconInfoCircle } from '@tabler/icons-react';
import { ReactNode } from 'react';

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
      icon={info ? <IconInfoCircle /> : <IconAlertCircle />}
    >
      {children}
    </Alert>
  ) : (
    <Text my="xl">{children}</Text>
  );
}
