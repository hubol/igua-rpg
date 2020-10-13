import {app, BrowserWindow} from "electron";
import { join} from "path";
import {waitForGlobal} from "./waitForGlobal";
import {GameObjectResolver} from "../../gen-levelargs/types/gameObjectResolver";
import {writeLevelArgsFile} from "./writeLevelArgsFile";

let browserWindow;

async function createWindow()
{
    browserWindow = new BrowserWindow({ show: false });

    browserWindow.loadURL(`file://${join(__dirname, ".app/index.html")}`);
    const gameObjectResolvers =
        await waitForGlobal<GameObjectResolver[]>(browserWindow)("window.__gameObjectResolvers");

    await writeLevelArgsFile({ levelArgsFilePath: "../../src/levelArgs.ts", gameObjectResolvers, ogmoLevelsDirectoryPath: "../../raw/ogmo/levels" });

    browserWindow.on("closed", () => (browserWindow = null));
    browserWindow.close();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        app.quit();
});

app.on("activate", () => {
    if (browserWindow === null)
        createWindow();
});