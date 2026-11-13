import type { Route } from 'next';
import { MANTINE_LINK, PRODUCT_NAME, REPO_LINK, V6_WEBSITE_LINK } from '~/app/config';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { getRouteMetadata } from '~/lib/utils';

const PATH: Route = '/mantine-v6-support';
export const metadata = getRouteMetadata(PATH);

const MAJOR_VERSION = process.env.PACKAGE_VERSION.split('.')[0];

export default function MantineV6SupportPage() {
  return (
    <>
      <PageTitle of={PATH} />
      <Txt title="TL;DR" idea>
        If you’re still using <ExternalLink to="https://v6.mantine.dev">Mantine V6</ExternalLink>, you’ll need to use{' '}
        <ExternalLink to={V6_WEBSITE_LINK}>{PRODUCT_NAME} V6</ExternalLink>, which has its own documentation website.
      </Txt>
      <Txt>
        {PRODUCT_NAME} V7 was a major release with{' '}
        <ExternalLink to={`${REPO_LINK}/blob/main/CHANGELOG.md`}>breaking changes</ExternalLink>, made to support{' '}
        <ExternalLink to="https://v7.mantine.dev">Mantine V7</ExternalLink>.
      </Txt>
      <Txt>
        One of the breaking changes in Mantine V7 was the{' '}
        <ExternalLink to={`${MANTINE_LINK}/changelog/7-0-0/#migration-to-native-css`}>
          migration to native CSS
        </ExternalLink>
        : in Mantine V6, styling was done with CSS-in-JS (<ExternalLink to="https://emotion.sh">Emotion</ExternalLink>
        ), while from V7 onwards it’s done with native CSS files.
        <br />
        Hence, {PRODUCT_NAME} V7 and newer versions can’t be used with Mantine V6.
      </Txt>
      <Txt>
        Since then, the major version of {PRODUCT_NAME} has followed the major version of Mantine it supports. The
        current version, {PRODUCT_NAME} {MAJOR_VERSION}, requires <ExternalLink to={MANTINE_LINK}>Mantine</ExternalLink>{' '}
        {MAJOR_VERSION} and React 19.
      </Txt>
      <Txt info>
        If you’re planning to upgrade your application from Mantine V6, make sure to read the{' '}
        <InternalLink to="/styling">styling guide</InternalLink> to understand how styles are loaded in newer versions.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
