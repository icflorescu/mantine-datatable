import { MantineColor } from '@mantine/core';
import { FC } from 'react';
import { Adjustments, Home, Rocket } from 'tabler-icons-react';

export const SEO_DEFAULT_TITLE = 'Mantine DataTable';
export const SEO_DEFAULT_DESCRIPTION =
  'A fully featured table component for building data-rich applications with Mantine UI';

export const HEADER_HEIGHT = 56;
export const FOOTER_HEIGHT = 48;
export const NAVBAR_WIDTH = 280;
export const NAVBAR_BREAKPOINT = 'md';
export const REPO_LINK = 'https://github.com/icflorescu/mantine-datatable';

export const PAGES: ({ title: string; color?: MantineColor; description?: string } & (
  | {
      path?: string;
      icon: FC<{ size?: string | number }>;
      items?: never;
    }
  | {
      path: string;
      icon?: never;
      items: { path: string; title: string; description?: string }[];
    }
))[] = [
  { title: 'Home', description: SEO_DEFAULT_DESCRIPTION, icon: Home },
  {
    path: 'getting-started',
    title: 'Getting started',
    description: 'How to install the package, its dependencies and how to import and use it in your application',
    color: 'orange',
    icon: Rocket,
  },
  {
    path: 'examples',
    title: 'Examples',
    color: 'green',
    items: [
      { path: 'basic-usage', title: 'Basic usage', description: 'Example: basic usage' },
      {
        path: 'basic-table-properties',
        title: 'Basic table properties',
        description: 'Example: how to set the basic table properties',
      },
      {
        path: 'non-standard-record-ids',
        title: 'Non-standard record IDs',
        description: 'Example: using non-standard record IDs',
      },
      {
        path: 'column-properties',
        title: 'Column properties',
        description: 'Example: setting column properties',
      },
      {
        path: 'scrollable-vs-auto-height',
        title: 'Scrollable vs. auto-height',
        description: 'Example: how to make the table vertically scrollable',
      },
      {
        path: 'empty-state',
        title: 'Empty state',
        description: 'Example: component shows an empty state indicator when is provided with an empty array',
      },
      {
        path: 'pagination',
        title: 'Pagination',
        description: 'Example: using paged data',
      },
      {
        path: 'sorting',
        title: 'Sorting',
        description: 'Example: sorting data',
      },
      {
        path: 'records-selection',
        title: 'Records selection',
        description: 'Example: how to enable multiple records selection',
      },
      {
        path: 'handling-row-clicks',
        title: 'Handling row clicks',
        description: 'Example: handling row click events',
      },
      {
        path: 'context-menu',
        title: 'Context menu',
        description: 'Example: working with row context menus',
      },
      {
        path: 'asynchronous-data-loading',
        title: 'Asynchronous data loading',
        description: 'Example: loading data asynchronously',
      },
      {
        path: 'complex-usage',
        title: 'Complex usage',
        description: 'Example: a complex usage scenario',
      },
    ],
  },
  { icon: Adjustments, color: 'grape', title: 'Component properties', path: 'component-properties' },
];
