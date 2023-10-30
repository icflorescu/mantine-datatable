import { MantineColor } from '@mantine/core';

export type DataTableColorProps<T> = {
  /**
   * Data table text color.
   * Can be a `MantineColor` (key of `theme.colors` or any valid CSS color string),
   * or an object with `light` and `dark` keys and `MantineColor` values.
   */
  c?: MantineColor | { light: MantineColor; dark: MantineColor };

  /**
   * Data table background color.
   * Can be a `MantineColor` (key of `theme.colors` or any valid CSS color string),
   * or an object with `light` and `dark` keys and `MantineColor` values.
   */
  backgroundColor?: MantineColor | { light: MantineColor; dark: MantineColor };

  /**
   * Color of table borders, applied to all borders except row borders.
   * Can be a `MantineColor` (key of `theme.colors` or any valid CSS color string),
   * or an object with `light` and `dark` keys and `MantineColor` values.
   */
  borderColor?: MantineColor | { light: MantineColor; dark: MantineColor };

  /**
   * Color of row borders.
   * Can be a `MantineColor` (key of `theme.colors` or any valid CSS color string),
   * or an object with `light` and `dark` keys and `MantineColor` values.
   */
  rowBorderColor?: MantineColor | { light: MantineColor; dark: MantineColor };

  /**
   * Background color of striped rows.
   * Can be a `MantineColor` (key of `theme.colors` or any valid CSS color string),
   * or an object with `light` and `dark` keys and `MantineColor` values.
   */
  stripedColor?: MantineColor | { light: MantineColor; dark: MantineColor };

  /**
   * Background color of hover-highlighted row.
   * Can be a `MantineColor` (key of `theme.colors` or any valid CSS color string),
   * or an object with `light` and `dark` keys and `MantineColor` values.
   */
  highlightOnHoverColor?: MantineColor | { light: MantineColor; dark: MantineColor };

  /**
   * Data table row text color.
   * A function that accepts row data and returns color.
   * The returned color can be a `MantineColor` (key of `theme.colors` or any valid CSS color string),
   * or an object with `light` and `dark` keys and `MantineColor` values.
   */
  rowColor?: (record: T, index: number) => MantineColor | undefined | { light: MantineColor; dark: MantineColor };

  /**
   * Data table row background color.
   * A function that accepts row data and returns background color color.
   * Can be a `MantineColor` (key of `theme.colors` or any valid CSS color string),
   * or an object with `light` and `dark` keys and `MantineColor` values.
   */
  rowBackgroundColor?: (
    record: T,
    index: number
  ) => MantineColor | undefined | { light: MantineColor; dark: MantineColor };
};
