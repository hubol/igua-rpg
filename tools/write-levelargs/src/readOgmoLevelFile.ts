import {Ogmo} from "../../gen-levelargs/types/ogmo";
import {readFile} from "fs";

export async function readOgmoLevelFile(path: string)
{
    return {
        path,
        level: JSON.parse(await readFileText(path)) as Ogmo.Level
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