import type { MantineNumberSize, MantineShadow } from '@mantine/core';
import type { DataTableContextMenuItemProps } from './DataTableContextMenuItemProps';

export type DataTableContextMenuProps<T> = {
  /**
   * Context menu trigger; defaults to `rightClick` for classic behavior
   */
  trigger?: 'rightClick' | 'click';

  /**
   * Menu z-index; defaults to `3`
   */
  zIndex?: number;

  /**
   * Menu border radius; defaults to `xs`
   */
  borderRadius?: MantineNumberSize;

  /**
   * Menu shadow; defaults to `sm`
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
