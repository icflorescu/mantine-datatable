import { Container } from '@mantine/core';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageSubtitle from '~/components/PageSubtitle';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';

const PATH = 'learn-the-basics';

export default function Page() {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        This guide will help you get familiar with core Mantine DataTable concepts. Please read this guide and refer to
        the example sections before starting development to learn about all available features.
      </PageText>
      <PageSubtitle value="Theming, styling and dark color scheme" />
      <PageText>
        The DataTable component is built almost exclusively with Mantine primitives and respects all{' '}
        <ExternalLink to="https://mantine.dev/pages/basics/#theming">Mantine theming and styling concepts</ExternalLink>
        , including <ExternalLink to="https://mantine.dev/pages/basics/#theming">dark color theme support</ExternalLink>
        .
      </PageText>
      <PageSubtitle value="Basic usage" />
      <PageText>To be written...</PageText>
      <PageSubtitle value="Using pagination" />
      <PageText>To be written...</PageText>
      <PageSubtitle value="Etc." />
      <PageText>To be written...</PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
