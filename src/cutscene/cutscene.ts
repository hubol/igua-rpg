import {makePromiseLibrary, PromiseLibrary} from "./promiseLibrary";
import {CancellationToken} from "pissant";
import {IguaPromiseConfig} from "./iguaPromiseConfig";
import {game} from "../igua/game";

export type Cutscene = (p: PromiseLibrary) => Promise<any>;

class CutscenePlayer
{
    private _currentCutscene: Cutscene | undefined = undefined;

    play(cutscene: Cutscene)
    {
        if (this._currentCutscene)
            console.warn("Playing cutscene", cutscene, "before cutscene", this._currentCutscene, "finished.");

        this._currentCutscene = cutscene;

        const ct = new CancellationToken();

        setTimeout(async () => {
            try
            {
                await cutscene(makePromiseLibrary(new IguaPromiseConfig(game.ticker, ct)));
            }
            catch (e)
            {
                console.error("Error while playing cutscene", cutscene, e);
            }
            finally
            {
                ct.cancel();

                if (this._currentCutscene == cutscene)
                    this._currentCutscene = undefined;
            }
        });
    }

    get isPlaying()
    {
        return !!this._currentCutscene;
    }

    get current()
    {
        return this._currentCutscene;
    }
}

export const cutscene = new CutscenePlayer();