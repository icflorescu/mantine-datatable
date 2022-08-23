import { Container } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import ExampleContainer from '~/components/ExampleContainer';
import PageNavigation from '~/components/PageNavigation';
import PageTitle from '~/components/PageTitle';

const PATH = 'examples/customize-basic-properties';

export default function Page() {
  return (
    <Container>
      <PageTitle of={PATH} />
      <ExampleContainer>
        <DataTable
          minHeight="none"
          columns={[{ propertyName: 'name' }, { propertyName: 'email' }]}
          records={[
            { id: 1, name: 'Donald Trump', email: 'the.orange.man@example.com' },
            { id: 2, name: 'Joe Biden', email: 'joe.biden@example.com' },
          ]}
        />
      </ExampleContainer>
      <PageNavigation of={PATH} />
    </Container>
  );
}
