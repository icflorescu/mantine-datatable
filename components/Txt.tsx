import { Alert, Text } from '@mantine/core';
import { IconAlertSquareRoundedFilled, IconBulbFilled, IconInfoCircle } from '@tabler/icons-react';
import clsx from 'clsx';
import classes from './Txt.module.css';

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
      classNames={{ message: clsx(classes.alertMessage, { [classes.alertMessageWithoutTitle]: !title }) }}
      icon={info ? <IconInfoCircle /> : idea ? <IconBulbFilled /> : <IconAlertSquareRoundedFilled />}
      title={title}
    >
      {children}
    </Alert>
  ) : (
    <Text my="md">{children}</Text>
  );
}
