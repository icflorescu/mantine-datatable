import { DataTable } from '__PACKAGE__';

export function NonStandardRecordIdsStringExample() {
  return (
    <DataTable
      withTableBorder
      withColumnBorders
      striped
      records={[
        { name: 'Joe Biden', bornIn: 1942 },
        // example-skip more records
        { name: 'Donald Trump', bornIn: 1946 },
        { name: 'Barack Obama', bornIn: 1961 },
        { name: 'George W. Bush', bornIn: 1946 },
        { name: 'Bill Clinton', bornIn: 1946 },
        { name: 'George H. W. Bush', bornIn: 1924 },
        { name: 'Ronald Reagan', bornIn: 1911 },
        { name: 'Jimmy Carter', bornIn: 1924 },
        { name: 'Gerald Ford', bornIn: 1913 },
        { name: 'Richard Nixon', bornIn: 1913 },
        // example-resume
      ]}
      columns={[
        { accessor: 'name', width: '100%' },
        { accessor: 'bornIn', textAlign: 'right' },
      ]}
      /**
       * Non-standard record ID.
       * In this case we're using the `name` property, but we could also use dot-notation to access
       * a nested object property value.
       */
      idAccessor="name"
    />
  );
}
