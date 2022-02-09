import {BrowserWindow} from "electron";
import {sleep} from "pissant";

export function waitForGlobal<T>(browserWindow: BrowserWindow)
{
    return async function(globalProperty: string)
    {
        while (true)
        {
            const property = await browserWindow.webContents.executeJavaScript(globalProperty);
            console.log(property);
            if (property !== undefined)
                return property as T;
            await sleep(67);
        }
    }
}