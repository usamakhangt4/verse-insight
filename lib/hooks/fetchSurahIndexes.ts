import {useState, useEffect} from 'react';
import {SurahType} from '../types';

export const useFetchSurahIndexes = () => {
  const [surahs, setSurahs] = useState<SurahType[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await import('../../data_json/quran_indexes.json');
        setSurahs(data.quranIndexes);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {surahs, loading, error};
};