export type SceneApplicatorMeta = Partial<{ isNotLevel: boolean }>;
export type SceneApplicator = {
    (): void;
} & SceneApplicatorMeta;
