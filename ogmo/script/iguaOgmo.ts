import {toPascalCase} from "pissant";
import Level = Ogmo.Level;
import Entity = Ogmo.Entity;

function deepCopy<T>(t: T): T
{
    return JSON.parse(JSON.stringify(t));
}

function pruneProperties(src: any, key: string)
{
    const process = [src];

    while (process.length > 0)
    {
        const next = process.pop();
        prunePropertiesImpl(next, key).forEach(x => process.push(x));
    }

    return src;
}

function prunePropertiesImpl(src: any, key: string)
{
    const processNext: any[] = [];

    if (Array.isArray(src))
        src.forEach(x => processNext.push(x));
    if (typeof src === "object")
    {
        delete src[key];
        const keys = Object.keys(src);
        for (let i = 0; i < keys.length; i++)
            processNext.push(src[keys[i]]);
    }

    return processNext;
}

function hook()
{
    return {
        beforeLoadLevel: (_, data: IguaOgmoFormat | any): Level => {
            if (data._ogmo)
                return data._ogmo;
            return data;
        },

        beforeSaveLevel: (_, level: Level) => {
            const ogmo = deepCopy(level);
            return {
                width: level.width,
                height: level.height,
                ...level.values,
                entities: makeEntitiesObject(flatMap(x => x.entities, level.layers)),
                _ogmo: pruneProperties(pruneProperties(ogmo, "_name"), "_contents")
            };
        }
    };
}

(window as any).stupidMotherFucker = hook;

function flatMap(callback, thisArg) {
    // @ts-ignore
    var self = thisArg || this;
    if (self === null) {
        throw new TypeError( 'Array.prototype.flatMap ' +
            'called on null or undefined' );
    }
    if (typeof callback !== 'function') {
        throw new TypeError( callback +
            ' is not a function');
    }

    var list = [];

    // 1. Let O be ? ToObject(this value).
    var o = Object(self);

    // 2. Let len be ? ToLength(? Get(O, "length")).
    var len = o.length >>> 0;

    for (var k = 0; k < len; ++k) {
        if (k in o) {
            var part_list = callback.call(self, o[k], k, o);
            list = list.concat(part_list);
        }
    }

    return list;
}

function getEntityKey(entity: Entity, retryCount: number)
{
    const defaultName = entity?.values?.name ? entity?.values?.name :`${toPascalCase(entity.name)}`;
    return retryCount === 0 ? defaultName : `${defaultName}_${retryCount}`;
}

function makeEntitiesObject(entities: Entity[])
{
    const object = {};
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
            ...entity.values
        };
    }
    return object;
}

interface IguaOgmoFormat
{
    _ogmo: Ogmo.Level
}