import {BrowserWindow} from "electron";
import {timeout} from "../../../src/utils/promise/timeout";

export function waitForGlobal<T>(browserWindow: BrowserWindow)
{
    return async function(globalProperty: string)
    {
        while (true)
        {
            const property = await browserWindow.webContents.executeJavaScript(globalProperty);
            if (property !== undefined)
                return property as T;
            await timeout(67);
        }
    }
}