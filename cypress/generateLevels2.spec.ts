import {getGameObjectResolvers} from "./getGameObjectResolvers";
import {waitUntilTruthy} from "./waitUntilTruthy";
import {GameObjectResolver} from "../src/types/gameObjectResolver";
import {writeLevelArgsFile} from "./writeLevelArgsFile";

describe("Let's generate the levels", () => {
    it("Visit", () => {
        cy.visit("http://localhost:2456");
    })

    let gameObjectResolvers: GameObjectResolver[];
    it("Wait for gameObjectResolvers to be in localStorage", async () => {
        gameObjectResolvers = await waitUntilTruthy(getGameObjectResolvers) as any;
        cy.log(gameObjectResolvers as any);
    })

    it("Do everything else", () => {
        writeLevelArgsFile({ levelArgsFilePath: "./src/levelArgs2.ts", gameObjectResolvers, ogmoLevelsDirectoryPath: "./src/ogmoLevels" });
    });
})