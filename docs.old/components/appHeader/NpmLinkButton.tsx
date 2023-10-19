import { Button } from '@mantine/core';
import { IconBrandNpm } from '@tabler/icons-react';
import { NPM_LINK } from '~/config';
import { NpmDownloads } from './NpmDownloads';
import useButtonStyles from './useButtonStyles';

export default function NpmLinkButton() {
  const { classes } = useButtonStyles();
  return (
    <Button
      classNames={{
        root: classes.button,
        icon: classes.buttonIcon,
        label: classes.buttonLabel,
      }}
      size="xs"
      variant="default"
      leftIcon={<IconBrandNpm color="#CC3534" />}
      component="a"
      href={NPM_LINK}
      target="_blank"
      aria-label="View Mantine DataTable on npm"
    >
      <NpmDownloads />
    </Button>
  );
}
