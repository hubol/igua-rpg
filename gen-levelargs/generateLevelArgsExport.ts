import {GameObjectResolver} from "./types/gameObjectResolver";
import {Export} from "../gen-ts/components/export";
import {Const} from "../gen-ts/components/const";
import {toPascalCase} from "pissant";
import {AnonymousFunction, Returns} from "../gen-ts/components/function";
import {Ogmo} from "./types/ogmo";
import {GameObjectArgs} from "./types/gameObjectArgs";
import {Invocation} from "../gen-ts/components/invocation";
import {ImportedFunction} from "../gen-ts/components/imported";
import {OgmoLevelFile} from "./types/ogmoLevelFile";

export function generateLevelArgsExport(gameObjectResolvers: GameObjectResolver[])
{
    return function({ path, level }: OgmoLevelFile)
    {
        const entityArgsLibrary = makeGameObjectArgsLibrary(level.layers[0].entities);
        return new Export(new Const(`${toPascalCase(trimExtension(getFileName(path)))}Args`,
            {
                width: level.width,
                height: level.height,
                ...level.values,
                gameObjectsSupplier: new AnonymousFunction(
                    new Returns(getGameObjectsSupplierReturnValue(gameObjectResolvers, entityArgsLibrary)))
            }));
    }
}

function getGameObjectsSupplierReturnValue(gameObjectResolvers: GameObjectResolver[], entityArgsLibrary: GameObjectArgsLibrary)
{
    const result = {} as any;

    for (const key in entityArgsLibrary)
    {
        const entity = entityArgsLibrary[key];
        const matchedResolver = first(gameObjectResolvers.filter(x => x.resolvableEntityType === entity.type));

        result[key] = matchedResolver
            ? new Invocation(new ImportedFunction(matchedResolver.exportedName, matchedResolver.path), entity).tsIgnore()
            : entity;
    }

    return result;
}

function first<T>(array: T[])
{
    if (array.length > 0)
        return array[0];
}

function getEntityKey(entity: Ogmo.Entity, retryCount: number)
{
    const defaultName = entity?.values?.name ? entity?.values?.name :`${toPascalCase(entity.name)}`;
    return retryCount === 0 ? defaultName : `${defaultName}_${retryCount}`; // TODO use uid instead of retry count
}

interface GameObjectArgsLibrary
{
    [index: string]: GameObjectArgs;
}

function makeGameObjectArgsLibrary(entities: Ogmo.Entity[]): GameObjectArgsLibrary
{
    const object = {} as any;
    for (let i = 0; i < entities.length; i++)
    {
        const entity = entities[i];
        let retryCount = 0;

        let key = getEntityKey(entity, 0);
        while (key in object)
            key = getEntityKey(entity, ++retryCount);

        object[key] = JSON.parse(JSON.stringify({
            type: entity.name,
            x: entity.x,
            y: entity.y,
            width: entity.width,
            height: entity.height,
            uid: entity._eid,
            ...entity.values
        }));
    }

    return object;
}

function getFileName(path: string)
{
    const slash = path.lastIndexOf("\\");
    return path.substr(slash + 1);
}

function trimExtension(fileName: string)
{
    const dot = fileName.lastIndexOf(".");
    return dot !== -1 ? fileName.substr(0, dot) : fileName;
}