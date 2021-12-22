export function makeGameObjectResolver(fn, type: string) {
    fn.gameObjectResolverInfo = new GameObjectResolverInfo(type);
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
