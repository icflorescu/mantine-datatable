import memoize from 'lodash/memoize';
import { PAGES } from '~/config';

type PageInfo = { path: string; title: string; description?: string };

const flattenedPages: PageInfo[] = [];
for (const { external, path, title, description, items } of PAGES) {
  if (!items) {
    if (!external) {
      flattenedPages.push({ path: path || '', title, description });
    }
  } else {
    for (const { title: itemTitle, path: itemPath, description: itemDescription } of items) {
      flattenedPages.push({
        path: `${path}/${itemPath}`,
        title: `${title} › ${itemTitle}`,
        description: itemDescription,
      });
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
