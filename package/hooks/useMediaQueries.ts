// Modified from https://github.com/mantinedev/mantine/blob/8c12a76c56da51af34213f18dd67c8b72a0ddb44/src/mantine-hooks/src/use-media-query/use-media-query.ts

import { useEffect, useRef, useState } from 'react';

export interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

/**
 * Older versions of Safari (shipped with Catalina and before) do not support addEventListener on matchMedia
 * https://stackoverflow.com/questions/56466261/matchmedia-addlistener-marked-as-deprecated-addeventlistener-equivalent
 * */
function attachMediaListeners(queries: MediaQueryList[], callback: (matches: boolean[]) => void) {
  const callbackWrapper = () => {
    callback(queries.map((query) => query.matches));
  };
  const subscriptions = queries.map((query) => {
    try {
      query.addEventListener('change', callbackWrapper);
      return () => query.removeEventListener('change', callbackWrapper);
    } catch {
      query.addListener(callbackWrapper);
      return () => query.removeListener(callbackWrapper);
    }
  });
  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
}

function getInitialValue(queries: string[], initialValues?: boolean[]) {
  if (initialValues) {
    return initialValues;
  }

  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    return queries.map((query) => window.matchMedia(query).matches);
  }

  return queries.map(() => false);
}

export function useMediaQueries(
  queries: string[],
  initialValues?: boolean[],
  { getInitialValueInEffect }: UseMediaQueryOptions = {
    getInitialValueInEffect: true,
  }
) {
  const [matches, setMatches] = useState(
    getInitialValueInEffect ? initialValues : getInitialValue(queries, initialValues)
  );
  const queryRef = useRef<MediaQueryList[]>(null);

  useEffect(() => {
    if ('matchMedia' in window) {
      queryRef.current = queries.map((query) => window.matchMedia(query));
      setMatches(queryRef.current.map((queryResult) => queryResult.matches));
      return attachMediaListeners(queryRef.current, (event) => {
        setMatches(event);
      });
    }

    return undefined;
  }, [queries]);

  return matches;
}
