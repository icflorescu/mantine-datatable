import { MantineSize } from '@mantine/core';
import { DataTable, DataTableVerticalAlignment } from 'mantine-datatable';
import ExampleContainer from '~/components/ExampleContainer';
import companies from '~/data/companies.json';

export default function BasicTablePropertiesExample({
  withVerticalBorders,
  striped,
  highlightOnHover,
  customizeHorizontalSpacing,
  horizontalSpacing,
  customizeVerticalSpacing,
  verticalSpacing,
  customizeFontSize,
  fontSize,
  customizeVerticalAlignment,
  verticalAligment,
}: {
  withVerticalBorders: boolean;
  striped: boolean;
  highlightOnHover: boolean;
  customizeHorizontalSpacing: boolean;
  horizontalSpacing: MantineSize;
  customizeVerticalSpacing: boolean;
  verticalSpacing: MantineSize;
  customizeFontSize: boolean;
  fontSize: MantineSize;
  customizeVerticalAlignment: boolean;
  verticalAligment: DataTableVerticalAlignment;
}) {
  // example-start
  // ...
  return (
    <ExampleContainer>
      {/* prettier-ignore */}
      <DataTable
        withVerticalBorders={withVerticalBorders}
        striped={striped}
        highlightOnHover={highlightOnHover}
        horizontalSpacing={customizeHorizontalSpacing ? horizontalSpacing : undefined}
        verticalSpacing={customizeVerticalSpacing ? verticalSpacing : undefined}
        fontSize={customizeFontSize ? fontSize : undefined}
        verticalAlignment={customizeVerticalAlignment ? verticalAligment : undefined}
        columns={[
          { accessor: 'name' },
          { accessor: 'missionStatement', width: 150 },
          { accessor: 'streetAddress' },
          { accessor: 'city' },
          { accessor: 'state' }
        ]}
        records={companies}
      />
    </ExampleContainer>
  );
  // example-end
}
