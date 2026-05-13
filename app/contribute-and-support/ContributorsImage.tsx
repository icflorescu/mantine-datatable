'use client';

import { useWindowEvent } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { PRODUCT_NAME } from '~/app/config';

export function ContributorsImage() {
  const [cols, setCols] = useState(12);

  const adjustCols = () => {
    setCols(window.innerWidth < 400 ? 4 : window.innerWidth < 800 ? 8 : 12);
  };

  useWindowEvent('resize', adjustCols);
  useEffect(adjustCols, []);

  return (
    <img
      src={`https://contrib.rocks/image?repo=icflorescu/${process.env.PACKAGE_NAME}&columns=${cols}`}
      alt={`${PRODUCT_NAME} contributors`}
    />
  );
}
