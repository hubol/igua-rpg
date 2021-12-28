export type LevelApplicatorMeta = Partial<{ isNotLevel: boolean }>;
export type LevelApplicator = {
    (): void;
} & LevelApplicatorMeta;
