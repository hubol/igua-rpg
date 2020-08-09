import {EntityCommon} from "./createGameObjects";

export function discoverGameObjectResolvers()
{
    const gameObjectsModules = require("../../gameObjects/**/*.*");
    const gameObjectResolvers = findResolvers(gameObjectsModules);
    console.debug("Discovered GameObjectResolvers", gameObjectResolvers);
    return gameObjectResolvers;
}

interface GameObjectResolver
{
    path: string;
    exportedName: string;
    canResolve(entityCommon: EntityCommon): boolean;
}

interface ToProcess
{
    path: string;
    object: any;
    terminal: boolean;
}

function findResolvers(src: any)
{
    const process: ToProcess[] = [{ path: "", object: src, terminal: false }];
    const resolvers: GameObjectResolver[] = [];
    while (process.length > 0)
    {
        findResolversImpl(process.pop() as ToProcess, process, resolvers);
    }

    return resolvers;
}

function findResolversImpl(processing: ToProcess, process: ToProcess[], resolvers: GameObjectResolver[])
{
    const { path, terminal } = processing;
    const src = processing.object;

    if (typeof src !== "object")
        return;

    const keys = Object.keys(src);
    for (const key of keys)
    {
        if (key.startsWith("resolve"))
        {
            const maybeResolver = src[key];
            if (typeof maybeResolver === "function")
            {
                if (maybeResolver.length !== 1)
                    console.debug(`Resolver ${key} accepts ${maybeResolver.length} arguments, but expected 1.`);
                const typeName = key.substr(7);
                resolvers.push({
                    exportedName: key,
                    path,
                    canResolve: e => e.type === typeName
                });
                continue;
            }
        }

        if (!terminal)
        {
            const nextIsTerminal = key === "js" || key === "ts";
            const nextPath = nextIsTerminal ? path : `${path}/${key}`;
            process.push({ path: nextPath, terminal: nextIsTerminal, object: src[key] });
        }
    }
}