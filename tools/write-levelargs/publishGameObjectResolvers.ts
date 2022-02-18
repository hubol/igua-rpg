import {GameObjectResolver} from "../gen-levelargs/types/gameObjectResolver";

export function publishGameObjectResolversIsRequested()
{
    return window.location.href.toLowerCase().includes('publishGameObjectResolvers'.toLowerCase());
}

export function publishGameObjectResolvers(gameObjectResolvers: GameObjectResolver[])
{
    (window as any).__gameObjectResolvers = gameObjectResolvers;
}