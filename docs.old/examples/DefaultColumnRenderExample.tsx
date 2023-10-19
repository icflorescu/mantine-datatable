import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DataTable } from 'mantine-datatable';

dayjs.extend(relativeTime);

export default function DefaultColumnRenderExample() {
  return (
    <DataTable
      withBorder
      withColumnBorders
      striped
      records={[
        { bookTitle: 'The Lord of the Rings', published: new Date(1954, 6, 29) },
        // example-skip more records
        { bookTitle: 'The Hobbit', published: new Date(1937, 9, 21) },
        { bookTitle: 'The Silmarillion', published: new Date(1977, 9, 15) },
        { bookTitle: 'The Children of Húrin', published: new Date(2007, 9, 25) },
        { bookTitle: 'The Fall of Gondolin', published: new Date(2018, 9, 25) },
        { bookTitle: 'The Lay of Aotrou and Itroun', published: new Date(2019, 9, 25) },
        { bookTitle: 'The Lays of Beleriand', published: new Date(2019, 9, 25) },
        { bookTitle: 'The Book of Lost Tales, Part One', published: new Date(1984, 9, 25) },
        { bookTitle: 'The Book of Lost Tales, Part Two', published: new Date(1984, 9, 25) },
        // example-resume
      ]}
      idAccessor="bookTitle"
      columns={[
        { accessor: 'bookTitle', width: '100%' },
        { accessor: 'published', textAlignment: 'right', ellipsis: true },
      ]}
      defaultColumnRender={(row, _, accessor) => {
        const data = row[accessor as keyof typeof row];
        return typeof data === 'string' ? data : dayjs(data).fromNow();
      }}
    />
  );
}
