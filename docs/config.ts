import { MantineColor } from '@mantine/core';
import { FC } from 'react';
import { Adjustments, HeartHandshake, Home, Lifebuoy, Rocket } from 'tabler-icons-react';

export const SEO_DEFAULT_TITLE = 'Mantine DataTable';
export const SEO_DEFAULT_DESCRIPTION =
  'A fully featured table component for building data-rich applications with Mantine UI';

export const HEADER_HEIGHT = 56;
export const FOOTER_HEIGHT_BELOW_NAVBAR_BREAKPOINT = 128;
export const FOOTER_HEIGHT_ABOVE_NAVBAR_BREAKPOINT = 48;
export const NAVBAR_WIDTH = 280;
export const NAVBAR_BREAKPOINT = 'md';

export const AUTHOR_LINK = 'https://github.com/icflorescu';
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
        path: 'row-context-menu',
        title: 'Row context menu',
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
  {
    path: 'component-properties',
    title: 'Component properties',
    description:
      'Mantine DataTable component is written in TypeScript and its properties are well documented with additional JSDoc annotations',
    color: 'grape',
    icon: Adjustments,
  },
  {
    path: 'contribute-and-support',
    title: 'Contribute & support',
    description: 'Make a pull-request or support the development of this project',
    color: 'teal',
    icon: Lifebuoy,
  },
  {
    path: 'hire-the-author',
    title: 'Hire the author',
    description: 'Hire the services of a fullstack/frontend developer with 20+ years of experience',
    color: 'red',
    icon: HeartHandshake,
  },
];
