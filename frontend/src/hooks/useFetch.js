import { useState, useEffect, useCallback } from 'react';

/**
 * Generic data fetching hook.
 * Returns { data, loading, error } and a refetch function.
 *
 * @param {Function} fetchFn - An async function from quantumApi.js
 * @param {boolean} [immediate=true] - Whether to fetch on mount automatically
 */
const useFetch = (fetchFn, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result.data ?? result);
    } catch (err) {
      setError(err.message || 'Error desconocido al cargar datos.');
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    if (immediate) execute();
  }, [execute, immediate]);

  return { data, loading, error, refetch: execute };
};

export default useFetch;
