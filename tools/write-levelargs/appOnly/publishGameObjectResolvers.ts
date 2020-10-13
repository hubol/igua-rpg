import {GameObjectResolver} from "../../gen-levelargs/types/gameObjectResolver";

export function publishGameObjectResolversIsRequested()
{
    return !!process.env.PUBLISH_GAME_OBJECT_RESOLVERS;
}

export function publishGameObjectResolvers(gameObjectResolvers: GameObjectResolver[])
{
    (window as any).__gameObjectResolvers = gameObjectResolvers;
}