import {GameObjectResolver} from "../../gen-levelargs/types/gameObjectResolver";
import {readAppWindow} from "./readAppWindow";

export function getGameObjectResolvers(consumer: (resolvers: GameObjectResolver[]) => void)
{
    return readAppWindow({ __gameObjectResolvers: [] as GameObjectResolver[] }, x => consumer(x.__gameObjectResolvers));
}