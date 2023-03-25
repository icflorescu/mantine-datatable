import { renderHook } from '@testing-library/react-hooks';

import { useRowExpansion } from '../../hooks';
import { DataTableRowExpansionProps } from '../../types';
import { act } from '@testing-library/react';

describe('useRowExpansion', () => {
  const records = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
  ];

  it('should return values for expanding multiple rows', () => {
    const rowExpansion: DataTableRowExpansionProps<unknown> = {
      trigger: 'click',
      allowMultiple: true,
      content: () => <div>Alekinho</div>,
    };
    const { result } = renderHook(() => useRowExpansion({ rowExpansion, records, idAccessor: 'id' }));

    expect(result.current?.expandOnClick).toBe(true);
    expect(result.current?.isRowExpanded(records[0])).toBe(false);

    act(() => {
      result.current?.expandRow(records[0]);
    });

    expect(result.current?.isRowExpanded(records[0])).toBe(true);

    act(() => {
      result.current?.expandRow(records[1]);
    });

    expect(result.current?.isRowExpanded(records[0])).toBe(true);
    expect(result.current?.isRowExpanded(records[1])).toBe(true);

    act(() => {
      result.current?.collapseRow(records[0]);
    });
    expect(result.current?.isRowExpanded(records[0])).toBe(false);
    expect(result.current?.isRowExpanded(records[1])).toBe(true);

    expect(result.current?.content).toBeDefined();
  });
});
