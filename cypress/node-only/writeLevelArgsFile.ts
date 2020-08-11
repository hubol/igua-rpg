import {generateLevelArgsExport} from "../../gen-levelargs/generateLevelArgsExport";
import {Module} from "../../gen-module/components/module";
import {writeModule} from "../../gen-module/writeModule";
import {WriteLevelArgsFileArgs} from "../tasks/writeLevelArgsFile";
import {createOrUpdateFile, getAllFiles, getDirectory} from "pissant-node";
import {__nodeOnly__readOgmoLevelFile as readOgmoLevelFile} from "./readOgmoLevelFile";

export async function __nodeOnly__writeLevelArgsFile(
    { gameObjectResolvers, levelArgsFilePath, ogmoLevelsDirectoryPath }: WriteLevelArgsFileArgs)
{
    const exports =
        (await Promise.all(getAllFiles(ogmoLevelsDirectoryPath).filter(x => x.endsWith(".json")).map(readOgmoLevelFile)))
            .map(generateLevelArgsExport(gameObjectResolvers));
    const moduleText = writeModule(new Module(getDirectory(levelArgsFilePath), exports));
    console.log(moduleText);
    createOrUpdateFile(levelArgsFilePath, moduleText);
}