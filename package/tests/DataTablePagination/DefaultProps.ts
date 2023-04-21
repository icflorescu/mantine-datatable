export const defaultProps = {
  topBorderColor: '#000000',
  fetching: false,
  page: 1,
  onPageChange: jest.fn(),
  paginationColor: 'blue',
  paginationSize: 'md',
  loadingText: 'Loading...',
  noRecordsText: 'No records found',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paginationText: ({ from, to, totalRecords }: any) => `Showing ${from}-${to} of ${totalRecords} records`,
  getPaginationControlProps: (control: 'previous' | 'next') => {
    if (control === 'previous') {
      return { 'aria-label': 'Previous page' };
    } else if (control === 'next') {
      return { 'aria-label': 'Next page' };
    }
    return {};
  },
  totalRecords: 100,
  recordsPerPage: 10,
  onRecordsPerPageChange: jest.fn(),
  recordsPerPageLabel: 'Records per page',
  recordsPerPageOptions: [5, 10, 20],
  recordsLength: 10,
  horizontalSpacing: 'sm',
  paginationWrapBreakpoint: 'lg',
};
