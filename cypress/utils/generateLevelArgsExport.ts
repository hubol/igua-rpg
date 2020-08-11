import {GameObjectResolver} from "../../src/types/gameObjectResolver";
import {Export} from "../ts-gen/components/export";
import {Const} from "../ts-gen/components/const";
import {toPascalCase} from "pissant";
import {AnonymousFunction, Returns} from "../ts-gen/components/function";
import {Ogmo} from "../../src/types/ogmo";
import {EntityCommon} from "../../src/types/entityCommon";
import Entity = Ogmo.Entity;
import {Invocation} from "../ts-gen/components/invocation";
import {ImportedFunction} from "../ts-gen/components/imported";
import {OgmoLevelFile} from "../types/ogmoLevelFile";

export function generateLevelArgsExport(gameObjectResolvers: GameObjectResolver[])
{
    return function({ path, level }: OgmoLevelFile)
    {
        const entityArgsLibrary = makeEntityArgsLibrary(level.layers[0].entities);
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

function getGameObjectsSupplierReturnValue(gameObjectResolvers: GameObjectResolver[], entityArgsLibrary: EntityArgsLibrary)
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

function getEntityKey(entity: Entity, retryCount: number)
{
    const defaultName = entity?.values?.name ? entity?.values?.name :`${toPascalCase(entity.name)}`;
    return retryCount === 0 ? defaultName : `${defaultName}_${retryCount}`; // TODO use uid instead of retry count
}

interface EntityArgsLibrary
{
    [index: string]: EntityCommon;
}

function makeEntityArgsLibrary(entities: Entity[]): EntityArgsLibrary
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