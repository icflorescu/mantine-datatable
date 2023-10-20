import type { MantineShadow, MantineSize } from '@mantine/core';
import type { DataTableContextMenuItemProps } from './DataTableContextMenuItemProps';

// todo: can we use Mantine ContextMenu as an external dependency?
export type DataTableContextMenuProps<T> = {
  /**
   * Context menu trigger.
   * @default `rightClick`
   */
  trigger?: 'rightClick' | 'click';

  /**
   * Menu z-index.
   * @default `3`
   */
  zIndex?: number;

  /**
   * Menu border radius.
   * @default `xs`
   */
  borderRadius?: MantineSize | (string & NonNullable<unknown>) | number;

  /**
   * Menu shadow.
   * @default `sm`
   */
  shadow?: MantineShadow;

  /**
   * Boolean or a function accepting the current record and its index as arguments and returning a boolean value;
   * if true, the menu will not be shown
   */
  hidden?: boolean | ((record: T, recordIndex: number) => boolean);

  /**
   * Function accepting the current record and its index as arguments and returning the row menu items
   */
  items: (record: T, recordIndex: number) => DataTableContextMenuItemProps[];
};
