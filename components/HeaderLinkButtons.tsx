import { Box, Button } from '@mantine/core';
import { IconBrandGithub, IconHeartFilled } from '@tabler/icons-react';
import { PRODUCT_NAME, REPO_LINK, SPONSORS_LINK } from '~/app/config';
import classes from './HeaderLinkButtons.module.css';
import { NpmHeaderLinkButton } from './NpmHeaderLinkButton';

export function HeaderLinkButtons() {
  return (
    <div className={classes.root}>
      <Button
        size="xs"
        variant="default"
        leftSection={<IconBrandGithub size={16} />}
        component="a"
        aria-label={`View ${PRODUCT_NAME} source code on GitHub`}
        href={REPO_LINK}
        target="_blank"
      >
        Source
        <Box component="span" visibleFrom="md">
          &nbsp;code
        </Box>
      </Button>
      <NpmHeaderLinkButton />
      <Button
        size="xs"
        variant="filled"
        color="red"
        leftSection={<IconHeartFilled size={16} />}
        component="a"
        aria-label={`Sponsor the author of ${PRODUCT_NAME} on GitHub Sponsors`}
        href={SPONSORS_LINK}
        target="_blank"
      >
        Sponsor
      </Button>
    </div>
  );
}
