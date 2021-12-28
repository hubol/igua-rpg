import {LevelApplicator, LevelApplicatorMeta} from "./levelApplicator";
import {merge} from "../../utils/merge";

export function withLevelApplicatorMeta(levelApplicator: LevelApplicator, meta: LevelApplicatorMeta): LevelApplicator {
    return merge(levelApplicator, meta);
}
