import {loadHowlAsync} from "../utils/resources/loadHowls";
import {getMusicVolume} from "./getMusicVolume";
import {Howl} from "howler";

class Jukebox
{
    private _currentHowl?: Howl;
    playVolumeZero = false;

    constructor(private readonly _howlsWarmer: HowlsWarmer) { }

    warm(...howls: Howl[])
    {
        howls.forEach(x => setTimeout(() => this._howlsWarmer.warm(x)));
        return this;
    }

    play(howl: Howl)
    {
        setTimeout(async () => await this.playAsync(howl));
        return this;
    }

    stop()
    {
        setTimeout(async () => await this.stopAsync());
        return this;
    }

    fadeOut(target: number, ms: number) {
        if (!this.currentSong)
            return;

        this.currentSong.fade(getMusicVolume(this.currentSong), target, ms);
    }

    fadeIn(from: number, ms: number) {
        if (!this.currentSong)
            return;

        this.currentSong.fade(from, getMusicVolume(this.currentSong), ms);
    }

    get currentSong()
    {
        return this._currentHowl;
    }

    private _desiredHowl?: Howl = undefined;

    async stopAsync()
    {
        this._desiredHowl = undefined;

        try
        {
            if (this._currentHowl)
            {
                this._currentHowl.stop();
                this._howlsWarmer.warm(this._currentHowl);
            }
            this._currentHowl = undefined;
        }
        catch (e)
        {
            console.error("Failed to stop", this._currentHowl, e);
        }
    }

    async playAsync(howl: Howl)
    {
        if (howl === this._currentHowl)
            return;

        this._desiredHowl = howl;

        try
        {
            await loadHowlAsync(howl);
            if (this._desiredHowl !== howl)
                return;

            if (this._currentHowl)
            {
                this._howlsWarmer.warm(this._currentHowl);
                this._currentHowl.stop();
            }

            this._currentHowl = howl;
            const volume = getMusicVolume(howl);
            // @ts-ignore
            howl.volume(this.playVolumeZero ? 0 : volume).loop(true).play();
        }
        catch (e)
        {
            console.error("Failed to play", howl, e);
        }
    }
}

class HowlsWarmer
{
    private readonly _warmedHowls: Howl[] = [];

    constructor(private readonly _maxWarmedHowlsCount: number) { }

    warm(howl: Howl)
    {
        setTimeout(async () => {
            try
            {
                await loadHowlAsync(howl);
            }
            catch (e)
            {
                console.error("Failed to warm", howl, e);
                return;
            }

            this._warmedHowls.removeAll(howl);
            this.unloadUntilAtLeastOneWarmedHowlsSlot();
            this._warmedHowls.unshift(howl);
        });
    }

    private unloadUntilAtLeastOneWarmedHowlsSlot()
    {
        // while (this._warmedHowls.length > this._maxWarmedHowlsCount - 1)
        // {
        //     const warmedHowl = this._warmedHowls.pop();
        //     if (!warmedHowl)
        //         continue;
        //
        //     try
        //     {
        //         warmedHowl.unload();
        //     }
        //     catch (e)
        //     {
        //         console.error("Failed to unload", warmedHowl, e);
        //     }
        // }
    }
}

export const jukebox = new Jukebox(new HowlsWarmer(6));
