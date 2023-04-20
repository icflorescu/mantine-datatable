import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { DataTableRowExpansionCollapseProps } from './DataTableRowExpansionCollapseProps';

export type DataTableRowExpansionProps<T> = {
  /**
   * Defines when rows should expand; defaults to `click`
   */
  trigger?: 'click' | 'always' | 'never';

  /**
   * If true, multiple rows can be expanded at the same time
   */
  allowMultiple?: boolean;

  /**
   * Function defining which records will be initially expanded;
   * does nothing if `trigger === 'always'`
   */
  initiallyExpanded?: (record: T, recordIndex: number) => boolean;

  /**
   * Additional properties passed to the Mantine Collapse component wrapping the custom content
   */
  collapseProps?: DataTableRowExpansionCollapseProps;

  /**
   * An object defining the row expansion behavior in controlled mode
   */
  expanded?: {
    /**
     * Currently expanded record IDs
     */
    recordIds: unknown[];

    /**
     * Callback fired when expanded records change;
     * receives an array containing the newly expanded record IDs
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRecordIdsChange?: Dispatch<SetStateAction<any[]>> | ((recordIds: unknown[]) => void);
  };

  /**
   * Function returning the custom content to be lazily rendered for an expanded row;
   * accepts the current record and a `collapse()` callback that can be used to collapse the expanded row
   */
  content: (props: { record: T; recordIndex: number; collapse: () => void }) => ReactNode;
};
