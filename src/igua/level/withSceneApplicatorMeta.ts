import {SceneApplicator, SceneApplicatorMeta} from "./sceneApplicator";
import {merge} from "../../utils/merge";

export function withSceneApplicatorMeta(applicator: SceneApplicator, meta: SceneApplicatorMeta): SceneApplicator {
    return merge(applicator, meta);
}
