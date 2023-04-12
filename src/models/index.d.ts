import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerQuran = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Quran, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sura: string;
  readonly skills?: (QuranSkills | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQuran = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Quran, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sura: string;
  readonly skills: AsyncCollection<QuranSkills>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Quran = LazyLoading extends LazyLoadingDisabled ? EagerQuran : LazyQuran

export declare const Quran: (new (init: ModelInit<Quran>) => Quran) & {
  copyOf(source: Quran, mutator: (draft: MutableModel<Quran>) => MutableModel<Quran> | void): Quran;
}

type EagerSkills = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Skills, 'id'>;
  };
  readonly id: string;
  readonly teilnehmer: string;
  readonly state: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly QuranSkills?: QuranSkills[] | null;
}

type LazySkills = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Skills, 'id'>;
  };
  readonly id: string;
  readonly teilnehmer: string;
  readonly state: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly QuranSkills: AsyncCollection<QuranSkills>;
}

export declare type Skills = LazyLoading extends LazyLoadingDisabled ? EagerSkills : LazySkills

export declare const Skills: (new (init: ModelInit<Skills>) => Skills) & {
  copyOf(source: Skills, mutator: (draft: MutableModel<Skills>) => MutableModel<Skills> | void): Skills;
}

type EagerQuranSkills = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<QuranSkills, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quranId?: string | null;
  readonly skillsId?: string | null;
  readonly quran: Quran;
  readonly skills: Skills;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQuranSkills = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<QuranSkills, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quranId?: string | null;
  readonly skillsId?: string | null;
  readonly quran: AsyncItem<Quran>;
  readonly skills: AsyncItem<Skills>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type QuranSkills = LazyLoading extends LazyLoadingDisabled ? EagerQuranSkills : LazyQuranSkills

export declare const QuranSkills: (new (init: ModelInit<QuranSkills>) => QuranSkills) & {
  copyOf(source: QuranSkills, mutator: (draft: MutableModel<QuranSkills>) => MutableModel<QuranSkills> | void): QuranSkills;
}