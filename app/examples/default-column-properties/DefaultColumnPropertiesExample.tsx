import { DataTable } from '__PACKAGE__';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function DefaultColumnPropertiesExample() {
  return (
    <DataTable
      withTableBorder
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
        { accessor: 'bookTitle', width: '100%', textAlign: 'left' },
        {
          accessor: 'published',
          render: ({ published }) => dayjs(published).fromNow(),
        },
        { accessor: 'pages' },
        { accessor: 'chapters' },
      ]}
      defaultColumnProps={{
        textAlign: 'right',
        noWrap: true,
        ellipsis: true,
        // 👇 the `cellsStyle` function receives the record and the column accessor as arguments,
        //    but we're not using them in this example
        cellsStyle: () => ({ fontStyle: 'italic' }),
        titleStyle: (theme) => ({ color: theme.colors.green[6] }),
      }}
    />
  );
}
