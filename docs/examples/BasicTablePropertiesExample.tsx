import { MantineSize } from '@mantine/core';
import { DataTable, DataTableVerticalAlignment } from 'mantine-datatable';
import companies from '~/data/companies.json';

const records = companies.slice(0, 5);

export default function BasicTablePropertiesExample({
  withBorder,
  noHeader,
  customizeBorderRadius,
  borderRadius,
  customizeShadow,
  shadow,
  withColumnBorders,
  striped,
  highlightOnHover,
  customizeHorizontalSpacing,
  horizontalSpacing,
  customizeVerticalSpacing,
  verticalSpacing,
  customizeFontSize,
  fontSize,
  customizeVerticalAlignment,
  verticalAlignment,
}: {
  withBorder: boolean;
  noHeader: boolean;
  customizeBorderRadius: boolean;
  borderRadius: MantineSize;
  customizeShadow: boolean;
  shadow: MantineSize;
  withColumnBorders: boolean;
  striped: boolean;
  highlightOnHover: boolean;
  customizeHorizontalSpacing: boolean;
  horizontalSpacing: MantineSize;
  customizeVerticalSpacing: boolean;
  verticalSpacing: MantineSize;
  customizeFontSize: boolean;
  fontSize: MantineSize;
  customizeVerticalAlignment: boolean;
  verticalAlignment: DataTableVerticalAlignment;
}) {
  // example-start
  return (
    // prettier-ignore
    <DataTable
      withBorder={withBorder}
      noHeader={noHeader}
      borderRadius={customizeBorderRadius ? borderRadius : undefined}
      shadow={customizeShadow ? shadow : undefined}
      withColumnBorders={withColumnBorders}
      striped={striped}
      highlightOnHover={highlightOnHover}
      horizontalSpacing={customizeHorizontalSpacing ? horizontalSpacing : undefined}
      verticalSpacing={customizeVerticalSpacing ? verticalSpacing : undefined}
      fontSize={customizeFontSize ? fontSize : undefined}
      verticalAlignment={customizeVerticalAlignment ? verticalAlignment : undefined}
      columns={[
        { accessor: 'name' },
        { accessor: 'missionStatement', width: 150 },
        { accessor: 'streetAddress' },
        { accessor: 'city' },
        { accessor: 'state' }
      ]}
      records={records}
    />
  );
  // example-end
}
