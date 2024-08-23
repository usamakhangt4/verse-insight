"use client";
import {Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Skeleton} from "@/components/ui/skeleton";
import {useFetchSurahVerses} from "@/lib/hooks/fetchSurahVerses";
import {useSearchSurahIndexes} from "@/lib/hooks/searchSurah";
import {SetStateAction, useState} from "react";

const Surah = ({params}: {params: any}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const formattedSurahName = params.surahId.toLowerCase().replace(/-/g, ' ');
  const {surah, loading: searchLoading, surahIndex} = useSearchSurahIndexes(formattedSurahName);
  const formattedSurahId = `surah_${surahIndex}`
  const {surahVerses, loading} = useFetchSurahVerses(formattedSurahId)

  const isLoading = searchLoading || loading || surahVerses.length === 0;

  const VerseListSkeletonArr = ['a', 'b', 'c', 'd', 'e']

  const handleSearchChange = (event: {target: {value: SetStateAction<string>;};}) => {
    setSearchQuery(event.target.value);
  };

  const filteredVerses = surahVerses.filter((verse) =>
    verse.verseStringReplacedWithAllah ?
      verse.verseStringReplacedWithAllah.toLowerCase().includes(searchQuery.toLowerCase()) :
      verse.verseString.toLowerCase().includes(searchQuery.toLowerCase()));

  const VerseListSkeleton = () => {
    return (
      VerseListSkeletonArr.map((str, index) =>
        <Card className="shadow-lg p-5 flex items-center gap-5 " key={str + index}>
          <Skeleton className="h-9 w-5 rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </Card>)
    )
  }

  return (
    <div className="mt-24 container mx-auto p-4">
      <div className="flex flex-row justify-between items-center flex-wrap gap-5  border-b pb-6 mb-5">
        {isLoading ?
          <>
            <Skeleton className="h-9 w-52 rounded-md" />
          </> :
          <h2 className="text-3xl font-semibold tracking-tight">
            Surah {surah?.nameInTransliteration} / <span className="tracking-wider">{surah?.nameInArabic}</span>
          </h2>
        }
        <Input className="sm:w-60 sm:flex-none min-w-60 flex-1" placeholder="Search verse..." value={searchQuery}
          onChange={handleSearchChange} />
      </div>

      <div className="flex flex-col gap-5">
        {isLoading && <VerseListSkeleton />}
        {
          !isLoading && filteredVerses.map((verse, index) =>
            <Card className="shadow-lg p-5 flex items-center gap-5 " key={index}>
              <p className="font-bold text-2xl">{verse.verseNumber}:</p>
              <p className="leading-10 text-2xl">
                {verse.verseStringReplacedWithAllah || verse.verseString}
              </p>
            </Card>)
        }
      </div>
    </div>
  )
}

export default Surah