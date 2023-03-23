type Event = 'defeatDesertBoss' | 'defeatJungleBoss' | 'defeatVolcanoBoss' | 'defeatFinalBoss' | 'completeGame';

export const GameEvent = {
    broadcast(event: Event) {
        setTimeout(() => {
            console.log(`Game event`, event);
            const onGameEvent = getOnGameEventHandler();
            if (onGameEvent) {
                onGameEvent(event);
                console.log(`Broadcast`, event);
            }
        });
    }
}

function getOnGameEventHandler() {
    // @ts-ignore
    return (window.electronApi?.onGameEvent) as ((event: Event) => void) | undefined;
}