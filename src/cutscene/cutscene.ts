import {CancellationToken} from "pissant";
import {PromiseFn, runInIguaZone} from "./runInIguaZone";
import {game} from "../igua/game";

export type Cutscene = PromiseFn;

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
                await runInIguaZone(`Cutscene ${cutscene.name}`, cutscene, { cancellationToken: ct, ticker: game.ticker });
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
