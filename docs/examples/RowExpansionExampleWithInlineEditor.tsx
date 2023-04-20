import { Box, Button, createStyles, Grid, Group, TextInput } from '@mantine/core';
import { IconArrowBackUp, IconCheck } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { useState } from 'react';
import { Company, companies as companyData } from '~/data';

const initialRecords = companyData.slice(0, 5);

// example-start with-inline-editor-row-expansion
const useStyles = createStyles((theme) => ({
  details: { background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0] },
}));

type CompanyEditorProps = {
  initialData: Company;
  onDone: (data: Company) => void;
  onCancel: () => void;
};

function CompanyEditor({ initialData, onDone, onCancel }: CompanyEditorProps) {
  const [name, setName] = useState(initialData.name);
  const [city, setCity] = useState(initialData.city);
  const [state, setState] = useState(initialData.state);
  const [streetAddress, setStreetAddress] = useState(initialData.streetAddress);
  const [missionStatement, setMissionStatement] = useState(initialData.missionStatement);

  const { classes } = useStyles();
  return (
    <Box className={classes.details} p="md">
      <Grid>
        <Grid.Col span={12} xs={6}>
          <TextInput label="Name" size="xs" value={name} onChange={(e) => setName(e.currentTarget.value)} />
        </Grid.Col>
        {/* example-skip other fields */}
        <Grid.Col span={12} xs={4}>
          <TextInput label="City" size="xs" value={city} onChange={(e) => setCity(e.currentTarget.value)} />
        </Grid.Col>
        <Grid.Col span={12} xs={2}>
          <TextInput label="State" size="xs" value={state} onChange={(e) => setState(e.currentTarget.value)} />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Street address"
            size="xs"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Mission statement"
            size="xs"
            value={missionStatement}
            onChange={(e) => setMissionStatement(e.currentTarget.value)}
          />
        </Grid.Col>
        {/* example-resume */}
        <Grid.Col span={12}>
          <Group position="center">
            <Button variant="default" size="xs" leftIcon={<IconArrowBackUp size={16} />} onClick={() => onCancel()}>
              Cancel
            </Button>
            <Button
              size="xs"
              leftIcon={<IconCheck size={16} />}
              onClick={() =>
                onDone({
                  ...initialData,
                  name: name.trim(),
                  city: city.trim(),
                  state: state.trim(),
                  streetAddress: streetAddress.trim(),
                  missionStatement: missionStatement.trim(),
                })
              }
            >
              Save
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
// example-end

export default function RowExpansionExampleWithInlineEditor() {
  // example-start with-inline-editor-table
  const [companies, setCompanies] = useState(initialRecords);
  return (
    <DataTable
      withBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowExpansion={{
        content: ({ record, collapse }) => (
          <CompanyEditor
            initialData={record}
            onDone={(data) => {
              const index = companies.findIndex((c) => c.id === data.id);
              setCompanies([...companies.slice(0, index), data, ...companies.slice(index + 1)]);
              collapse();
            }}
            onCancel={collapse}
          />
        ),
      }}
    />
  );
  // example-end
}
