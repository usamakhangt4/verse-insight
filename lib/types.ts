export interface SurahType {
  numberOfVerses: number;
  nameInEnglish: string;
  nameInTransliteration: string;
  nameInArabic: string;
}

export interface SurahVerseType {
  verseNumber: number;
  verseString: string;
  verseStringReplacedWithAllah: string
}
