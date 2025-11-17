import { Group, Stack, Text } from '@mantine/core';
import {
  IconArrowDown,
  IconDiscountCheck,
  IconExternalLink,
  IconHeartFilled,
  IconInfoCircle,
  IconScale,
} from '@tabler/icons-react';
import clsx from 'clsx';
import {
  AUTHOR_LINK,
  LICENSE_LINK,
  MANTINE_CONTEXTMENU_LINK,
  MANTINE_CONTEXTMENU_PRODUCT_NAME,
  MANTINE_LINK,
  REPO_LINK,
  SPONSORS_LINK,
  V6_WEBSITE_LINK,
} from '~/app/config';
import { ExternalLink } from '~/components/ExternalLink';
import classes from './HomePageSubtitle.module.css';
import { PackageUsersAnchor } from './PackageUsersAnchor';

export function HomePageSubtitle() {
  return (
    <Stack gap={4}>
      <Group gap={8} align="flex-start" wrap="nowrap">
        <IconDiscountCheck className={clsx(classes.leftIcon, classes.iconGreen)} />
        <Text size="sm">
          used and trusted by{' '}
          <PackageUsersAnchor className="nowrap">
            major companies <IconArrowDown className={clsx(classes.linkIcon, classes.scrollDownIcon)} />
          </PackageUsersAnchor>
        </Text>
      </Group>
      <Group gap={8} align="flex-start" wrap="nowrap">
        <IconDiscountCheck className={clsx(classes.leftIcon, classes.iconGreen)} />
        <Text size="sm">
          built by <ExternalLink to={AUTHOR_LINK}>the creator</ExternalLink> of{' '}
          <ExternalLink className="nowrap" to={MANTINE_CONTEXTMENU_LINK}>
            {MANTINE_CONTEXTMENU_PRODUCT_NAME} <IconExternalLink className={classes.linkIcon} />
          </ExternalLink>{' '}
          and these <ExternalLink to={`${REPO_LINK}/graphs/contributors`}>awesome people</ExternalLink>
        </Text>
      </Group>
      <Group gap={8} align="flex-start" wrap="nowrap">
        <IconScale className={clsx(classes.leftIcon, classes.iconGreen)} />
        <Text size="sm">
          open-source <ExternalLink to={REPO_LINK}>on GitHub</ExternalLink> with a{' '}
          <ExternalLink to={LICENSE_LINK}>permissive license</ExternalLink>
        </Text>
      </Group>
      <Group gap={8} align="flex-start" wrap="nowrap">
        <IconHeartFilled className={clsx(classes.leftIcon, classes.iconRed)} />
        <Text size="sm">
          supported by <ExternalLink to={SPONSORS_LINK}>generous people like you</ExternalLink>
        </Text>
      </Group>
      <Group gap={8} align="flex-start" wrap="nowrap">
        <IconDiscountCheck className={clsx(classes.leftIcon, classes.iconBlue)} />
        <Text size="sm">
          compatible with{' '}
          <ExternalLink className="nowrap" to={MANTINE_LINK}>
            Mantine V8.x <IconExternalLink className={classes.linkIcon} />
          </ExternalLink>
        </Text>
      </Group>
      <Group gap={8} align="flex-start" wrap="nowrap">
        <IconInfoCircle className={clsx(classes.leftIcon, classes.iconRed)} />
        <Text size="sm">
          old version compatible with <ExternalLink to="https://v6.mantine.dev">Mantine V6</ExternalLink>{' '}
          <span className="nowrap">
            available{' '}
            <ExternalLink className="nowrap" to={V6_WEBSITE_LINK}>
              here <IconExternalLink className={classes.linkIcon} />
            </ExternalLink>
          </span>
        </Text>
      </Group>
    </Stack>
  );
}
