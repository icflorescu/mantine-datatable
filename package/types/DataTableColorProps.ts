import { MantineColor } from '@mantine/core';

export type DataTableColorProps = {
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
};
