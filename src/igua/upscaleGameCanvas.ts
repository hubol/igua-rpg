import {viewport} from "../utils/viewport";
import {onViewportResize} from "../utils/onViewportResize";

export function upscaleGameCanvas(gameCanvasElementId: string)
{
    const doUpscale = makeDoUpscale(gameCanvasElementId);
    doUpscale();
    onViewportResize(doUpscale);
}

function makeDoUpscale(gameCanvasElementId: string)
{
    let lastSeenViewportMin = -1;

    return function()
    {
        const element = document.getElementById(gameCanvasElementId);
        if (!element)
        {
            lastSeenViewportMin = -1;
            return;
        }

        if (viewport.min === lastSeenViewportMin)
            return;

        const size = Math.max(1, Math.floor(viewport.min / 256 - .125)) * 256;
        const sizeString = `${size}px`;
        element.style.width = sizeString;
        element.style.height = sizeString;
        lastSeenViewportMin = viewport.min;
    }
}