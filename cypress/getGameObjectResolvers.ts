import {GameObjectResolver} from "../src/igua/level/discoverGameObjectResolvers";

export function getGameObjectResolvers(): GameObjectResolver[] | undefined
{
    const item = localStorage.getItem("gameObjectResolvers");
    if (item)
        return JSON.parse(item) as GameObjectResolver[];
}