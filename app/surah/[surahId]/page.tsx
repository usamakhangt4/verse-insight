"use client";
import {Card} from "@/components/ui/card";
import {useFetchSurahVerses} from "@/lib/hooks/fetchSurahVerses";
import {useSearchSurahIndexes} from "@/lib/hooks/searchSurah";

const Surah = ({params}: {params: any}) => {
  const formattedSurahName = params.surahId.toLowerCase().replace(/-/g, ' ');
  const {surah, loading: searchLoading, surahIndex} = useSearchSurahIndexes(formattedSurahName);
  const formattedSurahId = `surah_${surahIndex}`
  const {surahVerses, loading} = useFetchSurahVerses(formattedSurahId)
  console.log(surahVerses);

  return (
    <div className="mt-[68px] container mx-auto p-4">
      <h2 className="scroll-m-20 border-b pb-2 mb-5 text-3xl font-semibold tracking-tight first:mt-0">
        Surah {surah?.nameInTransliteration}
      </h2>

      {/* <Card className="shadow-md overflow-y-auto" style={{height: "calc(100vh - 100px)"}}>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle className="mb-2">Surah List</CardTitle>
            <CardDescription>List of all the surahs in Quran and some info about them.</CardDescription>
          </div>
          <Input className="w-60" placeholder="Search..." value={searchQuery}
            onChange={handleSearchChange} />

        </CardHeader>
        <CardContent>
          <SurahList surahs={filteredSurahs} loading={loading} error={error} />
        </CardContent>
      </Card> */}

      <div className="flex flex-col gap-5">
        {
          !loading && surahVerses.map((verse, index) =>
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