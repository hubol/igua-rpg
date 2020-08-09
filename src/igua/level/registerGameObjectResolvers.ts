import "../../gameObjects/**/*.*";
import {getGameObjectResolvers} from "./gameObjectResolvers";

export function registerGameObjectResolvers()
{
    console.debug("Registered GameObjectResolvers", getGameObjectResolvers());
}