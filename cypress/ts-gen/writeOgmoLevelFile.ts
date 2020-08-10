import {OgmoLevelFile} from "../readOgmoLevelFile";
import {toPascalCase} from "pissant";
import {Ogmo} from "../../src/types/ogmo";
import {ApplyOgmoLevelArgs} from "../../src/igua/level/applyOgmoLevelArgs";
import {writeEntities} from "./writeEntities";
import {GameObjectResolver} from "../../src/types/gameObjectResolver";

export function writeOgmoLevelFile(ogmoLevelFile: OgmoLevelFile, gameObjectResolvers: GameObjectResolver[])
{
    const levelName = toPascalCase(trimExtension(getFileName(ogmoLevelFile.path)));
    return `export const ${levelName}Args = ${writeLevel(ogmoLevelFile.level, gameObjectResolvers)};`;
}

function writeLevel(level: Ogmo.Level, gameObjectResolvers: GameObjectResolver[])
{
    const replaceMe = ">>REPLACE_ME<<";

    const applyLevelArgs: ApplyOgmoLevelArgs<unknown> = {
        width: level.width,
        height: level.height,
        ...level.values,
        gameObjectsSupplier: replaceMe as any
    };

    return JSON.stringify(applyLevelArgs).replace(`"${replaceMe}"`, `() => {
return ${writeEntities(level.layers[0].entities, gameObjectResolvers)}
}`);
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