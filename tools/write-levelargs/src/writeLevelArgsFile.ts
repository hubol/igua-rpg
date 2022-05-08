import {GameObjectResolver} from "../../gen-levelargs/types/gameObjectResolver";
import {createOrUpdateFile, getAllFiles, getDirectory, getRelativePath as _getRelativePath} from "pissant-node";
import {generateLevelArgsExport} from "../../gen-levelargs/generateLevelArgsExport";
import {writeModule} from "../../gen-module/writeModule";
import {Module} from "../../gen-module/components/module";
import {readOgmoLevelFile} from "./readOgmoLevelFile";

function getRelativePath(src, dst) {
    return _getRelativePath(src, dst).replace(/\\/g, "/");
}

export interface WriteLevelArgsFileArgs
{
    gameObjectResolvers: GameObjectResolver[],
    ogmoLevelsDirectoryPath: string,
    levelArgsFilePath: string
}

export async function writeLevelArgsFile(
    { gameObjectResolvers, levelArgsFilePath, ogmoLevelsDirectoryPath }: WriteLevelArgsFileArgs)
{
    const exports =
        (await Promise.all(getAllFiles(ogmoLevelsDirectoryPath).filter(x => x.endsWith(".json")).map(readOgmoLevelFile)))
            .map(generateLevelArgsExport(gameObjectResolvers));
    const module = new Module(getDirectory(levelArgsFilePath), exports);

    const moduleText = `// This file is generated. Do not touch.
${writeModule(module, getRelativePath)}`;
    console.log(moduleText);
    createOrUpdateFile(levelArgsFilePath, moduleText);
}