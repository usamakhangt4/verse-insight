"use client";
import {useRouter} from 'next/navigation';
import {SurahType} from '../lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {Button} from './ui/button';
import Link from 'next/link';
import {Skeleton} from './ui/skeleton';

interface SurahListProps {
  surahs: SurahType[];
  loading: boolean;
  error: Error | null
}

const SurahList: React.FC<SurahListProps> = ({surahs, loading, error}) => {
  const router = useRouter();
  const skeletonTableRowArr = ['a', 'b', 'c', 'd', 'e']

  const handleSurahClick = (nameInTransliteration: string) => {
    const formattedSurahName = nameInTransliteration.toLowerCase().replace(/\s+/g, '-');

    router.push(`/surah/${formattedSurahName}`);
  };

  const SurahIndexTableSkeleton = () => {
    return (
      skeletonTableRowArr.map((str, index) =>
        <TableRow key={index + str}>
          <TableCell>
            <Skeleton className="h-5 w-28 rounded-md" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-28 rounded-md" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-28 rounded-md" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-28 rounded-md" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-14 rounded-md" />
          </TableCell>
        </TableRow>)
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left uppercase font-semibold">Name</TableHead>
          <TableHead className="text-left uppercase font-semibold">Transliteration</TableHead>
          <TableHead className="text-left uppercase font-semibold">Arabic</TableHead>
          <TableHead className="text-left uppercase font-semibold" >No Of Verses</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          loading && <SurahIndexTableSkeleton />
        }
        {
          error &&
          <TableCell className="text-center text-red-500" colSpan={5}>
            There was an error fetching result
          </TableCell>
        }
        {(surahs && !error && !loading) && surahs.map((surah, index) =>
          <TableRow key={index}>
            <TableCell className="text-left">{surah.nameInEnglish}</TableCell>
            <TableCell className="text-left">{surah.nameInTransliteration}</TableCell>
            <TableCell className="text-left">{surah.nameInArabic}</TableCell>
            <TableCell className="text-left">{surah.numberOfVerses}</TableCell>
            <TableCell className="text-left">
              <Button size={'sm'}
                onClick={() => handleSurahClick(surah.nameInTransliteration)}
              >
                Read
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>

  );
};

export default SurahList;
