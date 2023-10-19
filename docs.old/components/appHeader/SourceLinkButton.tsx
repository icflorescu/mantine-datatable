import { Button } from '@mantine/core';
import GitHubIcon from '~/components/GitHubIcon';
import { REPO_LINK } from '~/config';
import useButtonStyles from './useButtonStyles';

export default function SourceLinkButton() {
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
      leftIcon={<GitHubIcon size={16} />}
      component="a"
      href={REPO_LINK}
      target="_blank"
      aria-label="View Mantine DataTable source code on GitHub"
    >
      Source
    </Button>
  );
}
