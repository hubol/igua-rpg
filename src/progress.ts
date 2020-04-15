export interface Progress
{
    valuables: number;
    gotLevelValuable: Set<string>;
}

export const progress: Progress =
{
    valuables: 0,
    gotLevelValuable: new Set<string>()
};