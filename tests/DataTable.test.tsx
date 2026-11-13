import { MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DataTable, type DataTableSortStatus } from '../package/index';
import { columns, type Person, people, renderDataTable } from './utils';

// Vitest's role engine only maps `<th>` elements to `columnheader` when they have a `scope` attribute,
// so header cells are located by their text inside `<thead>` instead
const headers = () => Array.from(document.querySelectorAll('thead th'), (th) => th.textContent);
const header = (name: string) => page.getByRole('rowgroup').first().getByText(name, { exact: true });

// Body rows only (rows inside `<tbody>` that contain data cells)
const bodyRows = () =>
  page
    .getByRole('row')
    .all()
    .filter((r) => r.element().closest('tbody') && r.element().querySelector('td'));

const cellTexts = (columnIndex: number) =>
  bodyRows().map((r) => r.element().querySelectorAll('td')[columnIndex]?.textContent);

function SortableTable({ onChange }: { onChange?: (s: DataTableSortStatus<Person>) => void }) {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Person>>({
    columnAccessor: 'firstName',
    direction: 'asc',
  });
  const records = [...people].sort((a, b) => {
    const key = sortStatus.columnAccessor as 'firstName' | 'age';
    const result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
    return sortStatus.direction === 'asc' ? result : -result;
  });
  return (
    <MantineProvider>
      <DataTable
        records={records}
        columns={[
          { accessor: 'firstName', sortable: true },
          { accessor: 'age', sortable: true },
        ]}
        sortStatus={sortStatus}
        onSortStatusChange={(s) => {
          onChange?.(s);
          setSortStatus(s);
        }}
      />
    </MantineProvider>
  );
}

function SelectableTable({
  isRecordSelectable,
  selectionTrigger,
}: {
  isRecordSelectable?: (record: Person) => boolean;
  selectionTrigger?: 'checkbox' | 'cell';
}) {
  const [selectedRecords, setSelectedRecords] = useState<Person[]>([]);
  return (
    <MantineProvider>
      <DataTable
        records={people}
        columns={columns}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        isRecordSelectable={isRecordSelectable}
        selectionTrigger={selectionTrigger}
      />
      <output data-testid="selection">{selectedRecords.map((r) => r.id).join(',')}</output>
    </MantineProvider>
  );
}

function PaginatedTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(2);
  const from = (pageNumber - 1) * recordsPerPage;
  return (
    <MantineProvider>
      <DataTable
        records={people.slice(from, from + recordsPerPage)}
        columns={columns}
        totalRecords={people.length}
        recordsPerPage={recordsPerPage}
        page={pageNumber}
        onPageChange={setPageNumber}
        recordsPerPageOptions={[2, 5]}
        onRecordsPerPageChange={(n) => {
          setRecordsPerPage(n);
          setPageNumber(1);
        }}
      />
    </MantineProvider>
  );
}

describe('rendering', () => {
  test('renders humanized column titles and nested accessor values', async () => {
    await renderDataTable();
    await expect.element(header('First name')).toBeVisible();
    expect(headers()).toEqual(['First name', 'Last name', 'Age', 'City']);
    expect(bodyRows()).toHaveLength(people.length);
    expect(cellTexts(3)).toEqual(people.map((p) => p.address.city));
  });

  test('uses custom render functions', async () => {
    await renderDataTable({
      columns: [{ accessor: 'name', render: ({ firstName, lastName }) => `${lastName}, ${firstName}` }],
    });
    await expect.element(page.getByRole('cell', { name: 'Lovelace, Ada' })).toBeVisible();
  });

  test('does not render hidden columns', async () => {
    await renderDataTable({ columns: [...columns.slice(0, 2), { accessor: 'age', hidden: true }] });
    await expect.element(header('First name')).toBeVisible();
    expect(headers()).toEqual(['First name', 'Last name']);
    expect(bodyRows()[0].element().querySelectorAll('td')).toHaveLength(2);
  });

  test('omits the header when noHeader is set', async () => {
    await renderDataTable({ noHeader: true });
    await expect.element(page.getByRole('cell', { name: 'Ada' })).toBeVisible();
    expect(headers()).toEqual([]);
  });

  test('renders a footer when columns define one', async () => {
    await renderDataTable({
      columns: [...columns.slice(0, 2), { accessor: 'age', footer: `Total: ${people.length}` }],
    });
    await expect.element(page.getByText(`Total: ${people.length}`)).toBeVisible();
  });

  test('renders column groups', async () => {
    await renderDataTable({
      columns: undefined,
      groups: [
        { id: 'name', columns: columns.slice(0, 2) },
        { id: 'other', title: 'Other info', columns: columns.slice(2) },
      ],
    });
    await expect.element(header('Other info')).toBeVisible();
    await expect.element(header('Name')).toBeVisible();
    await expect.element(header('City')).toBeVisible();
  });
});

