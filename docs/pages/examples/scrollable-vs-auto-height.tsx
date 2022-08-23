import { Container } from '@mantine/core';
import PageNavigation from '~/components/PageNavigation';
import PageTitle from '~/components/PageTitle';

const PATH = 'examples/scrollable-vs-auto-height';

export default function Page() {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
