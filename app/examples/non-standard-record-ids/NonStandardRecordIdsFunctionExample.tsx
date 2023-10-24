'use client';

// example-start
import { DataTable } from '__PACKAGE__';

export function NonStandardRecordIdsFunctionExample() {
  return (
    <DataTable
      withTableBorder
      withColumnBorders
      striped
      records={[
        { bookTitle: 'The Fellowship of the Ring', character: 'Frodo Baggins', bornIn: 2968 },
        // example-skip more records
        { bookTitle: 'The Fellowship of the Ring', character: 'Samwise Gamgee', bornIn: 2980 },
        { bookTitle: 'The Fellowship of the Ring', character: 'Meriadoc Brandybuck', bornIn: 2982 },
        { bookTitle: 'The Fellowship of the Ring', character: 'Peregrin Took', bornIn: 2990 },
        { bookTitle: 'The Fellowship of the Ring', character: 'Gandalf', bornIn: 1000 },
        { bookTitle: 'The Fellowship of the Ring', character: 'Aragorn son of Arathorn', bornIn: 2931 },
        { bookTitle: 'The Fellowship of the Ring', character: 'Legolas', bornIn: 2931 },
        { bookTitle: 'The Fellowship of the Ring', character: 'Gimli son of Gloin', bornIn: 2879 },
        { bookTitle: 'The Fellowship of the Ring', character: 'Boromir son of Denethor', bornIn: 2978 },
        { bookTitle: 'The Two Towers', character: 'Frodo Baggins', bornIn: 2968 },
        { bookTitle: 'The Two Towers', character: 'Samwise Gamgee', bornIn: 2980 },
        { bookTitle: 'The Two Towers', character: 'Meriadoc Brandybuck', bornIn: 2982 },
        { bookTitle: 'The Two Towers', character: 'Peregrin Took', bornIn: 2990 },
        { bookTitle: 'The Two Towers', character: 'Gandalf', bornIn: 1000 },
        { bookTitle: 'The Two Towers', character: 'Aragorn son of Arathorn', bornIn: 2931 },
        { bookTitle: 'The Two Towers', character: 'Legolas', bornIn: 2931 },
        { bookTitle: 'The Two Towers', character: 'Gimli son of Gloin', bornIn: 2879 },
        { bookTitle: 'The Two Towers', character: 'Boromir son of Denethor', bornIn: 2978 },
        { bookTitle: 'The Return of the King', character: 'Frodo Baggins', bornIn: 2968 },
        { bookTitle: 'The Return of the King', character: 'Samwise Gamgee', bornIn: 2980 },
        { bookTitle: 'The Return of the King', character: 'Meriadoc Brandybuck', bornIn: 2982 },
        { bookTitle: 'The Return of the King', character: 'Peregrin Took', bornIn: 2990 },
        { bookTitle: 'The Return of the King', character: 'Gandalf', bornIn: 1000 },
        // example-resume
      ]}
      columns={[
        { accessor: 'character', width: '100%' },
        { accessor: 'bornIn', textAlign: 'right' },
        { accessor: 'bookTitle', noWrap: true },
      ]}
      /**
       * Non-standard record ID.
       * In this case we're using a function that returns a "composite" ID
       */
      idAccessor={({ bookTitle, character }) => `${bookTitle}:${character}`}
    />
  );
}
// example-end
