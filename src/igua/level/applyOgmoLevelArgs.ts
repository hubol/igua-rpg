export interface ApplyOgmoLevelArgs<T>
{
    readonly width: number;
    readonly height: number;
    readonly style: number;
    readonly gameObjectsSupplier: () => GameObjects<T>;
}

export type GameObjects<T> = {
    [key in keyof T]: T[key]
}