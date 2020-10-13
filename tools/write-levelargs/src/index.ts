import {app, BrowserWindow} from "electron";
import { join} from "path";
import {waitForGlobal} from "./waitForGlobal";
import {GameObjectResolver} from "../../gen-levelargs/types/gameObjectResolver";
import {writeLevelArgsFile} from "./writeLevelArgsFile";

async function createWindow()
{
    const browserWindow = new BrowserWindow({ show: false });

    await browserWindow.loadURL(`file://${join(__dirname, ".app/index.html")}`);
    const gameObjectResolvers =
        await waitForGlobal<GameObjectResolver[]>(browserWindow)("window.__gameObjectResolvers");

    await writeLevelArgsFile({ levelArgsFilePath: "../../src/levelArgs.ts", gameObjectResolvers, ogmoLevelsDirectoryPath: "../../raw/ogmo/levels" });

    browserWindow.close();
}

app.on("ready", createWindow);