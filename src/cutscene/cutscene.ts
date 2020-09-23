import {makePromiseLibrary, PromiseLibrary} from "./promiseLibrary";
import {CancellationToken} from "pissant";

export type Cutscene = (p: PromiseLibrary) => Promise<any>;

export class CutscenePlayer
{
    private _currentCutscene: Cutscene | undefined = undefined;

    playCutscene(cutscene: Cutscene)
    {
        if (this._currentCutscene)
            console.warn("Playing cutscene", cutscene, "before cutscene", this._currentCutscene, "finished.");

        this._currentCutscene = cutscene;

        const ct = new CancellationToken();

        setTimeout(async () => {
            try
            {
                await cutscene(makePromiseLibrary(ct));
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

    get isPlayingCutscene()
    {
        return !!this._currentCutscene;
    }

    get currentCutscene()
    {
        return this._currentCutscene;
    }
}