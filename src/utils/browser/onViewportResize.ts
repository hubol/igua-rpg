export function onViewportResize(fn: () => void)
{
    document.documentElement.addEventListener("resize", fn);
    window.addEventListener("resize", fn);
}