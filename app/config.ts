import type { MantineColor } from '@mantine/core';
import {
  IconAdjustments,
  IconBrandCss3,
  IconHeartFilled,
  IconHeartHandshake,
  IconHome,
  IconList,
  IconQuestionMark,
  IconRocket,
  TablerIconsProps,
} from '@tabler/icons-react';

export const PRODUCT_NAME = 'Mantine DataTable';
export const PRODUCT_DESCRIPTION =
  'A fully-featured data-table/data-grid React component for building data-rich applications with Mantine UI';

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
export const REMIX_LINK = 'https://remix.run';
export const CRA_LINK = 'https://create-react-app.dev';
export const GATSBY_LINK = 'https://www.gatsbyjs.com';

export const MANTINE_CONTEXTMENU_LINK = `${WEB_ROOT}/mantine-contextmenu`;
export const MANTINE_CONTEXTMENU_PRODUCT_NAME = 'Mantine ContextMenu';

export const DOWNLOADS_REFRESH_INTERVAL = 1000 * 60 * 60 * 24; // 1 day

export type RouteInfo = {
  href: string;
  title: string;
  description: string;
} & ({ icon?: never; color?: never } | { icon: React.FC<TablerIconsProps>; color: MantineColor });

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
    description: `Learn how styling works in Mantine V7 and ${PRODUCT_NAME} V7`,
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
    href: '/examples/column-properties',
    title: 'Column properties',
    description: `Example: setting ${PRODUCT_NAME} column properties`,
  },
  {
    href: '/examples/column-grouping',
    title: 'Column grouping',
    description: `Example: group multiple ${PRODUCT_NAME} columns under a shared header`,
  },
  {
    href: '/examples/customizing-border-colors',
    title: 'Customizing border colors',
    description: `Example: how to customize the border colors of ${PRODUCT_NAME} and its displayed rows`,
  },
  {
    href: '/examples/non-standard-record-ids',
    title: 'Non-standard record IDs',
    description: `Example: using non-standard record IDs with ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/default-column-properies',
    title: 'Default column properties',
    description: `Example: using default column properties with ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/default-column-render',
    title: 'Default column render',
    description: `Example: using a default column render function with ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/empty-state',
    title: 'Empty state',
    description: `Example: ${PRODUCT_NAME} shows an empty state indicator when is provided with an empty array`,
  },
  {
    href: '/examples/records-selection',
    title: 'Records selection',
    description: `Example: how to enable multiple records selection on ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/row-actions-cell',
    title: 'Row actions cell',
    description: `Example: how to implement a row actions cell on ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/disabling-text-selection',
    title: 'Disabling text selection',
    description: `Example: disabling text selection on ${PRODUCT_NAME}`,
  },
  {
    href: '/examples/custom-row-or-cell-attributes',
    title: 'Custom row or cell attributes',
    description: `Example: How to add custom attributes to ${PRODUCT_NAME} rows or cells`,
  },
  {
    href: '/examples/using-with-auto-animate',
    title: 'Using bodyRef with AutoAnimate',
    description: `Example: How to use ${PRODUCT_NAME} bodyRef property with AutoAnimate`,
  },
  {
    href: '/type-definitions',
    title: 'Type definitions',
    description: `${PRODUCT_NAME} is written in TypeScript and its options are well documented with additional JSDoc annotations`,
    icon: IconAdjustments,
    color: 'grape',
  },
  {
    href: '/mantine-v6-support',
    title: 'Mantine V6 support',
    description: `${PRODUCT_NAME} is compatible with Mantine V7; if you're using Mantine V6, please check the old documentation website`,
    icon: IconQuestionMark,
    color: 'orange',
  },
  {
    href: '/contribute-and-support',
    title: 'Contribute and support',
    description: `Contribute and support the development of ${PRODUCT_NAME} by sponsoring or hiring its author, starring the repo, raising issues, bringing up new ideas and coming up with pull-requests`,
    icon: IconHeartFilled,
    color: 'red',
  },
  {
    href: '/hire-the-author',
    title: 'Hire the author',
    description: `Hire ${AUTHOR_NAME}, the author of ${PRODUCT_NAME}, a full-stack developer with 20+ years of experience`,
    icon: IconHeartHandshake,
    color: 'teal',
  },
  {
    href: `${REPO_LINK}/blob/main/CHANGELOG.md`,
    title: `Changelog`,
    description: `See ${PRODUCT_NAME} changelog`,
    icon: IconList,
    color: 'gray',
  },
];
