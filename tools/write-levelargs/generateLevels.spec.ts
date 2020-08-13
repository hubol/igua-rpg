import {getGameObjectResolvers} from "./tasks/getGameObjectResolvers";
import {GameObjectResolver} from "../gen-levelargs/types/gameObjectResolver";
import {writeLevelArgsFile} from "./tasks/writeLevelArgsFile";
import {requestPublishGameObjectResolvers} from "./tasks/requestPublishGameObjectResolvers";

describe("Let's generate the levels", () => {
    it("Visit and request the app to publish GameObjectResolvers", () => {
        cy.visit("http://localhost:2456");
        requestPublishGameObjectResolvers();
    })

    let gameObjectResolvers: GameObjectResolver[];
    it("Wait for GameObjectResolvers", () => {
        getGameObjectResolvers(x => gameObjectResolvers = x);
    })

    it("Do everything else", () => {
        writeLevelArgsFile({ levelArgsFilePath: "./src/levelArgs.ts", gameObjectResolvers, ogmoLevelsDirectoryPath: "./ogmo/levels" });
    });
})