describe('empty state', () => {
  test('shows the default empty state text when there are no records', async () => {
    await renderDataTable({ records: [] });
    await expect.element(page.getByText('No records')).toBeVisible();
  });

  test('shows a custom noRecordsText', async () => {
    await renderDataTable({ records: [], noRecordsText: 'Nothing to see here' });
    await expect.element(page.getByText('Nothing to see here')).toBeVisible();
  });

  test('does not show the empty state while fetching', async () => {
    await renderDataTable({ records: [], fetching: true });
    await expect.element(page.getByText('No records')).toBeInTheDocument();
    const emptyState = page.getByText('No records').element().closest('.mantine-datatable-empty-state')!;
    expect(emptyState.hasAttribute('data-active')).toBe(false);
    expect(getComputedStyle(emptyState).opacity).toBe('0');
  });
});

describe('sorting', () => {
  test('marks the sorted column and toggles direction when clicking its header', async () => {
    await render(<SortableTable />);
    await expect.element(page.getByRole('img', { name: 'Sorted ascending' })).toBeVisible();
    expect(cellTexts(0)).toEqual(['Ada', 'Alan', 'Grace', 'Linus', 'Margaret']);

    await page.getByRole('button', { name: /First name/ }).click();
    await expect.element(page.getByRole('img', { name: 'Sorted descending' })).toBeVisible();
    expect(cellTexts(0)).toEqual(['Margaret', 'Linus', 'Grace', 'Alan', 'Ada']);
  });

  test('sorts by another column, keeping the current direction', async () => {
    const onChange = vi.fn();
    await render(<SortableTable onChange={onChange} />);
    await page.getByRole('button', { name: /Age/ }).click();
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ columnAccessor: 'age', direction: 'asc' }));
    await expect.element(page.getByRole('img', { name: 'Not sorted' })).toBeVisible();
    expect(cellTexts(1)).toEqual(['36', '41', '56', '85', '89']);
  });

  test('sorts with the keyboard', async () => {
    await render(<SortableTable />);
    (page.getByRole('button', { name: /First name/ }).element() as HTMLElement).focus();
    await userEvent.keyboard('{Enter}');
    await expect.element(page.getByRole('img', { name: 'Sorted descending' })).toBeVisible();
  });
});

describe('selection', () => {
  const selection = () => page.getByTestId('selection');
  const selectAll = () => page.getByRole('checkbox', { name: 'Select all records' });
  const selectRecord = (n: number) => page.getByRole('checkbox', { name: `Select record ${n}` });

  test('selects and deselects individual records', async () => {
    await render(<SelectableTable />);
    await selectRecord(2).click();
    await selectRecord(4).click();
    await expect.element(selection()).toHaveTextContent('2,4');
    await expect.element(selectAll()).toBePartiallyChecked();
    await selectRecord(2).click();
    await expect.poll(() => selection().element().textContent).toBe('4');
  });

  test('selects and deselects all records', async () => {
    await render(<SelectableTable />);
    await selectAll().click();
    await expect.element(selection()).toHaveTextContent('1,2,3,4,5');
    await expect.element(selectAll()).toBeChecked();
    await selectAll().click();
    await expect.element(selection()).toBeEmptyDOMElement();
  });

  test('selects a range of records with Shift+click', async () => {
    await render(<SelectableTable />);
    await selectRecord(1).click();
    await userEvent.keyboard('{Shift>}');
    await selectRecord(4).click();
    await userEvent.keyboard('{/Shift}');
    await expect.element(selection()).toHaveTextContent('1,2,3,4');
  });

  test('respects isRecordSelectable', async () => {
    await render(<SelectableTable isRecordSelectable={(r) => r.age < 80} />);
    await expect.element(selectRecord(3)).toBeDisabled();
    await selectAll().click();
    await expect.element(selection()).toHaveTextContent('1,2,4');
    await expect.element(selectAll()).toBeChecked();
  });

  test('selects records by clicking the selector cell when selectionTrigger is "cell"', async () => {
    await render(<SelectableTable selectionTrigger="cell" />);
    const checkbox = selectRecord(3).element();
    (checkbox.closest('td') as HTMLElement).click();
    await expect.poll(() => selection().element().textContent).toBe('3');
  });
});

