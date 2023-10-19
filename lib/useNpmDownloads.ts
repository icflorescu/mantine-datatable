'use client';

import useSWR from 'swr';
import { DOWNLOADS_REFRESH_INTERVAL } from '~/app/config';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useNpmDownloads() {
  const { data } = useSWR<{ downloads: number }>(
    `https://api.npmjs.org/downloads/point/last-month/${process.env.PACKAGE_NAME}`,
    fetcher,
    {
      refreshInterval: DOWNLOADS_REFRESH_INTERVAL,
    }
  );

  return `${((data?.downloads || Number(process.env.INITIAL_NPM_DOWNLOADS)) / 1000).toFixed(1)}k/mo`;
}
