import {GameObjectResolver} from "../../gen-levelargs/types/gameObjectResolver";

export interface WriteLevelArgsFileArgs
{
    gameObjectResolvers: GameObjectResolver[],
    ogmoLevelsDirectoryPath: string,
    levelArgsFilePath: string
}

export function writeLevelArgsFile(args: WriteLevelArgsFileArgs)
{
    return cy.task("writeLevelArgsFile", args);
}