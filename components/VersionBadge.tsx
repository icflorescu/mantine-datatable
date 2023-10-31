import { Badge, Box, Popover, PopoverDropdown, PopoverTarget, Text } from '@mantine/core';
import { IconAlertSquareRoundedFilled, IconChevronDown, IconExternalLink } from '@tabler/icons-react';
import { V6_WEBSITE_LINK } from '~/app/config';
import { ExternalLink } from './ExternalLink';
import classes from './VersionBadge.module.css';

export function VersionBadge() {
  return (
    <Popover withArrow shadow="sm">
      <PopoverTarget>
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
      </PopoverTarget>
      <PopoverDropdown w={160}>
        <Text size="xs" ta="center">
          <Box component="span" c="red">
            <IconAlertSquareRoundedFilled />
          </Box>
          <br />
          This version works with Mantine V7.
          <br />
          If you’re still using <ExternalLink to="https://v6.mantine.dev">Mantine V6</ExternalLink>, check the old
          version{' '}
          <ExternalLink to={V6_WEBSITE_LINK}>
            here
            <IconExternalLink className={classes.linkIcon} size={14} />
          </ExternalLink>
          .
        </Text>
      </PopoverDropdown>
    </Popover>
  );
}
