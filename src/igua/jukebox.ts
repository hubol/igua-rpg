import {loadHowlAsync} from "../utils/loadHowls";
import {wait} from "pissant";

class Jukebox
{
    private _currentHowl?: Howl;
    private readonly _howlsWarmer: HowlsWarmer;

    constructor(howlsWarmer: HowlsWarmer)
    {
        this._howlsWarmer = howlsWarmer;
    }

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

    private _tryingToPlayHowl: boolean = false;

    async playAsync(howl: Howl)
    {
        await wait(() => !this._tryingToPlayHowl);
        this._tryingToPlayHowl = true;

        try
        {
            await loadHowlAsync(howl);
            if (this._currentHowl)
            {
                await this._howlsWarmer.warm(this._currentHowl);
                this._currentHowl.stop();
            }
            this._currentHowl = howl;
            howl.loop(true).play();
        }
        catch (e)
        {
            console.error("Failed to play", howl, e);
        }
        finally
        {
            this._tryingToPlayHowl = false;
        }
    }
}

class HowlsWarmer
{
    private readonly _warmedHowls: Howl[] = [];
    private readonly _maxWarmedHowlsCount: number;

    constructor(maxWarmedHowlsCount: number)
    {
        this._maxWarmedHowlsCount = maxWarmedHowlsCount;
    }

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

        this.ensureAtLeastOneWarmedHowlsSlot();
        this._warmedHowls.unshift(howl);
    }

    private ensureAtLeastOneWarmedHowlsSlot()
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