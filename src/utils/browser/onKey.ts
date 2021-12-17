export function onKey(code: string) {
    return {
        up(fn: Function) {
            document.addEventListener("keyup", ev => {
                if (ev.code !== code)
                    return;

                fn();
            });
        }
    }
}
