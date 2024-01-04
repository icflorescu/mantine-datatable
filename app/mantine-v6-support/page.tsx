import type { Route } from 'next';
import { MANTINE_LINK, PRODUCT_NAME, REPO_LINK, V6_WEBSITE_LINK } from '~/app/config';
import { ExternalLink } from '~/components/ExternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { getRouteMetadata } from '~/lib/utils';

const PATH: Route = '/mantine-v6-support';
export const metadata = getRouteMetadata(PATH);

export default function MantineV6SupportPage() {
  return (
    <>
      <PageTitle of={PATH} />
      <Txt title="TLDR" idea>
        If you are still using <ExternalLink to="https://v6.mantine.dev">Mantine V6</ExternalLink>, you’ll need to use{' '}
        <ExternalLink to={V6_WEBSITE_LINK}>{PRODUCT_NAME} V6</ExternalLink>.
      </Txt>
      <Txt>
        {PRODUCT_NAME} V7 is a major release with{' '}
        <ExternalLink to={`${REPO_LINK}/blob/main/CHANGELOG.md`}>breaking changes</ExternalLink> and is compatible with{' '}
        <ExternalLink to={MANTINE_LINK}>Mantine V7</ExternalLink>.
      </Txt>
      <Txt>One of the breaking changes in Mantine V7 was the migration to native CSS.</Txt>
      <Txt>
        In Mantine V6, the styling was done with CSS-in-JS (<ExternalLink to="https://emotion.sh">Emotion</ExternalLink>
        ), while in Mantine V7 it is done with native CSS.
        <br />
        Hence, you won’t be able to use {PRODUCT_NAME} V7 with Mantine V6.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
