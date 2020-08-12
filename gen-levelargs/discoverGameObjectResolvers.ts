import {GameObjectResolver} from "./types/gameObjectResolver";
import {getGameObjectResolverInfo, isGameObjectResolver} from "./resolveGameObject";

interface ModulesToSearch
{
    modules: any;
    path: string;
}

export function discoverGameObjectResolvers(modulesToSearch: ModulesToSearch[])
{
    const gameObjectResolvers: GameObjectResolver[] = [];

    for (const { modules, path } of modulesToSearch)
        findResolvers(modules, path).forEach(x => gameObjectResolvers.push(x));

    console.debug("Discovered GameObjectResolvers", gameObjectResolvers);
    return gameObjectResolvers;
}

interface ToProcess
{
    path: string;
    object: any;
    terminal: boolean;
}

function findResolvers(src: any, path: string)
{
    const process: ToProcess[] = [{ path, object: src, terminal: false }];
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
        const maybeResolver = src[key];
        if (isGameObjectResolver(maybeResolver))
        {
            resolvers.push({
                exportedName: key,
                path,
                resolvableEntityType: getGameObjectResolverInfo(maybeResolver).canResolveGameObjectArgsType
            })
        }

        if (!terminal)
        {
            const nextIsTerminal = key === "js" || key === "ts";
            const nextPath = nextIsTerminal ? path : `${path}/${key}`;
            process.push({ path: nextPath, terminal: nextIsTerminal, object: src[key] });
        }
    }
}