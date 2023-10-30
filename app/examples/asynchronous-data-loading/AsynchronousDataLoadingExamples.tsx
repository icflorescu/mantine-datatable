'use client';

import type { DefaultMantineColor, MantineLoader, MantineSize } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { DataTable } from '__PACKAGE__';
import { useEffect, useState } from 'react';
import type { Company } from '~/data';
import { getCompaniesAsync } from '~/data/async';
import { useIsMounted } from '~/lib/examples';

export function AsynchronousDataLoadingExample({
  customizeLoaderType,
  loaderType,
  customizeLoaderSize,
  loaderSize,
  customizeLoaderColor,
  loaderColor,
  customizeLoaderBackgroundBlur,
  loaderBackgroundBlur,
}: {
  customizeLoaderType: boolean;
  loaderType: MantineLoader;
  customizeLoaderSize: boolean;
  loaderSize: MantineSize;
  customizeLoaderColor: boolean;
  loaderColor: DefaultMantineColor;
  customizeLoaderBackgroundBlur: boolean;
  loaderBackgroundBlur: number;
}) {
  const [records, setRecords] = useState<Company[]>([]);
  const [fetching, setFetching] = useState(false);
  const isMounted = useIsMounted();

  const load = async () => {
    setFetching(true);
    const companies = await getCompaniesAsync({ count: 4, delay: { min: 800, max: 1000 } });
    if (isMounted()) {
      setRecords(companies);
      setFetching(false);
    }
  };

  const interval = useInterval(load, 2000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [interval]);

  // example-start default
  // prettier-ignore
  return (
    <DataTable
      withTableBorder
      minHeight={180}
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      fetching={fetching}
      loaderType={customizeLoaderType ? loaderType : undefined}
      loaderSize={customizeLoaderSize ? loaderSize : undefined}
      loaderColor={customizeLoaderColor ? loaderColor : undefined}
      loaderBackgroundBlur={customizeLoaderBackgroundBlur ? loaderBackgroundBlur : undefined}
    />
  );
  // example-end
}

export function AsynchronousDataLoadingExampleWithCustomLoader() {
  const [records, setRecords] = useState<Company[]>([]);
  const [fetching, setFetching] = useState(false);
  const isMounted = useIsMounted();

  const load = async () => {
    setFetching(true);
    const companies = await getCompaniesAsync({ count: 4, delay: { min: 800, max: 1200 } });
    if (isMounted()) {
      setRecords(companies);
      setFetching(false);
    }
  };

  const interval = useInterval(load, 1500);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [interval]);

  // example-start custom-loader
  return (
    <DataTable
      withTableBorder
      minHeight={180}
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      fetching={fetching}
      customLoader={
        <svg width={80} height={80} viewBox="0 0 40 40">
          {/* example-skip some svg elements */}
          <path
            opacity="0.2"
            fill="#e47c26"
            d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
          />
          <path
            fill="#e47c26"
            d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </path>
          {/* example-resume */}
        </svg>
      }
    />
  );
  // example-end
}
