import {generateLevelArgsExport} from "../utils/generateLevelArgsExport";
import {Module} from "../ts-gen/components/module";
import {writeModule} from "../ts-gen/writeModule";
import {WriteLevelArgsFileArgs} from "../tasks/writeLevelArgsFile";
import {createOrUpdateFile, getAllFiles, getDirectory} from "pissant-node";
import {__nodeOnly__readOgmoLevelFile as readOgmoLevelFile} from "./readOgmoLevelFile";

export async function __nodeOnly__writeLevelArgsFile(
    { gameObjectResolvers, levelArgsFilePath, ogmoLevelsDirectoryPath }: WriteLevelArgsFileArgs)
{
    const exports =
        (await Promise.all(getAllFiles(ogmoLevelsDirectoryPath).filter(x => x.endsWith(".json")).map(readOgmoLevelFile)))
            .map(generateLevelArgsExport(gameObjectResolvers));
    const moduleTypescriptText = writeModule(new Module(getDirectory(levelArgsFilePath), exports));
    console.log(moduleTypescriptText);
    createOrUpdateFile(levelArgsFilePath, moduleTypescriptText);
}