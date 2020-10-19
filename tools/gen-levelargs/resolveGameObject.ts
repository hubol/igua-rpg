import {GameObjectArgs} from "./types/gameObjectArgs";

export function resolveGameObject<T>(type: string, resolve: (args: GameObjectArgs) => T)
{
    const wrappedResolve: typeof resolve = function(e) {
        return resolve(e);
    };
    (wrappedResolve as any).gameObjectResolverInfo = new GameObjectResolverInfo(type);
    return wrappedResolve;
}

export function isGameObjectResolver(object: any)
{
    return !!getGameObjectResolverInfoImpl(object);
}

export function getGameObjectResolverInfo(object: any)
{
    const info = getGameObjectResolverInfoImpl(object);
    if (!info)
        throw { object, message: "Specified object is not a GameObject resolver!" };
    return info;
}

function getGameObjectResolverInfoImpl(object: any)
{
    if (typeof object === "function" && object.gameObjectResolverInfo instanceof GameObjectResolverInfo)
        return object.gameObjectResolverInfo as GameObjectResolverInfo;
}

class GameObjectResolverInfo
{
    constructor(readonly canResolveGameObjectArgsType: string) { }

}