describe('pagination', () => {
  test('shows the pagination text and navigates between pages', async () => {
    await render(<PaginatedTable />);
    await expect.element(page.getByText('1 - 2 / 5')).toBeVisible();
    expect(cellTexts(0)).toEqual(['Ada', 'Alan']);

    await page.getByRole('button', { name: 'Next page' }).click();
    await expect.element(page.getByText('3 - 4 / 5')).toBeVisible();
    expect(cellTexts(0)).toEqual(['Grace', 'Linus']);

    await page.getByRole('button', { name: '3', exact: true }).click();
    await expect.element(page.getByText('5 - 5 / 5')).toBeVisible();
    expect(cellTexts(0)).toEqual(['Margaret']);
    await expect.element(page.getByRole('button', { name: 'Next page' })).toBeDisabled();

    await page.getByRole('button', { name: 'Previous page' }).click();
    await expect.element(page.getByText('3 - 4 / 5')).toBeVisible();
  });

  test('changes the number of records per page', async () => {
    await render(<PaginatedTable />);
    await page.getByRole('button', { name: '2', exact: true }).first().click();
    await page.getByRole('menuitem', { name: '5' }).click();
    await expect.element(page.getByText('1 - 5 / 5')).toBeVisible();
    expect(bodyRows()).toHaveLength(5);
  });

  test('does not show pagination without records', async () => {
    await renderDataTable({
      records: [],
      page: 1,
      onPageChange: () => undefined,
      totalRecords: 0,
      recordsPerPage: 10,
    });
    await expect.element(page.getByText('No records')).toBeVisible();
    await expect.element(page.getByRole('button', { name: 'Next page' })).not.toBeInTheDocument();
  });
});

describe('row & cell interaction', () => {
  test('calls onRowClick with the record and its index', async () => {
    const onRowClick = vi.fn();
    await renderDataTable({ onRowClick });
    await page.getByRole('cell', { name: 'Grace' }).click();
    expect(onRowClick).toHaveBeenCalledOnce();
    expect(onRowClick).toHaveBeenCalledWith(expect.objectContaining({ record: people[2], index: 2 }));
  });

  test('calls onCellClick with the record, column and column index', async () => {
    const onCellClick = vi.fn();
    await renderDataTable({ onCellClick });
    await page.getByRole('cell', { name: 'Hopper' }).click();
    expect(onCellClick).toHaveBeenCalledWith(
      expect.objectContaining({
        record: people[2],
        index: 2,
        columnIndex: 1,
        column: expect.objectContaining({ accessor: 'lastName' }),
      })
    );
  });

  test('calls onRowDoubleClick and onRowContextMenu', async () => {
    const onRowDoubleClick = vi.fn();
    const onRowContextMenu = vi.fn();
    await renderDataTable({ onRowDoubleClick, onRowContextMenu });
    await page.getByRole('cell', { name: 'Alan' }).dblClick();
    expect(onRowDoubleClick).toHaveBeenCalledWith(expect.objectContaining({ record: people[1], index: 1 }));
    await page.getByRole('cell', { name: 'Linus' }).click({ button: 'right' });
    expect(onRowContextMenu).toHaveBeenCalledWith(expect.objectContaining({ record: people[3], index: 3 }));
  });
});

