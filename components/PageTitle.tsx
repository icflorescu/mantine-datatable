import { Title } from '@mantine/core';
import { getRouteTitle } from '~/lib/utils';
import classes from './PageTitle.module.css';

export type PageTitleProps =
  | {
      of: string;
      children?: never;
    }
  | {
      of?: never;
      children: React.ReactNode;
    };

export function PageTitle({ of, children }: PageTitleProps) {
  return (
    <Title className={classes.root} order={2}>
      {children || getRouteTitle(of!)}
    </Title>
  );
}
