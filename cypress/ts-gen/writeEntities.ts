import {toPascalCase} from "pissant";
import {Ogmo} from "../../src/types/ogmo";
import Entity = Ogmo.Entity;
import {GameObjectResolver} from "../../src/types/gameObjectResolver";
import {EntityCommon} from "../../src/types/entityCommon";

export function writeEntities(entities: Entity[], gameObjectResolvers: GameObjectResolver[])
{
    const entityArgsLibrary = makeEntityArgsLibrary(entities);
    return `{
    ${Object.keys(entityArgsLibrary).map(x => `// @ts-ignore
${writeEntityResolution(x, entityArgsLibrary[x], gameObjectResolvers)}`).join("\n")}   
}`
}

function writeEntityResolution(name: string, entity: EntityCommon, gameObjectResolvers: GameObjectResolver[])
{
    const matchedResolver = gameObjectResolvers.filter(x => x.resolvableEntityType === entity.type);
    const entityJson = JSON.stringify(entity);

    if (matchedResolver.length > 0)
        return `${name}: ${matchedResolver[0].exportedName}(${entityJson}),`;
    return `${name}: ${entityJson},`;
}

function getEntityKey(entity: Entity, retryCount: number)
{
    const defaultName = entity?.values?.name ? entity?.values?.name :`${toPascalCase(entity.name)}`;
    return retryCount === 0 ? defaultName : `${defaultName}_${retryCount}`;
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

        object[key] = {
            type: entity.name,
            x: entity.x,
            y: entity.y,
            width: entity.width,
            height: entity.height,
            uid: entity._eid,
            ...entity.values
        };
    }

    return object;
}