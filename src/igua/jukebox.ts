import {loadHowlAsync} from "../utils/resources/loadHowls";
import {wait} from "pissant";
import {getMusicVolume} from "./getMusicVolume";
import {Howl} from "howler";

class Jukebox
{
    private _currentHowl?: Howl;

    constructor(private readonly _howlsWarmer: HowlsWarmer) { }

    warm(...howls: Howl[])
    {
        howls.forEach(x => setTimeout(async () => await this._howlsWarmer.warm(x)));
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

    get currentSong()
    {
        return this._currentHowl;
    }

    private _tryingToChangeCurrentHowl: boolean = false;

    async stopAsync()
    {
        await wait(() => !this._tryingToChangeCurrentHowl);

        this._tryingToChangeCurrentHowl = true;
        try
        {
            if (this._currentHowl)
            {
                this._currentHowl.stop();
                await this._howlsWarmer.warm(this._currentHowl);
            }
            this._currentHowl = undefined;
        }
        catch (e)
        {
            console.error("Failed to stop", this._currentHowl, e);
        }
        finally
        {
            this._tryingToChangeCurrentHowl = false;
        }
    }

    async playAsync(howl: Howl)
    {
        await wait(() => !this._tryingToChangeCurrentHowl);

        if (howl === this._currentHowl)
            return;

        this._tryingToChangeCurrentHowl = true;

        try
        {
            await loadHowlAsync(howl);
            if (this._currentHowl)
            {
                await this._howlsWarmer.warm(this._currentHowl);
                this._currentHowl.stop();
            }
            this._currentHowl = howl;
            const volume = getMusicVolume(howl);
            // @ts-ignore
            howl.volume(volume).loop(true).play();
        }
        catch (e)
        {
            console.error("Failed to play", howl, e);
        }
        finally
        {
            this._tryingToChangeCurrentHowl = false;
        }
    }
}

class HowlsWarmer
{
    private readonly _warmedHowls: Howl[] = [];

    constructor(private readonly _maxWarmedHowlsCount: number) { }

    async warm(howl: Howl)
    {
        try
        {
            await loadHowlAsync(howl);
        }
        catch (e)
        {
            console.error("Failed to load", howl, e);
            return;
        }

        this._warmedHowls.removeAll(howl);
        this.unloadUntilAtLeastOneWarmedHowlsSlot();
        this._warmedHowls.unshift(howl);
    }

    private unloadUntilAtLeastOneWarmedHowlsSlot()
    {
        while (this._warmedHowls.length > this._maxWarmedHowlsCount - 1)
        {
            const warmedHowl = this._warmedHowls.pop();
            if (!warmedHowl)
                continue;

            try
            {
                warmedHowl.unload();
            }
            catch (e)
            {
                console.error("Failed to unload", warmedHowl, e);
            }
        }
    }
}

export const jukebox = new Jukebox(new HowlsWarmer(6));
