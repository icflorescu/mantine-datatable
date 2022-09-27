import memoize from 'lodash/memoize';
import { PAGES } from '~/config';

export const isExternalLink = (path: string) => path.startsWith('http://') || path.startsWith('https://');

type PageInfo = { path: string; title: string; description?: string };

const flattenedPages: PageInfo[] = [];
for (const { path, title, items } of PAGES) {
  if (!items) {
    if (path && !isExternalLink(path)) {
      flattenedPages.push({ path: path || '', title });
    }
  } else {
    for (const { title: itemTitle, path: itemPath } of items) {
      flattenedPages.push({ path: `${path}/${itemPath}`, title: `${title} › ${itemTitle}` });
    }
  }
}

const getPage = memoize((path: string) => {
  const page = flattenedPages.find((p) => p.path === path);
  if (!page) throw new Error(`Page ${path} not found`);
  return page;
});

export const getPageMeta = memoize((path: string) => {
  const { title, description } = getPage(path);
  return { title, description };
});

export const getPageNavigation = memoize((path: string) => {
  const page = getPage(path);
  const index = flattenedPages.indexOf(page);
  if (index === 0) throw new Error("Method doesn't work for home page");
  return {
    back: flattenedPages[index - 1],
    next: flattenedPages[index + 1] as PageInfo | undefined,
  };
});

export const getFirstExamplePagePath = memoize(
  () => flattenedPages.find((page) => page.path.startsWith('examples/'))!.path
);
