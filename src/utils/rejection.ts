export function rejection(message: string, severity: "low" = "low")
{
    return { message, severity };
}

export function handleIguaPromiseRejection(ev: PromiseRejectionEvent)
{
    if (!ev?.reason?.severity)
        return;

    const reason = ev.reason as ReturnType<typeof rejection>;
    if (reason.severity === "low")
        console.log(ev.promise, ev.reason);
    else
        console.error(ev.promise, ev.reason);

    ev.preventDefault();
}
