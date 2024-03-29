import {GameObjectResolver} from "./types/gameObjectResolver";
import {Export} from "../gen-module/components/export";
import {Const} from "../gen-module/components/const";
import {AnonymousFunction, Returns} from "../gen-module/components/function";
import {Ogmo} from "./types/ogmo";
import {GameObjectArgs} from "./types/gameObjectArgs";
import {Invocation} from "../gen-module/components/invocation";
import {OgmoLevelFile} from "./types/ogmoLevelFile";
import {ImportedConst} from "../gen-module/components/imported";
import {trimExtension} from "../shared-utils/trimExtension";
import {GuardedDictionary} from "./guardedDictionary";
import {toPascalCase} from "./toPascalCase";

export function generateLevelArgsExport(gameObjectResolvers: GameObjectResolver[])
{
    return function({ path, level }: OgmoLevelFile)
    {
        return new Export(new Const(`${toPascalCase(trimExtension(getFileName(path)))}Args`,
            {
                width: level.width,
                height: level.height,
                ...level.values,
                gameObjectsSupplier: new AnonymousFunction(
                    new Returns(getGameObjectsSupplierReturnValue(gameObjectResolvers, level.layers)))
            }));
    }
}

function getDecalGameObjectKey(decal: Ogmo.Decal)
{
    return function (retryCount: number)
    {
        const defaultName = decal?.values?.name ? decal.values.name : `${getTextureName(decal.texture)}`;
        return retryCount === 0 ? defaultName : `${defaultName}_${retryCount}`;
    }
}

function getDecalGameObjectValue(decal: Ogmo.Decal, layerName: string)
{
    return new Invocation(
        new ImportedConst("resolveDecalGameObject", "src\\gameObjects\\decal"),
        {
            x: decal.x,
            y: decal.y,
            originX: decal.originX,
            originY: decal.originY,
            scaleX: decal.scaleX,
            scaleY: decal.scaleY,
            rotation: decal.rotation,
            layerName,
            texture: getTextureImportedConst(decal.texture)
        });
}

function getTextureName(texturePath: string)
{
    return toPascalCase(trimExtension(texturePath.replace("/", " ")));
}

function getTextureImportedConst(texturePath: string)
{
    return new ImportedConst(getTextureName(texturePath), `src\\textures`);
}

function getGameObjectsSupplierReturnValue(gameObjectResolvers: GameObjectResolver[], layers: Ogmo.Layer[])
{
    const guardedDictionary = new GuardedDictionary();

    for (const { key, value } of layers.flatMap(x => (x.decals ?? []).map(getDecalGameObjectEntryForLayer(x))))
        guardedDictionary.add(key, value);

    const gameObjectValue = getGameObjectValue(gameObjectResolvers);

    for (const entity of layers.flatMap(x => x.entities ?? []))
        guardedDictionary.add(getEntityKey(entity), gameObjectValue(getGameObjectArgs(entity)));

    return guardedDictionary.object;
}

function getDecalGameObjectEntryForLayer(layer: Ogmo.Layer)
{
    return function(decal: Ogmo.Decal)
    {
        return {
            key: getDecalGameObjectKey(decal),
            value: getDecalGameObjectValue(decal, layer.name)
        };
    }
}

function getGameObjectValue(gameObjectResolvers: GameObjectResolver[])
{
    return function (gameObjectArgs: GameObjectArgs)
    {
        const matchedResolver = first(gameObjectResolvers.filter(x => x.resolvableEntityType === gameObjectArgs.type));

        return matchedResolver
            ? new Invocation(new ImportedConst(matchedResolver.exportedName, matchedResolver.path), gameObjectArgs)
            : gameObjectArgs;
    }
}

function first<T>(array: T[])
{
    if (array.length > 0)
        return array[0];
}

function getEntityKey(entity: Ogmo.Entity)
{
    return function(retryCount: number)
    {
        const defaultName = entity?.values?.name ? entity?.values?.name :`${toPascalCase(entity.name)}`;
        return retryCount === 0 ? defaultName : `${defaultName}_${retryCount}`; // TODO use uid instead of retry count
    }
}

function getGameObjectArgs(entity: Ogmo.Entity): GameObjectArgs
{
    return {
        type: entity.name,
        x: entity.x,
        y: entity.y,
        width: entity.width,
        height: entity.height,
        flippedX: !!entity.flippedX,
        flippedY: !!entity.flippedY,
        uid: `${entity._eid}_${entity.id}`,
        nodes: entity.nodes,
        ...entity.values
    };
}

function getFileName(path: string)
{
    const slash = path.lastIndexOf("\\");
    return path.substr(slash + 1);
}
