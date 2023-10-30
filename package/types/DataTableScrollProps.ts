export type DataTableScrollProps = {
  /**
   * Function to call when the DataTable is scrolled.
   */
  onScroll?: (position: { x: number; y: number }) => void;

  /**
   * Function to call when the DataTable is scrolled to top.
   */
  onScrollToTop?: () => void;

  /**
   * Function to call when the DataTable is scrolled to bottom.
   */
  onScrollToBottom?: () => void;

  /**
   * Function to call when the DataTable is scrolled to left.
   */
  onScrollToLeft?: () => void;

  /**
   * Function to call when the DataTable is scrolled to right.
   */
  onScrollToRight?: () => void;
};
