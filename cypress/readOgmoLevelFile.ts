import {Ogmo} from "../src/types/ogmo";

export interface OgmoLevelFile
{
    path: string;
    level: Ogmo.Level;
}

export function readOgmoLevelFile(path: string, ogmoLevelFiles: OgmoLevelFile[])
{
    cy.readFile(path).then(x => {
        ogmoLevelFiles.push({
            path: path,
            level: x
        });
    });
}