describe('row expansion', () => {
  const content = ({ record, collapse }: { record: Person; collapse: () => void }) => (
    <div>
      <span>{`Details for ${record.firstName}`}</span>
      <button type="button" onClick={collapse}>
        Collapse {record.firstName}
      </button>
    </div>
  );

  test('expands a row when clicking it and collapses it on a second click', async () => {
    await renderDataTable({ rowExpansion: { content } });
    await expect.element(page.getByText('Details for Ada')).not.toBeInTheDocument();
    await page.getByRole('cell', { name: 'Ada' }).click();
    await expect.element(page.getByText('Details for Ada')).toBeVisible();
    await page.getByRole('cell', { name: 'Ada' }).click();
    await expect.element(page.getByText('Details for Ada')).not.toBeInTheDocument();
  });

  test('only keeps one row expanded unless allowMultiple is set', async () => {
    await renderDataTable({ rowExpansion: { content } });
    await page.getByRole('cell', { name: 'Ada' }).click();
    await page.getByRole('cell', { name: 'Alan' }).click();
    await expect.element(page.getByText('Details for Alan')).toBeVisible();
    await expect.element(page.getByText('Details for Ada')).not.toBeInTheDocument();
  });

  test('keeps multiple rows expanded when allowMultiple is set', async () => {
    await renderDataTable({ rowExpansion: { content, allowMultiple: true } });
    await page.getByRole('cell', { name: 'Ada' }).click();
    await page.getByRole('cell', { name: 'Alan' }).click();
    await expect.element(page.getByText('Details for Alan')).toBeVisible();
    await expect.element(page.getByText('Details for Ada')).toBeVisible();
  });

  test('collapses a row from its content', async () => {
    await renderDataTable({ rowExpansion: { content } });
    await page.getByRole('cell', { name: 'Grace' }).click();
    await page.getByRole('button', { name: 'Collapse Grace' }).click();
    await expect.element(page.getByText('Details for Grace')).not.toBeInTheDocument();
  });

  test('expands rows initially', async () => {
    await renderDataTable({ rowExpansion: { content, initiallyExpanded: ({ record }) => record.id === 4 } });
    await expect.element(page.getByText('Details for Linus')).toBeVisible();
  });

  test('always shows the content when trigger is "always"', async () => {
    await renderDataTable({ rowExpansion: { content, trigger: 'always' } });
    for (const { firstName } of people) {
      await expect.element(page.getByText(`Details for ${firstName}`)).toBeVisible();
    }
  });

  test('does not expand rows that are not expandable', async () => {
    await renderDataTable({ rowExpansion: { content, expandable: ({ record }) => record.id !== 1 } });
    await page.getByRole('cell', { name: 'Ada' }).click();
    await page.getByRole('cell', { name: 'Alan' }).click();
    await expect.element(page.getByText('Details for Alan')).toBeVisible();
    await expect.element(page.getByText('Details for Ada')).not.toBeInTheDocument();
  });
});

describe('column toggling & persistence', () => {
  const storeColumnsKey = 'people';
  const toggleableColumns = columns.map((c) => ({ ...c, toggleable: true }));

  test('hides a toggleable column and persists its state in localStorage', async () => {
    await renderDataTable({ columns: toggleableColumns, storeColumnsKey });
    await expect.element(header('Last name')).toBeVisible();
    const lastNameHeader = header('Last name').element().closest('th')!;
    (lastNameHeader.querySelector('[aria-label="Toggle column"] button') as HTMLElement).click();
    await expect.element(header('Last name')).not.toBeInTheDocument();
    expect(headers()).toEqual(['First name', 'Age', 'City']);

    const stored = JSON.parse(localStorage.getItem(`${storeColumnsKey}-columns-toggle`)!);
    expect(stored.find((c: { accessor: string }) => c.accessor === 'lastName').toggled).toBe(false);
  });

  test('restores column visibility from localStorage', async () => {
    localStorage.setItem(
      `${storeColumnsKey}-columns-toggle`,
      JSON.stringify(
        toggleableColumns.map(({ accessor }) => ({
          accessor,
          defaultToggle: true,
          toggleable: true,
          toggled: accessor !== 'age',
        }))
      )
    );
    await renderDataTable({ columns: toggleableColumns, storeColumnsKey });
    await expect.element(header('Age')).not.toBeInTheDocument();
    expect(headers()).toEqual(['First name', 'Last name', 'City']);
  });

  test('restores column order from localStorage', async () => {
    localStorage.setItem(
      `${storeColumnsKey}-columns-order`,
      JSON.stringify(['address.city', 'age', 'lastName', 'firstName'])
    );
    await renderDataTable({ columns: toggleableColumns, storeColumnsKey });
    await expect.poll(headers).toEqual(['City', 'Age', 'Last name', 'First name']);
  });

  test('falls back to the default column state when localStorage holds malformed data (#818)', async () => {
    localStorage.setItem(`${storeColumnsKey}-columns-toggle`, JSON.stringify({ not: 'an array' }));
    localStorage.setItem(`${storeColumnsKey}-columns-order`, JSON.stringify('nope'));
    await renderDataTable({ columns: toggleableColumns, storeColumnsKey });
    await expect.element(header('First name')).toBeVisible();
    expect(headers()).toEqual(['First name', 'Last name', 'Age', 'City']);
  });

  test('ignores localStorage values under an empty key when storeColumnsKey is not set (#845)', async () => {
    localStorage.setItem('', JSON.stringify([]));
    await renderDataTable();
    await expect.element(header('First name')).toBeVisible();
    expect(headers()).toEqual(['First name', 'Last name', 'Age', 'City']);
    expect(cellTexts(0)).toEqual(people.map((p) => p.firstName));
  });
});

