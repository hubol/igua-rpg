import {resolveGameObject} from "../igua/level/resolveGameObject";
import { Vector } from "../utils/math/vector";

export const resolvePath = resolveGameObject('Path', (e) => [ e.vcpy(), ...e.nodes ] as Vector[]);