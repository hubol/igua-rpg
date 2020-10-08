export function onViewportResize(fn: () => void)
{
    document.documentElement.onresize = fn;
    window.onresize = fn;
}