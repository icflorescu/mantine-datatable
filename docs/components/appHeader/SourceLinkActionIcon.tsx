import { ActionIcon } from '@mantine/core';
import { REPO_LINK } from '~/config';
import GitHubIcon from '../GitHubIcon';
import useActionIconStyles from './useActionIconStyles';

export default function SourceLinkActionIcon() {
  const { classes } = useActionIconStyles();
  return (
    <ActionIcon
      className={classes.root}
      variant="outline"
      component="a"
      href={REPO_LINK}
      target="_blank"
      aria-label="View Mantine DataTable source code on GitHub"
    >
      <GitHubIcon size={16} />
    </ActionIcon>
  );
}
