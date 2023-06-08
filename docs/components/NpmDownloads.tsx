import { useEffect, useState } from 'react';
import useIsMounted from '~/lib/useIsMounted';

export function NpmDownloads() {
  const [downloads, setDownloads] = useState(process.env.INITIAL_NPM_DOWNLOADS);
  const isMounted = useIsMounted();

  useEffect(() => {
    fetch('https://api.npmjs.org/downloads/point/last-month/mantine-datatable')
      .then((res) => res.json())
      .then((res) => !!isMounted && setDownloads(res.downloads));
  }, [isMounted]);

  return <>{downloads ? `${Math.round(downloads / 1000)}k/month` : '...'}</>;
}
