import { Box } from '@mantine/core';
import { IconBrandGithub, IconHeartFilled } from '@tabler/icons-react';
import { PRODUCT_NAME, REPO_LINK, SPONSORS_LINK } from '~/app/config';
import { NavbarButton } from './NavbarButton';
import { NpmNavbarLinkButton } from './NpmNavbarLinkButton';

export function NavbarDynamicLinkButtons() {
  return (
    <Box hiddenFrom="sm">
      <NavbarButton
        icon={IconBrandGithub}
        title="View source code"
        description={`View ${PRODUCT_NAME} source code on GitHub`}
        color="gray"
        href={REPO_LINK}
      />
      <NpmNavbarLinkButton />
      <NavbarButton
        icon={IconHeartFilled}
        title="Sponsor the author"
        description={`Support the development of ${PRODUCT_NAME} by sponsoring its author on GitHub`}
        color="red"
        href={SPONSORS_LINK}
      />
    </Box>
  );
}
