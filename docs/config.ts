import { MantineColor } from '@mantine/core';
import { FC } from 'react';
import { Adjustments, Home, Rocket, Star } from 'tabler-icons-react';

export const HEADER_HEIGHT = 56;
export const NAVBAR_WIDTH = 280;
export const NAVBAR_BREAKPOINT = 'md';
export const REPO_LINK = 'https://github.com/icflorescu/mantine-datatable';

export const PAGES: (
  | {
      icon: FC<{ size?: string | number }>;
      color?: MantineColor;
      title: string;
      path?: string;
      items?: never;
    }
  | {
      icon?: never;
      color?: MantineColor;
      title: string;
      path: string;
      items: { title: string; path: string }[];
    }
)[] = [
  { icon: Home, title: 'Home' },
  { icon: Rocket, color: 'orange', title: 'Getting started', path: 'getting-started' },
  { icon: Star, color: 'grape', title: 'Learn the basics', path: 'learn-the-basics' },
  { icon: Adjustments, color: 'cyan', title: 'Component properties', path: 'component-properties' },
  {
    color: 'green',
    title: 'Examples',
    path: 'examples',
    items: [
      { title: 'Basic usage', path: 'basic-usage' },
      { title: 'Customize basic properties', path: 'customize-basic-properties' },
      { title: 'Scrollable vs. auto-height', path: 'scrollable-vs-auto-height' },
      { title: 'Column media-queries', path: 'column-media-queries' },
      { title: 'Temp', path: 'temp' },
    ],
  },
];
