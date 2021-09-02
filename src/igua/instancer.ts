import {merge} from "../utils/merge";
import {scene} from "./scene";
import {doNowOrOnAdded} from "../utils/extensions/pixiExtensions";

let nextInstancerId = 0;

function getDisplayObjectsByTag(tag) {
    if (!scene.displayObjectInstances[tag])
        scene.displayObjectInstances[tag] = [];
    return scene.displayObjectInstances[tag] as any[];
}

export const instancer = <T extends (...args: any) => any>(fn: T) => {
    const instancerId = nextInstancerId++;
    const wrappedFn = ((...args) => {
        const displayObject = fn(...args);
        displayObject._instancerId = instancerId;
        doNowOrOnAdded(displayObject, () => {
            const array = getDisplayObjectsByTag(displayObject._instancerId);
            array.push(displayObject);
            displayObject.on('removed', () => array.removeFirst(displayObject));
        })
        return displayObject;
    }) as T;
    return merge(wrappedFn, {
        get instances() {
            return getDisplayObjectsByTag(instancerId) as ReturnType<typeof fn>[];
        }
    });
}
