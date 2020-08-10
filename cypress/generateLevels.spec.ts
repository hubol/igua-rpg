import {ImportWriter} from "./ts-gen/importWriter";
import {getGameObjectResolvers} from "./getGameObjectResolvers";
import {waitUntilTruthy} from "./promises";
import {GameObjectResolver} from "../src/igua/level/discoverGameObjectResolvers";
import {getAllFiles} from "pissant-node";

describe("Let's generate the levels", () => {
    it("Visit", () => {
        cy.visit("http://localhost:2456");
    })

    let gameObjectResolvers: GameObjectResolver[];
    it("Wait for gameObjectResolvers to be in localStorage", async () => {
        gameObjectResolvers = await waitUntilTruthy(getGameObjectResolvers) as any;
        cy.log(gameObjectResolvers as any);
    })

    let importText: string;
    it("Generate imports", () => {
        const importWriter = new ImportWriter("src");
        gameObjectResolvers.forEach(x => importWriter.addImport({
            exportedName: x.exportedName,
            filePath: x.path
        }));

        importText = importWriter.write();
        cy.log(importText);
    });

    it("Goes and fucks itself", () => {
        cy.log(getAllFiles("./src/ogmoLevels") as unknown as string);
    });
})