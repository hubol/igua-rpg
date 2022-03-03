import * as music from "../musics";
import {Howl} from "howler";

type Title = keyof typeof music;

const volumes: Partial<Record<Title, number>> = {
    Shop: 0.8,
    JungleUnreal3: 0.85,
}

export function getMusicVolume(howl: Howl) {
    const [title] = Object.entries(music).find(([_, value]) => value === howl) || ['__undefined__'];
    return volumes[title] ?? 1;
}
