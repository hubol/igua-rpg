import {merge} from "../utils/object/merge";
import {scene} from "./scene";
import {doNowOrOnAdded} from "../utils/extensions/pixiExtensions";

let nextTrackingId = 0;

function getTrackedDisplayObjects(id) {
    if (!scene.trackedDisplayObjects[id])
        scene.trackedDisplayObjects[id] = [];
    return scene.trackedDisplayObjects[id] as any[];
}

export const track = <T extends (...args: any) => any>(fn: T) => {
    const trackingId = nextTrackingId++;
    const wrappedFn = ((...args) => {
        const displayObject = fn(...args);
        displayObject._trackingId = trackingId;
        doNowOrOnAdded(displayObject, () => {
            const array = getTrackedDisplayObjects(displayObject._trackingId);
            array.push(displayObject);
            displayObject.on('removed', () => array.removeFirst(displayObject));
        })
        return displayObject;
    }) as T;
    return merge(wrappedFn, {
        get instances() {
            return getTrackedDisplayObjects(trackingId) as ReturnType<typeof fn>[];
        },
        destroyAll() {
            [...this.instances].forEach(x => x.destroy());
        }
    });
}
