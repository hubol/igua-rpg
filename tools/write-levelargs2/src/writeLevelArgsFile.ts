import {__nodeOnly__writeLevelArgsFile} from "../../write-levelargs/nodeOnly/writeLevelArgsFile";
import {GameObjectResolver} from "../../gen-levelargs/types/gameObjectResolver";

export interface WriteLevelArgsFileArgs
{
    gameObjectResolvers: GameObjectResolver[],
    ogmoLevelsDirectoryPath: string,
    levelArgsFilePath: string
}

export async function writeLevelArgsFile(args: WriteLevelArgsFileArgs)
{
    await __nodeOnly__writeLevelArgsFile(args);
}