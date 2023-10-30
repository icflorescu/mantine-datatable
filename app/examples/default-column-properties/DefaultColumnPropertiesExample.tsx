'use client';

import { DataTable } from '__PACKAGE__';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const records = [
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
];

const average = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
const minPublishingDateYearsAgo = dayjs().diff(Math.min(...records.map((r) => r.published.valueOf())), 'years');
const maxPublishingDateYearsAgo = dayjs().diff(Math.max(...records.map((r) => r.published.valueOf())), 'years');

export function DefaultColumnPropertiesExample() {
  return (
    <DataTable
      withTableBorder
      withColumnBorders
      striped
      records={records}
      columns={[
        { accessor: 'bookTitle', width: '100%', textAlign: 'left' },
        {
          accessor: 'published',
          render: ({ published }) => dayjs(published).fromNow(),
          footer: `${maxPublishingDateYearsAgo} to ${minPublishingDateYearsAgo} years ago`,
        },
        {
          accessor: 'pages',
          footer: `μ ${Math.round(average(records.map((r) => r.pages)))}`,
        },
        {
          accessor: 'chapters',
          footer: `μ ${Math.round(average(records.map((r) => r.chapters)))}`,
        },
      ]}
      defaultColumnProps={{
        textAlign: 'right',
        noWrap: true,
        ellipsis: true,

        // 👇 customize cell style based on record data and Mantine theme
        cellsStyle: ({ bookTitle }) =>
          bookTitle === 'The Hobbit' ? (theme) => ({ fontStyle: 'italic', color: theme.colors.red[6] }) : undefined,
        // ...or you could simply return this, if you don't use the record data and Mantine theme:
        //    `cellsStyle: () => ({ fontStyle: 'italic', color: '#F00' })`

        // 👇 customize column title style based on Mantine theme
        titleStyle: (theme) => ({ color: theme.colors.green[6] }),
        // ...or you could simply return an object, if you don't use Mantine theme:
        //    `titleStyle: { color: '#0F0' }`

        footerStyle: (theme) => ({ color: theme.colors.blue[6] }),
      }}
    />
  );
}
