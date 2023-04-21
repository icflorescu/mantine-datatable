import { render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import DataTablePagination from '../../DataTablePagination';
import { defaultProps } from './DefaultProps';

describe('DataTablePagination', () => {
  beforeEach(() => {
    const { result } = renderHook(() => React.useRef<HTMLDivElement>(null));
    render(<DataTablePagination ref={result.current} {...defaultProps} />);
  });
  test('renders correctly with default props', () => {
    expect(screen.getByText('Showing 1-10 of 100 records')).toBeInTheDocument();
  });
});
