import { Text } from '@mantine/core';
import { IconTable } from '@tabler/icons-react';
import Link from 'next/link';
import { PRODUCT_NAME } from '~/app/config';
import classes from './HeaderTitle.module.css';

export function HeaderTitle() {
  return (
    <Link className={classes.root} href="/">
      <IconTable className={classes.icon} />
      <Text className={classes.text} component="span" fw={700} lh={1.3}>
        {PRODUCT_NAME}
      </Text>
    </Link>
  );
}
