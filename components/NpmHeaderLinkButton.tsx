import { Box, Button } from '@mantine/core';
import { IconBrandNpm } from '@tabler/icons-react';
import { NPM_LINK, PRODUCT_NAME } from '~/app/config';
import { useNpmDownloads } from '~/lib/useNpmDownloads';

export function NpmHeaderLinkButton() {
  const downloads = useNpmDownloads();

  return (
    <Button
      size="xs"
      variant="default"
      leftSection={<IconBrandNpm size={24} />}
      component="a"
      aria-label={`View ${PRODUCT_NAME} package on npm`}
      href={NPM_LINK}
      target="_blank"
    >
      {downloads}
      <Box component="span" visibleFrom="md">
        nth
      </Box>
    </Button>
  );
}
