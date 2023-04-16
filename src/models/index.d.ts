import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";





type EagerQuran = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Quran, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nr?: number | null;
  readonly sura: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQuran = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Quran, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nr?: number | null;
  readonly sura: string;
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
  readonly sura?: Quran | null;
  readonly skillsSuraId?: string | null;
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
  readonly sura: AsyncItem<Quran | undefined>;
  readonly skillsSuraId?: string | null;
}

export declare type Skills = LazyLoading extends LazyLoadingDisabled ? EagerSkills : LazySkills

export declare const Skills: (new (init: ModelInit<Skills>) => Skills) & {
  copyOf(source: Skills, mutator: (draft: MutableModel<Skills>) => MutableModel<Skills> | void): Skills;
}