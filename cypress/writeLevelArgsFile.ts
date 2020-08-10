import {GameObjectResolver} from "../src/types/gameObjectResolver";

export interface WriteLevelArgsFileArgs
{
    gameObjectResolvers: GameObjectResolver[],
    ogmoLevelsDirectoryPath: string,
    levelArgsFilePath: string
}

export function writeLevelArgsFile(args: WriteLevelArgsFileArgs)
{
    cy.task("writeLevelArgsFile", args);
}