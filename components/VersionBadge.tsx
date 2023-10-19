import { Badge, Box, Menu, MenuDropdown, MenuItem, MenuTarget } from '@mantine/core';
import { IconChevronDown, IconExternalLink } from '@tabler/icons-react';
import { V6_WEBSITE_LINK } from '~/app/config';
import classes from './VersionBadge.module.css';

export function VersionBadge() {
  return (
    <Menu withArrow>
      <MenuTarget>
        <Badge
          className={classes.root}
          variant="filled"
          color="gray"
          rightSection={
            <Box mt={4} ml={-3} mr={-5}>
              <IconChevronDown size={10} stroke={3} />
            </Box>
          }
          role="button"
        >
          {process.env.PACKAGE_VERSION}
        </Badge>
      </MenuTarget>
      <MenuDropdown>
        <MenuItem
          rightSection={
            <Box mb={-5}>
              <IconExternalLink size={16} />
            </Box>
          }
          component="a"
          href={V6_WEBSITE_LINK}
          target="_blank"
          td="underline"
          c="blue"
        >
          View V6 docs
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
}
