import {GameObjectResolver} from "../../gen-levelargs/types/gameObjectResolver";

export function publishGameObjectResolvers(gameObjectResolvers: GameObjectResolver[])
{
    localStorage.setItem("gameObjectResolvers", JSON.stringify(gameObjectResolvers));
}