import { useWindowScroll } from '@mantine/hooks';
import { memoize } from 'lodash';
import type { Metadata, Route } from 'next';
import { EXAMPLES_ROUTE_COLOR, PRODUCT_NAME, ROUTES, RouteInfo } from '~/app/config';
import { NavbarButtonProps } from '~/components/NavbarButton';

function addExamplesPrefix({ href, title }: Pick<RouteInfo, 'href' | 'title'>) {
  return href.startsWith('/examples/') ? `Examples › ${title}` : title;
}

export const getRouteMetadata = memoize((href: Route): Metadata => {
  const route = ROUTES.find((route) => route.href === href);
  if (!route) throw new Error(`Route ${href} not found`);

  const { title: rawTitle, description } = route;
  const title = href === '/' ? PRODUCT_NAME : `${addExamplesPrefix({ title: rawTitle, href })} | ${PRODUCT_NAME}`;
  const hrefWithTrailingSlash = href === '/' ? href : `${href}/`;
  const url =
    process.env.GITHUB_PAGES === 'TRUE'
      ? `/${process.env.PACKAGE_NAME}${hrefWithTrailingSlash}`
      : hrefWithTrailingSlash;

  return {
    title,
    alternates: { canonical: url },
    description,
  };
});

export const getRouteTitle = memoize((href: Route) => {
  const route = ROUTES.find((route) => route.href === href);
  if (!route) throw new Error(`Route ${href} not found`);
  const { title } = route;
  return addExamplesPrefix({ title, href });
});

export const getNavbarButtonsInfo = memoize(() => {
  const info: Record<'before-examples' | 'examples' | 'after-examples', NavbarButtonProps[]> = {
    'before-examples': [],
    examples: [],
    'after-examples': [],
  };

  let examplesReached = false;
  let examplesPassed = false;
  for (const route of ROUTES) {
    const isExample = route.href.startsWith('/examples');
    if (isExample) examplesReached = true;
    if (!isExample && examplesReached) examplesPassed = true;
    if (!examplesReached) {
      info['before-examples'].push(route as NavbarButtonProps);
    } else if (examplesPassed) {
      info['after-examples'].push(route as NavbarButtonProps);
    } else {
      info.examples.push({ ...route, color: EXAMPLES_ROUTE_COLOR });
    }
  }

  return info;
});

export const getPageNavigationInfo = memoize((href: string) => {
  const index = ROUTES.findIndex((route) => route.href === href);
  if (index === -1) throw new Error(`Route ${href} not found`);
  if (index === 0 || index === ROUTES.length - 1) throw new Error('This method does not support first and last routes');
  const { href: backHref, title: backTitle, description: backDescription } = ROUTES[index - 1];
  const { href: nextHref, title: nextTitle, description: nextDescription } = ROUTES[index + 1];
  return {
    backHref,
    backTitle: addExamplesPrefix({ title: backTitle, href: backHref }),
    backDescription,
    nextHref,
    nextTitle: addExamplesPrefix({ title: nextTitle, href: nextHref }),
    nextDescription,
  };
});

export const getFirstExampleRoute = memoize(
  () => ROUTES.find((route) => (route.href as string).startsWith('/examples'))!
);

export const getNextRoute = memoize((href: string) => {
  const index = ROUTES.findIndex((route) => route.href === href);
  if (index === -1) throw new Error(`Route ${href} not found`);
  if (index === ROUTES.length - 1) throw new Error('This method does not support last route');
  return ROUTES[index + 1];
});

export function useIsScrolled() {
  const [{ y }] = useWindowScroll();
  return y > 0;
}

export function allPromiseProps<T>(object: { [K in keyof T]: Promise<T[K]> | T[K] }): Promise<T> {
  return Promise.all(Object.values(object)).then((results) =>
    Object.keys(object).reduce((fulfilledObject, key, index) => {
      fulfilledObject[key as keyof T] = results[index] as T[keyof T];
      return fulfilledObject;
    }, {} as T)
  );
}
