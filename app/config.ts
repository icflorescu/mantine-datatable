import type { MantineColor } from '@mantine/core';
import type { Icon } from '@tabler/icons-react';
import {
  IconAdjustments,
  IconBrandCss3,
  IconHeartHandshake,
  IconHome,
  IconList,
  IconQuestionMark,
  IconRobot,
  IconRocket,
  IconThumbUp,
} from '@tabler/icons-react';
import type { Route } from 'next';

export const PRODUCT_NAME = 'Mantine DataTable';
export const PRODUCT_DESCRIPTION =
  'A fully-featured React data table/data grid component for Mantine UI, trusted by thousands of developers and companies around the world, including Microsoft';

export const WEB_ROOT = 'https://icflorescu.github.io';
export const WEBSITE_LINK = `${WEB_ROOT}/${process.env.PACKAGE_NAME}`;
export const V6_WEBSITE_LINK = `${WEB_ROOT}/${process.env.PACKAGE_NAME}-v6`;

export const AUTHOR_NAME = 'Ionut-Cristian Florescu';
export const AUTHOR_LINK = 'https://github.com/icflorescu';
export const REPO_LINK = `${AUTHOR_LINK}/${process.env.PACKAGE_NAME}`;
export const LICENSE_LINK = `${REPO_LINK}/blob/main/LICENSE`;
export const NPM_LINK = `https://www.npmjs.com/package/${process.env.PACKAGE_NAME}`;
export const SPONSORS_LINK = 'https://github.com/sponsors/icflorescu';
export const MANTINE_LINK = 'https://mantine.dev';
export const NEXTJS_LINK = 'https://nextjs.org';
export const VITE_LINK = 'https://vitejs.dev';
export const GATSBY_LINK = 'https://www.gatsbyjs.com';

export const MANTINE_CONTEXTMENU_LINK = `${WEB_ROOT}/mantine-contextmenu`;
export const MANTINE_CONTEXTMENU_PRODUCT_NAME = 'Mantine ContextMenu';

export const DOWNLOADS_REFRESH_INTERVAL = 1000 * 60 * 60 * 24; // 1 day

export const DOCSEARCH_APP_ID = 'QTPWIJ4FEH';
export const DOCSEARCH_INDEX_NAME = 'mantine-datatable';
export const DOCSEARCH_API_KEY = 'b6e1b8f8ada26b807cb65d32ad33ac21';

export type RouteInfo = {
  href: Route;
  title: string;
  description: string;
} & ({ icon?: never; color?: never } | { icon: Icon; color: MantineColor });

export const EXAMPLES_ROUTE_COLOR: MantineColor = 'green';

