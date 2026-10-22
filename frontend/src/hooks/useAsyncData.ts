import { useCallback, useEffect, useState } from 'react';

export type AsyncData<T> =
  | { status: 'loading' }
  | { status: 'error'; error: unknown }
  | { status: 'success'; data: T };

type UseAsyncDataResult<T> = {
  state: AsyncData<T>;
  refresh: () => Promise<void>;
};

export function useAsyncData<T>(
  load: () => Promise<T>,
  enabled = true,
): UseAsyncDataResult<T> {
  const [state, setState] = useState<AsyncData<T>>({ status: 'loading' });

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let ignore = false;
    setState({ status: 'loading' });

    load().then(
      (data) => {
        if (!ignore) setState({ status: 'success', data });
      },
      (error: unknown) => {
        if (!ignore) setState({ status: 'error', error });
      },
    );

    return () => {
      ignore = true;
    };
  }, [load, enabled]);

  const refresh = useCallback(async () => {
    try {
      setState({ status: 'success', data: await load() });
    } catch (error) {
      setState({ status: 'error', error });
    }
  }, [load]);

  return { state, refresh };
}
