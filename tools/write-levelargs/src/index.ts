import {app, BrowserWindow} from "electron";
import {waitForGlobal} from "./waitForGlobal";
import {GameObjectResolver} from "../../gen-levelargs/types/gameObjectResolver";
import {writeLevelArgsFile} from "./writeLevelArgsFile";

async function createWindow()
{
    const browserWindow = new BrowserWindow({ show: false });

    await browserWindow.loadURL(`http://localhost:1234?publishGameObjectResolvers=1`);
    const gameObjectResolvers =
        await waitForGlobal<GameObjectResolver[]>(browserWindow)("window.__gameObjectResolvers");

    await writeLevelArgsFile({ levelArgsFilePath: "../../src/levelArgs.ts", gameObjectResolvers, ogmoLevelsDirectoryPath: "../../raw/ogmo/levels" });

    browserWindow.close();
}

app.on("ready", createWindow);