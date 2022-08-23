import { Code, Container } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { DataTable } from 'mantine-datatable';
import ExampleContainer from '~/components/ExampleContainer';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';

const PATH = 'examples/basic-usage';

export default function Page() {
  return (
    <Container>
      <PageTitle of={PATH} />
      <ExampleContainer>
        <DataTable
          columns={[{ propertyName: 'name' }, { propertyName: 'bornIn' }, { propertyName: 'party' }]}
          records={[
            { id: 1, name: 'Joe Biden', bornIn: 1942, party: 'Democratic' },
            { id: 2, name: 'Donald Trump', bornIn: 1946, party: 'Republican' },
            { id: 3, name: 'Barack Obama', bornIn: 1961, party: 'Democratic' },
            { id: 4, name: 'George W. Bush', bornIn: 1946, party: 'Republican' },
            { id: 5, name: 'Bill Clinton', bornIn: 1946, party: 'Democratic' },
            { id: 6, name: 'George H. W. Bush', bornIn: 1924, party: 'Republican' },
            { id: 7, name: 'Ronald Reagan', bornIn: 1911, party: 'Republican' },
            { id: 8, name: 'Jimmy Carter', bornIn: 1924, party: 'Democratic' },
            { id: 9, name: 'Gerald Ford', bornIn: 1913, party: 'Republican' },
            { id: 10, name: 'Richard Nixon', bornIn: 1913, party: 'Republican' },
          ]}
        />
      </ExampleContainer>
      <PageText>
        In its most basic usage scenario, the <Code>DataTable</Code> component only requires <Code>records</Code> and{' '}
        <Code>columns</Code> properties to be set.
      </PageText>
      <Prism language="typescript">{`
// ...
return (
  <DataTable
    columns={[{ propertyName: 'name' }, { propertyName: 'bornIn' }, { propertyName: 'party' }]}
    records={[
      { id: 1, name: 'Joe Biden', bornIn: 1942, party: 'Democratic' },
      { id: 2, name: 'Donald Trump', bornIn: 1946, party: 'Republican' },
      { id: 3, name: 'Barack Obama', bornIn: 1961, party: 'Democratic' },
      { id: 4, name: 'George W. Bush', bornIn: 1946, party: 'Republican' },
      { id: 5, name: 'Bill Clinton', bornIn: 1946, party: 'Democratic' },
      { id: 6, name: 'George H. W. Bush', bornIn: 1924, party: 'Republican' },
      { id: 7, name: 'Ronald Reagan', bornIn: 1911, party: 'Republican' },
      { id: 8, name: 'Jimmy Carter', bornIn: 1924, party: 'Democratic' },
      { id: 9, name: 'Gerald Ford', bornIn: 1913, party: 'Republican' },
      { id: 10, name: 'Richard Nixon', bornIn: 1913, party: 'Republican' },
    ]}
  />
);
      `}</Prism>
      <PageNavigation of={PATH} />
    </Container>
  );
}