export const ROUTES: RouteInfo[] = [
  {
    href: '/',
    title: 'Home',
    description: PRODUCT_DESCRIPTION,
    icon: IconHome,
    color: 'blue',
  },
  {
    href: '/getting-started',
    title: 'Getting started',
    description: `Learn how to get started with ${PRODUCT_NAME}`,
    icon: IconRocket,
    color: 'orange',
  },
  {
    href: '/styling',
    title: 'Styling',
    description: `Learn how styling works in ${PRODUCT_NAME} and how to make sure your styles are applied in the correct order`,
    icon: IconBrandCss3,
    color: 'pink',
  },
  {
    href: '/examples/basic-usage',
    title: 'Basic usage',
    description: `Example: basic usage of ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/basic-table-properties',
    title: 'Basic table properties',
    description: `Example: how to set the basic ${PRODUCT_NAME} properties`,
  },
  {
    href: '/examples/overriding-the-default-styles',
    title: 'Overriding the default styles',
    description: `Example: how to override the default ${PRODUCT_NAME} styles`,
  },
  {
    href: '/examples/column-properties-and-styling',
    title: 'Column properties and styling',
    description: `Example: setting ${PRODUCT_NAME} column properties and customizing their styling`,
  },
  {
    href: '/examples/column-grouping',
    title: 'Column grouping',
    description: `Example: group multiple ${PRODUCT_NAME} columns under a shared header`,
  },
  {
    href: '/examples/default-column-properties',
    title: 'Default column properties',
    description: `Example: using default column properties with ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/default-column-render',
    title: 'Default column render',
    description: `Example: using a default column render function with ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/row-styling',
    title: 'Row styling',
    description: `Example: styling ${PRODUCT_NAME} rows based on their data`,
  },
  {
    href: '/examples/non-standard-record-ids',
    title: 'Non-standard record IDs',
    description: `Example: using non-standard record IDs with ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/scrollable-vs-auto-height',
    title: 'Scrollable vs. auto-height',
    description: `Example: how to make ${PRODUCT_NAME} vertically scrollable`,
  },
  {
    href: '/examples/scrolling-a-row-into-view',
    title: 'Scrolling a row into view',
    description: `Example: how to scroll a ${PRODUCT_NAME} row into view`,
  },
  {
    href: '/examples/empty-state',
    title: 'Empty state',
    description: `Example: ${PRODUCT_NAME} shows a customizable empty state indicator when its records array is empty`,
  },
  {
    href: '/examples/pagination',
    title: 'Pagination',
    description: `Example: using paged data with ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/sorting',
    title: 'Sorting',
    description: `Example: sorting data with ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/column-dragging-and-toggling',
    title: 'Column dragging and toggling',
    description: `Example: dragging & toggling ${PRODUCT_NAME} columns`,
  },
  {
    href: '/examples/row-dragging',
    title: 'Row dragging',
    description: `Example: dragging ${PRODUCT_NAME} rows`,
  },
  {
    href: '/examples/column-resizing',
    title: 'Column resizing',
    description: `Example: resizing ${PRODUCT_NAME} columns`,
  },
  {
    href: '/examples/infinite-scrolling',
    title: 'Infinite scrolling',
    description: `Example: how to implement infinite scrolling with ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/searching-and-filtering',
    title: 'Searching and filtering',
    description: `Example: searching and filtering data with ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/records-selection',
    title: 'Records selection',
    description: `Example: how to enable multiple records selection with ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/handling-row-clicks',
    title: 'Handling row clicks',
    description: `Example: handling row click events on ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/handling-cell-clicks',
    title: 'Handling cell clicks',
    description: `Example: handling cell click events on ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/using-with-mantine-contextmenu',
    title: `Using with ${MANTINE_CONTEXTMENU_PRODUCT_NAME}`,
    description: `Example: how to use ${PRODUCT_NAME} with ${MANTINE_CONTEXTMENU_PRODUCT_NAME}`,
  },
  {
    href: '/examples/expanding-rows',
    title: 'Expanding rows',
    description: `Example: the row expansion feature of ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/nested-tables',
    title: 'Nested tables',
    description: `Example: how to implement nested tables with ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/nested-tables-with-async-data-loading',
    title: 'Nested tables with async data loading',
    description: `Example: how to implement nested tables with async data loading using ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/nested-tables-with-async-data-loading-and-sorting',
    title: 'Nested tables with async data loading and sorting',
    description: `Example: how to implement nested tables with async data loading and sorting using ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/row-actions-cell',
    title: 'Row actions cell',
    description: `Example: how to implement a row actions cell on ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/pinning-the-last-column',
    title: 'Pinning the last column',
    description: `Example: how to pin the last column on ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/pinning-the-first-column',
    title: 'Pinning the first column',
    description: `Example: how to pin the first column on ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/pinning-arbitrary-columns',
    title: 'Pinning arbitrary columns',
    description: `Example: how to pin arbitrary columns on ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/rtl-support',
    title: 'RTL support',
    description: `Example: ${PRODUCT_NAME} supports right-to-left (RTL) languages such as Arabic, Hebrew and Persian`,
  },
  {
    href: '/examples/links-or-buttons-inside-clickable-rows-or-cells',
    title: 'Links or buttons inside clickable rows or cells',
    description: `Example: how to add links or buttons inside ${PRODUCT_NAME} clickable rows or cells`,
  },
  {
    href: '/examples/disabling-text-selection',
    title: 'Disabling text selection',
    description: `Example: disabling text selection on ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/asynchronous-data-loading',
    title: 'Asynchronous data loading',
    description: `Example: loading data asynchronously with ${PRODUCT_NAME} and customizing the loader`,
  },
  {
    href: '/examples/custom-row-or-cell-attributes',
    title: 'Custom row or cell attributes',
    description: `Example: how to add custom attributes to ${PRODUCT_NAME} rows or cells`,
  },
  {
    href: '/examples/using-with-auto-animate',
    title: 'Using bodyRef with AutoAnimate',
    description: `Example: how to use the ${PRODUCT_NAME} bodyRef property with AutoAnimate`,
  },
  {
    href: '/examples/complex-usage-scenario',
    title: 'Complex usage scenario',
    description: `Example: a complex usage scenario for ${PRODUCT_NAME} with TanStack Query data loading, sorting, pagination, custom cell rendering, row selection and more`,
  },
  {
    href: '/type-definitions',
    title: 'Type definitions',
    description: `${PRODUCT_NAME} is written in TypeScript and its properties are documented with JSDoc annotations`,
    icon: IconAdjustments,
    color: 'grape',
  },
  {
    href: '/llms-txt',
    title: 'LLMs.txt',
    description: `${PRODUCT_NAME} documentation in LLM-friendly formats, so AI assistants and coding agents can help you use it`,
    icon: IconRobot,
    color: 'cyan',
  },
  {
    href: '/mantine-v6-support',
    title: 'Mantine V6 support',
    description: `${PRODUCT_NAME} V7+ requires Mantine V7 or newer; if you're still using Mantine V6, please check the old documentation website`,
    icon: IconQuestionMark,
    color: 'orange',
  },
  {
    href: '/contribute-and-support',
    title: 'Contribute and support',
    description: `Support ${PRODUCT_NAME} by sponsoring or hiring its author, starring the repo, reporting issues, suggesting ideas or opening pull requests`,
    icon: IconThumbUp,
    color: 'red',
  },
  {
    href: '/hire-the-author',
    title: 'Hire the author',
    description: `Hire ${AUTHOR_NAME}, the author of ${PRODUCT_NAME}, a hands-on fractional CTO and product builder with 25+ years of experience`,
    icon: IconHeartHandshake,
    color: 'teal',
  },
  {
    href: `${REPO_LINK}/blob/main/CHANGELOG.md` as Route,
    title: `Changelog`,
    description: `See the ${PRODUCT_NAME} changelog`,
    icon: IconList,
    color: 'gray',
  },
];
