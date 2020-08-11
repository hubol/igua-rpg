import {getGameObjectResolvers} from "./utils/getGameObjectResolvers";
import {waitUntilTruthy} from "./utils/waitUntilTruthy";
import {GameObjectResolver} from "../gen-levelargs/types/gameObjectResolver";
import {writeLevelArgsFile} from "./tasks/writeLevelArgsFile";
import {requestPublishGameObjectResolvers} from "./tasks/requestPublishGameObjectResolvers";

describe("Let's generate the levels", () => {
    it("Visit and request the app to publish GameObjectResolvers", () => {
        cy.visit("http://localhost:2456");
        requestPublishGameObjectResolvers();
    })

    let gameObjectResolvers: GameObjectResolver[];
    it("Wait for GameObjectResolvers", async () => {
        gameObjectResolvers = await waitUntilTruthy(getGameObjectResolvers) as any;
        cy.log(gameObjectResolvers as any);
    })

    it("Do everything else", () => {
        writeLevelArgsFile({ levelArgsFilePath: "./src/levelArgs2.ts", gameObjectResolvers, ogmoLevelsDirectoryPath: "./ogmo/levels" });
    });
})