import {useState, useEffect, useCallback} from 'react';
import {SurahType} from '../types';

export const useSearchSurahIndexes = (searchString: string) => {
  const [surah, setSurah] = useState<SurahType | null>(null);
  const [surahIndex, setSurahIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!searchString) {
      setSurah(null);
      setSurahIndex(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await import('../../data_json/quran_indexes.json');
      const foundIndex = data.quranIndexes.findIndex((s: SurahType) => s.nameInTransliteration.toLowerCase() === searchString);
      const matchingSurah = foundIndex !== -1 ? data.quranIndexes[foundIndex] : null;
      setSurah(matchingSurah);
      setSurahIndex(foundIndex !== -1 ? foundIndex + 1 : null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [searchString]);

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchData();
    }, 300); // Debounce time of 300ms

    return () => clearTimeout(debounceFetch);
  }, [fetchData]);

  return {surah, surahIndex, loading, error};
};