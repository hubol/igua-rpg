import {viewport} from "../utils/browser/viewport";
import {onViewportResize} from "../utils/browser/onViewportResize";

export function upscaleGameCanvas(canvasElement: HTMLCanvasElement)
{
    const doUpscale = makeDoUpscale(canvasElement);
    doUpscale();
    onViewportResize(doUpscale);
}

function makeDoUpscale(canvas: HTMLCanvasElement)
{
    let lastSeenViewportMin = -1;

    return function()
    {
        if (viewport.min === lastSeenViewportMin)
            return;

        const padding = viewport.min * 0.125;
        const availableWidth = viewport.width - padding;
        const availableHeight = viewport.height - padding;

        const availableAspectRatio = availableWidth / availableHeight;
        const naturalAspectRatio = canvas.width / canvas.height;

        const linearScale = availableAspectRatio < naturalAspectRatio
            ? (availableWidth / canvas.width)
            : (availableHeight / canvas.height);

        const scale = getSteppedScale(linearScale);

        const width = scale * canvas.width;
        const height = scale * canvas.height;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        lastSeenViewportMin = viewport.min;
    }
}

function getSteppedScale(linearScale: number)
{
    if (window.devicePixelRatio > 0)
        return Math.max(1, Math.floor(linearScale * window.devicePixelRatio)) / window.devicePixelRatio;
    return Math.max(1, Math.floor(linearScale));
}