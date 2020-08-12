import {GameObjectResolver} from "../../gen-levelargs/types/gameObjectResolver";

export function publishGameObjectResolversIsRequested()
{
    return (window as any).__publishGameObjectResolversIsRequested;
}

export function publishGameObjectResolvers(gameObjectResolvers: GameObjectResolver[])
{
    (window as any).__gameObjectResolvers = gameObjectResolvers;
}