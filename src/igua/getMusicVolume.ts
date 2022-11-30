import * as music from "../musics";
import {Howl} from "howler";

type Title = keyof typeof music;

const volumes: Partial<Record<Title, number>> = {
    Shop: 0.8,
    JungleUnreal3: 0.85,
    AboveVolcano: 0.6,
    AmbientLava: 0.8,
    CapitalMusicPlease: 0.65,
    BlindHouse: 0.5,
    UnusualOminousMusic: 0.7,
    UnrealQuizMusic: 0.7,
    UnrealFirefly: 0.8,
}

export function getMusicVolume(howl: Howl) {
    const [title] = Object.entries(music).find(([_, value]) => value === howl) || ['__undefined__'];
    return volumes[title] ?? 1;
}
