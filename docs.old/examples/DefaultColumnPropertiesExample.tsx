import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DataTable } from 'mantine-datatable';

dayjs.extend(relativeTime);

export default function DefaultColumnPropertiesExample() {
  return (
    <DataTable
      withBorder
      withColumnBorders
      striped
      records={[
        { id: 1, bookTitle: 'The Lord of the Rings', published: new Date(1954, 6, 29), pages: 1178, chapters: 37 },
        // example-skip more records
        { id: 2, bookTitle: 'The Hobbit', published: new Date(1937, 9, 21), pages: 310, chapters: 19 },
        { id: 3, bookTitle: 'The Silmarillion', published: new Date(1977, 9, 15), pages: 365, chapters: 24 },
        { id: 4, bookTitle: 'The Children of Húrin', published: new Date(2007, 9, 25), pages: 313, chapters: 14 },
        { id: 5, bookTitle: 'The Fall of Gondolin', published: new Date(2018, 9, 25), pages: 304, chapters: 3 },
        { id: 6, bookTitle: 'The Lay of Aotrou and Itroun', published: new Date(2019, 9, 25), pages: 128, chapters: 1 },
        { id: 7, bookTitle: 'The Lays of Beleriand', published: new Date(2019, 9, 25), pages: 400, chapters: 2 },
        {
          id: 8,
          bookTitle: 'The Book of Lost Tales, Part One',
          published: new Date(1984, 9, 25),
          pages: 297,
          chapters: 2,
        },
        {
          id: 9,
          bookTitle: 'The Book of Lost Tales, Part Two',
          published: new Date(1984, 9, 25),
          pages: 297,
          chapters: 2,
        },
        // example-resume
      ]}
      columns={[
        { accessor: 'bookTitle', width: '100%', textAlignment: 'left' },
        {
          accessor: 'published',
          render: ({ published }) => dayjs(published).fromNow(),
        },
        { accessor: 'pages' },
        { accessor: 'chapters' },
      ]}
      defaultColumnProps={{
        textAlignment: 'right',
        noWrap: true,
        ellipsis: true,
        cellsSx: { fontStyle: 'italic' },
        titleSx: (theme) => ({ '&&': { color: theme.colors.green[6] } }),
      }}
    />
  );
}
