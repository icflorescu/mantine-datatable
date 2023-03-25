import React from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import DataTableFooter from '../../DataTableFooter';
import { defaultProps } from './DefaultProps';

describe('DataTableFooter', () => {
  beforeEach(() => {
    const { result } = renderHook(() => React.useRef<HTMLDivElement>(null));
    render(<DataTableFooter ref={result.current} {...defaultProps} />);
  });
  test('renders correctly with default props', () => {
    expect(screen.getByText('Showing 1-10 of 100 records')).toBeInTheDocument();
  });
});
