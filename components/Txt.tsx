import { Alert, Text } from '@mantine/core';
import { IconAlertSquareRoundedFilled, IconBulbFilled, IconInfoCircle } from '@tabler/icons-react';

export type TxtProps = React.PropsWithChildren<
  | {
      info?: true;
      warning?: never;
      idea?: never;
      title?: React.ReactNode;
    }
  | {
      info?: never;
      warning?: true;
      idea?: never;
      title?: React.ReactNode;
    }
  | {
      info?: never;
      warning?: never;
      idea?: true;
      title?: React.ReactNode;
    }
>;

export function Txt({ info, warning, idea, title, children }: TxtProps) {
  return info || warning || idea ? (
    <Alert
      my="xl"
      color={warning ? 'red' : idea ? 'orange' : undefined}
      styles={{ message: { lineHeight: 1.6 } }}
      icon={info ? <IconInfoCircle /> : idea ? <IconBulbFilled /> : <IconAlertSquareRoundedFilled />}
      title={title}
    >
      {children}
    </Alert>
  ) : (
    <Text my="md">{children}</Text>
  );
}
