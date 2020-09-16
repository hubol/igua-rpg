import {viewport} from "../utils/viewport";
import {onViewportResize} from "../utils/onViewportResize";

export function upscaleGameCanvas(gameCanvasElement: HTMLElement)
{
    const doUpscale = makeDoUpscale(gameCanvasElement);
    doUpscale();
    onViewportResize(doUpscale);
}

function makeDoUpscale(element: HTMLElement)
{
    let lastSeenViewportMin = -1;

    return function()
    {
        if (viewport.min === lastSeenViewportMin)
            return;

        const size = Math.max(1, Math.floor(viewport.min / 256 - .125)) * 256;
        const sizeString = `${size}px`;
        element.style.width = sizeString;
        element.style.height = sizeString;
        lastSeenViewportMin = viewport.min;
    }
}