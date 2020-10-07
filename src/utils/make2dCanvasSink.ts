export function make2dCanvasSink(canvasElement: HTMLCanvasElement)
{
    console.log("Using 2d canvas sink");

    const clonedCanvasElement = document.createElement("canvas");
    const { width, height } = canvasElement;
    clonedCanvasElement.width = width;
    clonedCanvasElement.height = height;
    const context = clonedCanvasElement.getContext("2d");
    context?.fillRect(0, 0, width, height);

    function copyToCanvas()
    {
        const width = clonedCanvasElement.style.width;
        const height = clonedCanvasElement.style.height;
        clonedCanvasElement.style.cssText = canvasElement.style.cssText;
        clonedCanvasElement.style.width = width;
        clonedCanvasElement.style.height = height;
        context?.drawImage(canvasElement, 0, 0);
        requestAnimationFrame(copyToCanvas);
    }

    requestAnimationFrame(copyToCanvas);

    return clonedCanvasElement;
}