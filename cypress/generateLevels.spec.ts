import {ImportWriter} from "./ts-gen/importWriter";
import {getGameObjectResolvers} from "./getGameObjectResolvers";
import {GameObjectResolver} from "../src/igua/level/discoverGameObjectResolvers";
import {OgmoLevelFile, readOgmoLevelFile} from "./readOgmoLevelFile";
import {writeOgmoLevelFile} from "./ts-gen/writeOgmoLevelFile";
import {waitUntilTruthy} from "./waitUntilTruthy";

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

    const ogmoLevelFiles: OgmoLevelFile[] = [];
    it("Read ogmo level files", () => {
        cy.task("getAllFiles", "./src/ogmoLevels").then(async x => {
            const files = (x as unknown as string[]).filter(x => x.endsWith(".json"));
            files.forEach(x => readOgmoLevelFile(x, ogmoLevelFiles));
        });
    });

    const applyLevelArgsTexts: string[] = [];
    it("Generate ApplyLevelArgs texts", () => {
        for (const ogmoLevelFile of ogmoLevelFiles)
        {
            const text = writeOgmoLevelFile(ogmoLevelFile, gameObjectResolvers);
            applyLevelArgsTexts.push(text);
            cy.log(text);
        }
    });

    it("Write it", () => {
        cy.writeFile("./src/levels.ts", `${importText}

${applyLevelArgsTexts.join("\n\n")}`);
    });
})