describe('column groups', () => {
  // Header rows as `title|colSpan|rowSpan|pinned side` strings
  const headerRows = () =>
    Array.from(document.querySelectorAll('thead tr'), (tr) =>
      Array.from(
        tr.querySelectorAll('th'),
        (th) => `${th.textContent}|${th.colSpan}|${th.rowSpan}|${th.getAttribute('data-pinned') ?? ''}`
      )
    );

  const groups = [
    { id: 'name', columns: [{ accessor: 'firstName' }, { accessor: 'lastName' }] },
    { id: 'details', columns: [{ accessor: 'age' }, { accessor: 'address.city', title: 'City' }] },
  ] as const;

  test('renders group headers spanning their columns', async () => {
    await renderDataTable({ columns: undefined, groups: groups.map((g) => ({ ...g, columns: [...g.columns] })) });
    await expect.element(page.getByRole('table')).toBeVisible();
    expect(headerRows()).toEqual([
      ['Name|2|1|', 'Details|2|1|'],
      ['First name|1|1|', 'Last name|1|1|', 'Age|1|1|', 'City|1|1|'],
    ]);
  });

  test('splits a group header when one of its columns is pinned to the other side', async () => {
    await renderDataTable({
      columns: undefined,
      groups: [
        { id: 'name', columns: [{ accessor: 'firstName' }, { accessor: 'lastName', pinned: 'right' }] },
        { id: 'details', columns: [...groups[1].columns] },
      ],
    });
    await expect.element(page.getByRole('table')).toBeVisible();
    await expect.poll(headerRows).toEqual([
      ['Name|1|1|', 'Details|2|1|', 'Name|1|1|right'],
      ['First name|1|1|', 'Age|1|1|', 'City|1|1|', 'Last name|1|1|right'],
    ]);
  });

  test('keeps group headers in sync with toggled columns', async () => {
    localStorage.setItem(
      'grouped-columns-toggle',
      JSON.stringify(
        ['firstName', 'lastName', 'age', 'address.city'].map((accessor) => ({
          accessor,
          defaultToggle: true,
          toggleable: true,
          toggled: accessor !== 'age',
        }))
      )
    );
    await renderDataTable({
      columns: undefined,
      groups: groups.map((g) => ({ ...g, columns: g.columns.map((c) => ({ ...c, toggleable: true })) })),
      storeColumnsKey: 'grouped',
    });
    await expect.element(page.getByRole('table')).toBeVisible();
    await expect.poll(headerRows).toEqual([
      ['Name|2|1|', 'Details|1|1|'],
      ['First name|1|1|', 'Last name|1|1|', 'City|1|1|'],
    ]);
  });

  test('pins parent group headers in multilevel groups when all of their columns are pinned', async () => {
    await renderDataTable({
      columns: undefined,
      groups: [
        {
          id: 'person',
          groups: [
            {
              id: 'name',
              columns: [
                { accessor: 'firstName', pinned: 'left' },
                { accessor: 'lastName', pinned: 'left' },
              ],
            },
          ],
        },
        { id: 'details', columns: [...groups[1].columns] },
      ],
    });
    await expect.element(page.getByRole('table')).toBeVisible();
    await expect
      .poll(headerRows)
      .toEqual([
        ['Person|2|1|left', 'Details|2|2|'],
        ['Name|2|1|left'],
        ['First name|1|1|left', 'Last name|1|1|left', 'Age|1|1|', 'City|1|1|'],
      ]);
  });
});

