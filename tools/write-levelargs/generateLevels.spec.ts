import {getGameObjectResolvers} from "./tasks/getGameObjectResolvers";
import {GameObjectResolver} from "../gen-levelargs/types/gameObjectResolver";
import {writeLevelArgsFile} from "./tasks/writeLevelArgsFile";

describe("Let's generate the levels", () => {
    it("Visit the app", () => {
        cy.visit("http://localhost:2456");
    })

    let gameObjectResolvers: GameObjectResolver[];
    it("Wait for GameObjectResolvers", () => {
        getGameObjectResolvers(x => gameObjectResolvers = x);
    })

    it("Do everything else", () => {
        writeLevelArgsFile({ levelArgsFilePath: "./src/levelArgs.ts", gameObjectResolvers, ogmoLevelsDirectoryPath: "./raw/ogmo/levels" });
    });
})