import { MantineSize } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { Company, getCompaniesAsync } from '~/data';
import useIsMounted from '~/lib/useIsMounted';

export type LoaderVariant = 'oval' | 'bars' | 'dots';

export default function AsynchronousDataLoadingExample({
  customizeLoaderVariant,
  loaderVariant,
  customizeLoaderSize,
  loaderSize,
  customizeLoaderBackgroundBlur,
  loaderBackgroundBlur,
}: {
  customizeLoaderVariant: boolean;
  loaderVariant: LoaderVariant;
  customizeLoaderSize: boolean;
  loaderSize: MantineSize;
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

  // example-start
  // prettier-ignore
  return (
    <DataTable
      withBorder
      minHeight={180}
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      fetching={fetching}
      loaderVariant={customizeLoaderVariant ? loaderVariant : undefined}
      loaderSize={customizeLoaderSize ? loaderSize : undefined}
      loaderBackgroundBlur={customizeLoaderBackgroundBlur ? loaderBackgroundBlur : undefined}
    />
  );
  // example-end
}