describe('default column props', () => {
  test('applies defaultToggle from defaultColumnProps, with column props taking precedence', async () => {
    await renderDataTable({
      columns: [{ accessor: 'firstName', defaultToggle: true }, ...columns.slice(1)],
      defaultColumnProps: { toggleable: true, defaultToggle: false },
      storeColumnsKey: 'default-toggle',
    });
    await expect.element(page.getByRole('table')).toBeVisible();
    await expect.poll(headers).toEqual(['First name']);
  });

  test('makes columns toggleable from the header context menu via defaultColumnProps', async () => {
    await renderDataTable({ defaultColumnProps: { toggleable: true }, storeColumnsKey: 'default-toggleable' });
    await page.getByRole('rowgroup').first().click({ button: 'right' });
    await expect.element(page.getByRole('checkbox', { name: 'First name' })).toBeChecked();
    expect(page.getByRole('checkbox').all()).toHaveLength(columns.length);
    await page.getByRole('checkbox', { name: 'Age' }).click();
    await expect.poll(headers).toEqual(['First name', 'Last name', 'City']);
  });
});

describe('scrolling', () => {
  const manyPeople = Array.from({ length: 40 }, (_, i) => ({ ...people[i % people.length], id: i + 1 }));
  const viewport = () => document.querySelector<HTMLElement>('.mantine-datatable-scroll-area-viewport')!;

  test('becomes scrollable when height is set', async () => {
    await renderDataTable({ records: manyPeople, height: 300 });
    await expect.element(page.getByRole('table')).toBeVisible();
    expect(viewport().clientHeight).toBe(300);
    expect(viewport().scrollHeight).toBeGreaterThan(300);
  });

  test('becomes scrollable when only maxHeight is set', async () => {
    await renderDataTable({ records: manyPeople, maxHeight: 300 });
    await expect.element(page.getByRole('table')).toBeVisible();
    expect(document.querySelector<HTMLElement>('.mantine-datatable')!.offsetHeight).toBe(300);
    expect(viewport().clientHeight).toBe(300);
    viewport().scrollTop = viewport().scrollHeight;
    await expect.poll(() => viewport().scrollTop).toBeGreaterThan(0);
  });

  test('grows with its content when no height is set', async () => {
    await renderDataTable({ records: manyPeople });
    await expect.element(page.getByRole('table')).toBeVisible();
    expect(viewport().clientHeight).toBe(viewport().scrollHeight);
  });
});

describe('styling', () => {
  test('resolves function and array values of styles.table (#835)', async () => {
    await renderDataTable({
      styles: {
        table: [(theme) => ({ outlineColor: theme.colors.red[6] }), { outlineStyle: 'dashed' }],
      },
    });
    await expect.element(page.getByRole('table')).toBeVisible();
    const style = getComputedStyle(page.getByRole('table').element());
    expect(style.outlineStyle).toBe('dashed');
    expect(style.outlineColor).toBe('rgb(250, 82, 82)');
  });

  test('applies rowClassName and rowStyle per record', async () => {
    await renderDataTable({
      rowClassName: ({ age }) => (age > 80 ? 'senior' : undefined),
      rowStyle: ({ id }) => (id === 1 ? { fontStyle: 'italic' } : undefined),
    });
    await expect.element(page.getByRole('cell', { name: 'Ada' })).toBeVisible();
    expect(bodyRows().map((r) => r.element().classList.contains('senior'))).toEqual([false, false, true, false, true]);
    expect(getComputedStyle(bodyRows()[0].element()).fontStyle).toBe('italic');
  });
});
