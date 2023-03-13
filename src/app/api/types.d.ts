export interface IQuranMetaApi {
  code: number
  status: string
  data: IMeta
}

export interface IMeta {
  ayahs: IAyahs
  surahs: ISurahs
  sajdas: ISajdas
  rukus: IHizbQuarters
  pages: IHizbQuarters
  manzils: IHizbQuarters
  hizbQuarters: IHizbQuarters
  juzs: IHizbQuarters
}

export interface IAyahs {
  count: number
}

export interface IHizbQuarters {
  count: number
  references: IHizbQuartersReference[]
}

export interface IHizbQuartersReference {
  surah: number
  ayah: number
}

export interface Sajdas {
  count: number
  references: ISajdasReference[]
}

export interface ISajdasReference {
  surah: number
  ayah: number
  recommended: boolean
  obligatory: boolean
}

export interface ISurahs {
  count: number
  references: ISurahsReference[]
}

export interface ISurahsReference {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: ERevelationType
}

export enum ERevelationType {
  Meccan = 'Meccan',
  Medinan = 'Medinan',
}

// ************************************ //
export interface IJuzaMetaApi {
  code: number
  status: string
  data: IJuzaMeta
}

export interface IJuzaMeta {
  number: number
  ayahs: IAyah[]
  surahs: { [key: string]: ISurah }
  edition: IEdition
}

export interface IAyah {
  number: number
  text: string
  surah: ISurah
  numberInSurah: number
  juz: number
  manzil: number
  page: number
  ruku: number
  hizbQuarter: number
  sajda: boolean | ISajdaClass
}

export interface ISajdaClass {
  id: number
  recommended: boolean
  obligatory: boolean
}

export interface ISurah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  revelationType: ERevelationType
  numberOfAyahs: number
}

export enum ERevelationType {
  Meccan = 'Meccan',
  Medinan = 'Medinan',
}

export interface IEdition {
  identifier: string
  language: string
  name: string
  englishName: string
  format: string
  type: string
  direction: string
}
