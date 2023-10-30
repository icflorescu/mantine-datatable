import { DocSearch } from '@docsearch/react';
import { DOCSEARCH_API_KEY, DOCSEARCH_APP_ID, DOCSEARCH_INDEX_NAME } from '~/app/config';
import { DocSearchHit } from './DocSearchHit';

export function DocSearchButton() {
  return (
    <DocSearch
      appId={DOCSEARCH_APP_ID}
      indexName={DOCSEARCH_INDEX_NAME}
      apiKey={DOCSEARCH_API_KEY}
      hitComponent={DocSearchHit}
    />
  );
}
