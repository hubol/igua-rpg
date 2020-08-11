import {generateLevelArgsExport} from "./generateLevelArgsExport";
import {Module} from "./ts-gen/components/module";
import {writeModule} from "./ts-gen/writeModule";
import {OgmoLevelFile} from "./readOgmoLevelFile";
import {WriteLevelArgsFileArgs} from "./writeLevelArgsFile";
import {readFile} from "fs";
import {createOrUpdateFile, getAllFiles, getDirectory} from "pissant-node";

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

async function readOgmoLevelFile(path: string): Promise<OgmoLevelFile>
{
    return {
        path,
        level: JSON.parse(await readFileText(path)) as any
    }
}

function readFileText(path: string)
{
    return new Promise<string>((resolve, reject) => {
        readFile(path, (err, data) => {
            if (err)
                reject(err);
            resolve(data.toString());
        })
    });
}
