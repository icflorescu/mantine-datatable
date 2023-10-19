import { ActionIcon } from '@mantine/core';
import { IconHeartFilled } from '@tabler/icons-react';
import { SPONSOR_LINK } from '~/config';
import useActionIconStyles from './useActionIconStyles';

export default function SponsorsLinkActionIcon() {
  const { cx, classes } = useActionIconStyles();
  return (
    <ActionIcon
      className={cx(classes.root, classes.red)}
      variant="outline"
      component="a"
      href={SPONSOR_LINK}
      target="_blank"
      aria-label="Sponsor Mantine DataTable project on GitHub Sponsors"
    >
      <IconHeartFilled size={16} />
    </ActionIcon>
  );
}
