"use client";
import SurahList from "@/components/SurahList";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {useFetchSurahIndexes} from "@/lib/hooks/fetchSurahIndexes";
import {SetStateAction, useState} from "react";

export default function Home() {
  const {surahs, loading, error} = useFetchSurahIndexes();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: {target: {value: SetStateAction<string>;};}) => {
    setSearchQuery(event.target.value);
  };

  const filteredSurahs = surahs.filter((surah: {nameInEnglish: string; nameInTransliteration: string; nameInArabic: string; numberOfVerses: number;}) => {
    const query = searchQuery.toLowerCase();
    return (
      surah.nameInEnglish.toLowerCase().includes(query) ||
      surah.nameInTransliteration.toLowerCase().includes(query) ||
      surah.nameInArabic.toLowerCase().includes(query) ||
      (query && !isNaN(Number(query)) && surah.numberOfVerses === Number(query))
    );
  });


  return (
    <main className="mt-24 container mx-auto p-4">
      <Card className="shadow-md overflow-y-auto" style={{height: "calc(100vh - 100px)"}}>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle className="mb-2">Surah List</CardTitle>
            <CardDescription>List of all the surahs in Quran and some info about them.</CardDescription>
          </div>
          <Input className="w-60" placeholder="Search surah..." value={searchQuery}
            onChange={handleSearchChange} />

        </CardHeader>
        <CardContent>
          <SurahList surahs={filteredSurahs} loading={loading} error={error} />
        </CardContent>
      </Card>
    </main>
  );
}
