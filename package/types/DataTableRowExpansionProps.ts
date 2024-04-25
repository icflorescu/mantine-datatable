import type { DataTableRowExpansionCollapseProps } from './DataTableRowExpansionCollapseProps';

export type DataTableRowExpansionProps<T = Record<string, unknown>> = {
  /**
   * Function defining which records can be expanded.
   * Accepts an object with `record` and `index` properties and returns a boolean specifying
   * whether the row should be expandable.
   */
  expandable?: (params: { record: T; index: number }) => boolean;

  /**
   * Defines when rows should expand.
   * @default `click`
   */
  trigger?: 'click' | 'always' | 'never';

  /**
   * If true, multiple rows can be expanded at the same time.
   */
  allowMultiple?: boolean;

  /**
   * Function defining which records will be initially expanded.
   * Accepts an object with `record` and `index` properties and returns a boolean specifying
   * whether the row should be expanded initially.
   * Does nothing if `trigger === 'always'`.
   */
  initiallyExpanded?: (options: { record: T; index: number }) => boolean;

  /**
   * Additional properties passed to the Mantine Collapse component wrapping the custom content.
   */
  collapseProps?: DataTableRowExpansionCollapseProps;

  /**
   * An object defining the row expansion behavior in controlled mode.
   */
  expanded?: {
    /**
     * Currently expanded record IDs.
     */
    recordIds: unknown[];

    /**
     * Callback fired when expanded records change.
     * Receives an array containing the newly expanded record IDs.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRecordIdsChange?: React.Dispatch<React.SetStateAction<any[]>> | ((recordIds: unknown[]) => void);
  };

  /**
   * Function returning the custom content to be lazily rendered for an expanded row.
   * Accepts an object with properties containing the current record, its index,
   * and a `collapse()` callback that can be used to collapse the expanded row.
   * Must return a React node.
   */
  content: (params: { record: T; index: number; collapse: () => void }) => React.ReactNode;
};
