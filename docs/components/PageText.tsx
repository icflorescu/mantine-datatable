import { Alert, Text } from '@mantine/core';
import { IconAlertCircle, IconBulb, IconInfoCircle } from '@tabler/icons-react';
import { ReactNode } from 'react';

export default function PageText({
  info,
  warning,
  idea,
  children,
}: {
  info?: boolean;
  warning?: boolean;
  idea?: boolean;
  children: ReactNode;
}) {
  return info || idea || warning ? (
    <Alert
      my="xl"
      color={warning ? 'red' : idea ? 'orange' : undefined}
      styles={{ message: { lineHeight: 1.6 } }}
      icon={info ? <IconInfoCircle /> : idea ? <IconBulb /> : <IconAlertCircle />}
    >
      {children}
    </Alert>
  ) : (
    <Text my="xl">{children}</Text>
  );
}
