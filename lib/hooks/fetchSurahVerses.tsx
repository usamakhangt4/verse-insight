import {useState, useEffect, useCallback} from 'react';
import {SurahVerseType} from '../types';

export const useFetchSurahVerses = (surahId: string) => {
  const [surahVerses, setSurahVerses] = useState<SurahVerseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (signal: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await import(`../../data_json/surah_data/${surahId}.json`);
      if (!signal.aborted) {
        setSurahVerses(data.verses);
      }
    } catch (err) {
      if (!signal.aborted) {
        setError(err as Error);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, [surahId]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  return {surahVerses, loading, error};
};