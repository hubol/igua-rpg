import {EntityCommon, GameObject} from "./createGameObjects";
import {Predicate} from "pissant";

const gameObjectResolvers: GameObjectResolver[] = [];

type GameObjectConstructor = (entity: EntityCommon) => GameObject;

export function addGameObjectResolver(type: string, gameObjectConstructor: GameObjectConstructor);
export function addGameObjectResolver(predicate: Predicate<EntityCommon>, gameObjectConstructor: GameObjectConstructor);

export function addGameObjectResolver(
    predicate: string | Predicate<EntityCommon>,
    gameObjectConstructor: GameObjectConstructor)
{
    if (typeof predicate === "string")
        predicate = e => e.type === predicate;

    gameObjectResolvers.push({
        canResolve: predicate,
        createGameObject: gameObjectConstructor
    });
}

export function resolveGameObject(entityCommon: EntityCommon): GameObject | undefined
{
    for (const gameObjectResolver of gameObjectResolvers)
    {
        if (!gameObjectResolver.canResolve(entityCommon))
            continue;

        return gameObjectResolver.createGameObject(entityCommon);
    }
}

export function getGameObjectResolvers()
{
    return [ ...gameObjectResolvers ];
}

interface GameObjectResolver
{
    canResolve(entityCommon: EntityCommon): boolean;
    createGameObject(entityCommon: EntityCommon): GameObject;
}