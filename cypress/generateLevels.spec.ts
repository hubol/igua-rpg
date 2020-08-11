import {getGameObjectResolvers} from "./utils/getGameObjectResolvers";
import {waitUntilTruthy} from "./utils/waitUntilTruthy";
import {GameObjectResolver} from "../src/types/gameObjectResolver";
import {writeLevelArgsFile} from "./tasks/writeLevelArgsFile";

describe("Let's generate the levels", () => {
    it("Visit with dev switches", () => {
        cy.visit("http://localhost:2456");

        const anyWindow = window as any;
        if (!anyWindow.dev)
            anyWindow.dev = {};
        anyWindow.dev.discoverGameObjectResolvers = true;
        anyWindow.dev.dontStartGame = true;
    })

    let gameObjectResolvers: GameObjectResolver[];
    it("Wait for gameObjectResolvers to be in localStorage", async () => {
        gameObjectResolvers = await waitUntilTruthy(getGameObjectResolvers) as any;
        cy.log(gameObjectResolvers as any);
    })

    it("Do everything else", () => {
        writeLevelArgsFile({ levelArgsFilePath: "./src/levelArgs2.ts", gameObjectResolvers, ogmoLevelsDirectoryPath: "./ogmo/levels" });
    });
})