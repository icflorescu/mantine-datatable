import { Title } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME, WEBSITE_LINK } from '~/app/config';
import { getRouteTitle } from '~/lib/utils';
import { JsonLd } from './JsonLd';
import classes from './PageTitle.module.css';

export type PageTitleProps =
  | {
      of: Route;
      children?: never;
    }
  | {
      of?: never;
      children: React.ReactNode;
    };

export function PageTitle({ of, children }: PageTitleProps) {
  const title = children || getRouteTitle(of!);
  return (
    <>
      {of && (
        <JsonLd
          data={{
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: PRODUCT_NAME, item: `${WEBSITE_LINK}/` },
              { '@type': 'ListItem', position: 2, name: title, item: `${WEBSITE_LINK}${of}/` },
            ],
          }}
        />
      )}
      <Title className={classes.root} order={1}>
        {title}
      </Title>
    </>
  );
}
