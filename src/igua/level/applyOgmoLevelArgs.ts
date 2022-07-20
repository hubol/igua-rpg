export interface ApplyOgmoLevelArgs<T>
{
    readonly width: number;
    readonly height: number;
    readonly gameObjectsSupplier: () => GameObjects<T>;
}

export type GameObjects<T> = {
    [key in keyof T]: T[key]
}

export type GameObjectsType<T2 extends ApplyOgmoLevelArgs<unknown>> = ReturnType<T2['gameObjectsSupplier']>