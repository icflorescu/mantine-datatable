import { List } from '@mantine/core';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import classes from './UnorderedList.module.css';

export type UnorderedListProps = PropsWithChildren<{
  compact?: boolean;
  className?: string;
}>;

export function UnorderedList({ children, compact, className, ...otherProps }: UnorderedListProps) {
  return (
    <List className={clsx(classes.root, { [classes.compact]: compact }, className)} {...otherProps}>
      {children}
    </List>
  );
}
