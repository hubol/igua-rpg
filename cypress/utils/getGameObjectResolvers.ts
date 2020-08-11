import {GameObjectResolver} from "../../src/types/gameObjectResolver";

export function getGameObjectResolvers(): GameObjectResolver[] | undefined
{
    const item = localStorage.getItem("gameObjectResolvers");
    if (item)
        return JSON.parse(item) as GameObjectResolver[];
}