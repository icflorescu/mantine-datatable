import { memoize } from 'lodash';
import { PAGES } from '~/config';

type PageInfo = { path: string; title: string };

const flattenedPages: PageInfo[] = [];
for (const { path, title, items } of PAGES) {
  if (!items) {
    flattenedPages.push({ path: path || '', title });
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

export const getPageTitle = memoize((path: string) => getPage(path).title);

export const getPageNavigation = memoize((path: string) => {
  const page = getPage(path);
  const index = flattenedPages.indexOf(page);
  if (index === 0) throw new Error("Method doesn't work for home page");
  return {
    back: flattenedPages[index - 1],
    next: flattenedPages[index + 1] as PageInfo | undefined,
  };
});

export const getExamplePages = memoize(() => flattenedPages.filter((page) => page.path.startsWith('/example/')));
