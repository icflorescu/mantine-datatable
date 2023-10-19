import { Title } from '@mantine/core';
import { IconPointer } from '@tabler/icons-react';
import Link from 'next/link';
import { PRODUCT_NAME } from '~/app/config';
import classes from './HeaderTitle.module.css';

export function HeaderTitle() {
  return (
    <Link className={classes.root} href="/">
      <IconPointer className={classes.icon} />
      <Title className={classes.text} order={1}>
        {PRODUCT_NAME}
      </Title>
    </Link>
  );
}
