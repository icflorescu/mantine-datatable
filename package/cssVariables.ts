import { parseThemeColor, type MantineColor, type MantineTheme } from '@mantine/core';
import type { DataTableProps } from './types';

export function getColor(
  color: MantineColor | undefined | { light: MantineColor; dark: MantineColor },
  theme: MantineTheme,
  colorScheme: 'light' | 'dark'
) {
  return color
    ? parseThemeColor({
        color: typeof color === 'object' ? color[colorScheme] : color,
        theme,
      }).value
    : undefined;
}

export function getTableCssVariables({
  theme,
  c,
  backgroundColor,
  borderColor,
  rowBorderColor,
  stripedColor,
  highlightOnHoverColor,
}: Pick<
  DataTableProps,
  'c' | 'backgroundColor' | 'borderColor' | 'rowBorderColor' | 'stripedColor' | 'highlightOnHoverColor'
> & {
  theme: MantineTheme;
}) {
  return {
    '--mantine-datatable-color-light': getColor(c, theme, 'light'),
    '--mantine-datatable-color-dark': getColor(c, theme, 'dark'),

    '--mantine-datatable-background-color-light': getColor(backgroundColor, theme, 'light'),
    '--mantine-datatable-background-color-dark': getColor(backgroundColor, theme, 'dark'),

    '--mantine-datatable-border-color-light': getColor(borderColor, theme, 'light'),
    '--mantine-datatable-border-color-dark': getColor(borderColor, theme, 'dark'),

    '--mantine-datatable-row-border-color-light': getColor(rowBorderColor, theme, 'light'),
    '--mantine-datatable-row-border-color-dark': getColor(rowBorderColor, theme, 'dark'),

    '--mantine-datatable-striped-color-light': getColor(stripedColor, theme, 'light'),
    '--mantine-datatable-striped-color-dark': getColor(stripedColor, theme, 'dark'),

    '--mantine-datatable-highlight-on-hover-color-light': getColor(highlightOnHoverColor, theme, 'light'),
    '--mantine-datatable-highlight-on-hover-color-dark': getColor(highlightOnHoverColor, theme, 'dark'),
  };
}

export function getPaginationCssVariables({
  theme,
  paginationActiveTextColor,
  paginationActiveBackgroundColor,
}: Pick<DataTableProps, 'paginationActiveTextColor' | 'paginationActiveBackgroundColor'> & {
  theme: MantineTheme;
}) {
  return {
    '--mantine-datatable-pagination-active-text-color-light': getColor(paginationActiveTextColor, theme, 'light'),
    '--mantine-datatable-pagination-active-text-color-dark': getColor(paginationActiveTextColor, theme, 'dark'),

    '--mantine-datatable-pagination-active-background-color-light': getColor(
      paginationActiveBackgroundColor,
      theme,
      'light'
    ),
    '--mantine-datatable-pagination-active-background-color-dark': getColor(
      paginationActiveBackgroundColor,
      theme,
      'dark'
    ),
  };
}

export function getRowCssVariables({
  theme,
  color,
  backgroundColor,
}: {
  theme: MantineTheme;
  color: MantineColor | undefined | { light: MantineColor; dark: MantineColor };
  backgroundColor: MantineColor | undefined | { light: MantineColor; dark: MantineColor };
}) {
  return {
    '--mantine-datatable-row-color-light': getColor(color, theme, 'light'),
    '--mantine-datatable-row-color-dark': getColor(color, theme, 'dark'),
    '--mantine-datatable-row-background-color-light': getColor(backgroundColor, theme, 'light'),
    '--mantine-datatable-row-background-color-dark': getColor(backgroundColor, theme, 'dark'),
  };
}
