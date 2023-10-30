import { parseThemeColor, type MantineTheme } from '@mantine/core';
import type { DataTableProps } from './types';

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
    '--mantine-datatable-color-light': c
      ? parseThemeColor({
          color: typeof c === 'object' ? c.light : c,
          theme,
        }).value
      : undefined,
    '--mantine-datatable-color-dark': c
      ? parseThemeColor({
          color: typeof c === 'object' ? c.dark : c,
          theme,
        }).value
      : undefined,

    '--mantine-datatable-background-color-light': backgroundColor
      ? parseThemeColor({
          color: typeof backgroundColor === 'object' ? backgroundColor.light : backgroundColor,
          theme,
        }).value
      : undefined,
    '--mantine-datatable-background-color-dark': backgroundColor
      ? parseThemeColor({
          color: typeof backgroundColor === 'object' ? backgroundColor.dark : backgroundColor,
          theme,
        }).value
      : undefined,

    '--mantine-datatable-border-color-light': borderColor
      ? parseThemeColor({
          color: typeof borderColor === 'object' ? borderColor.light : borderColor,
          theme,
        }).value
      : undefined,
    '--mantine-datatable-border-color-dark': borderColor
      ? parseThemeColor({
          color: typeof borderColor === 'object' ? borderColor.dark : borderColor,
          theme,
        }).value
      : undefined,

    '--mantine-datatable-row-border-color-light': rowBorderColor
      ? parseThemeColor({
          color: typeof rowBorderColor === 'object' ? rowBorderColor.light : rowBorderColor,
          theme,
        }).value
      : undefined,
    '--mantine-datatable-row-border-color-dark': rowBorderColor
      ? parseThemeColor({
          color: typeof rowBorderColor === 'object' ? rowBorderColor.dark : rowBorderColor,
          theme,
        }).value
      : undefined,

    '--mantine-datatable-striped-color-light': stripedColor
      ? parseThemeColor({
          color: typeof stripedColor === 'object' ? stripedColor.light : stripedColor,
          theme,
        }).value
      : undefined,
    '--mantine-datatable-striped-color-dark': stripedColor
      ? parseThemeColor({
          color: typeof stripedColor === 'object' ? stripedColor.dark : stripedColor,
          theme,
        }).value
      : undefined,

    '--mantine-datatable-highlight-on-hover-color-light': highlightOnHoverColor
      ? parseThemeColor({
          color: typeof highlightOnHoverColor === 'object' ? highlightOnHoverColor.light : highlightOnHoverColor,
          theme,
        }).value
      : undefined,
    '--mantine-datatable-highlight-on-hover-color-dark': highlightOnHoverColor
      ? parseThemeColor({
          color: typeof highlightOnHoverColor === 'object' ? highlightOnHoverColor.dark : highlightOnHoverColor,
          theme,
        }).value
      : undefined,
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
    '--mantine-datatable-pagination-active-text-color-light': paginationActiveTextColor
      ? parseThemeColor({
          color:
            typeof paginationActiveTextColor === 'object' ? paginationActiveTextColor.light : paginationActiveTextColor,
          theme,
        }).value
      : undefined,
    '--mantine-datatable-pagination-active-text-color-dark': paginationActiveTextColor
      ? parseThemeColor({
          color:
            typeof paginationActiveTextColor === 'object' ? paginationActiveTextColor.dark : paginationActiveTextColor,
          theme,
        }).value
      : undefined,

    '--mantine-datatable-pagination-active-background-color-light': paginationActiveBackgroundColor
      ? parseThemeColor({
          color:
            typeof paginationActiveBackgroundColor === 'object'
              ? paginationActiveBackgroundColor.light
              : paginationActiveBackgroundColor,
          theme,
        }).value
      : undefined,
    '--mantine-datatable-pagination-active-background-color-dark': paginationActiveBackgroundColor
      ? parseThemeColor({
          color:
            typeof paginationActiveBackgroundColor === 'object'
              ? paginationActiveBackgroundColor.dark
              : paginationActiveBackgroundColor,
          theme,
        }).value
      : undefined,
  };
}
