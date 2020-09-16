import {viewport} from "../utils/viewport";
import {onViewportResize} from "../utils/onViewportResize";

export function upscaleGameCanvas(canvasElement: HTMLCanvasElement)
{
    const doUpscale = makeDoUpscale(canvasElement);
    doUpscale();
    onViewportResize(doUpscale);
}

function makeDoUpscale(element: HTMLCanvasElement)
{
    let lastSeenViewportMin = -1;

    return function()
    {
        if (viewport.min === lastSeenViewportMin)
            return;

        const width = Math.max(1, Math.floor(viewport.min / element.width - .125)) * element.width;
        const height = Math.max(1, Math.floor(viewport.min / element.height - .125)) * element.height;

        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
        lastSeenViewportMin = viewport.min;
    }
}