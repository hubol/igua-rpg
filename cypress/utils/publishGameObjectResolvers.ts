import {GameObjectResolver} from "../../gen-levelargs/types/gameObjectResolver";

export function publishGameObjectResolversIsRequested()
{
    return (window as any)?.dev?.discoverGameObjectResolvers;
}

export function publishGameObjectResolvers(gameObjectResolvers: GameObjectResolver[])
{
    localStorage.setItem("gameObjectResolvers", JSON.stringify(gameObjectResolvers));
}