'use client';

import { Title } from '@mantine/core';
import { IconLink } from '@tabler/icons-react';
import { kebabCase } from 'lodash';
import classes from './PageSubtitle.module.css';

export type PageSubtitleProps = {
  value: string;
};

export function PageSubtitle({ value }: PageSubtitleProps) {
  const id = kebabCase(value);

  return (
    <Title id={id} className={classes.root} order={3}>
      <a className={classes.anchor} onClick={() => (location.hash = id)}>
        {value}
        <IconLink className={classes.icon} />
      </a>
    </Title>
  );
}
