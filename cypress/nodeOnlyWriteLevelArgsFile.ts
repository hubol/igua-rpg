import {generateLevelArgsExport} from "./generateLevelArgsExport";
import {Module} from "./ts-gen/components/module";
import {writeModule} from "./ts-gen/writeModule";
import {OgmoLevelFile} from "./readOgmoLevelFile";
import {WriteLevelArgsFileArgs} from "./writeLevelArgsFile";
import {readFile} from "fs";
import {getAllFiles, getDirectory} from "pissant-node";

export async function __nodeOnly__writeLevelArgsFile(
    { gameObjectResolvers, levelArgsFilePath, ogmoLevelsDirectoryPath }: WriteLevelArgsFileArgs)
{
    const exports =
        (await Promise.all(getAllFiles(ogmoLevelsDirectoryPath).map(getOgmoLevelFile)))
            .map(generateLevelArgsExport(gameObjectResolvers));
    const module = new Module(getDirectory(levelArgsFilePath), exports);
    console.log(writeModule(module));
}

async function getOgmoLevelFile(path: string): Promise<OgmoLevelFile>
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
