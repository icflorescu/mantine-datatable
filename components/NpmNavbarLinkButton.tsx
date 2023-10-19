import { IconBrandNpm } from '@tabler/icons-react';
import { NPM_LINK, PRODUCT_NAME } from '~/app/config';
import { useNpmDownloads } from '~/lib/useNpmDownloads';
import { NavbarButton } from './NavbarButton';

export function NpmNavbarLinkButton() {
  const downloads = useNpmDownloads();
  return (
    <NavbarButton
      icon={IconBrandNpm}
      title={`Go to the npm package (${downloads})`}
      description={`See ${PRODUCT_NAME} package on npm`}
      color="gray"
      href={NPM_LINK}
    />
  );
}
