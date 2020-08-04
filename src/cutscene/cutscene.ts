export type Cutscene = Promise<any>;

export class CutscenePlayer
{
    private _currentCutscene: Cutscene | undefined = undefined;

    public playCutscene(cutscene: Cutscene)
    {
        if (this._currentCutscene)
            console.warn(`Playing cutscene ${cutscene} before cutscene ${this._currentCutscene} finished.`);

        this._currentCutscene = cutscene;

        setTimeout(async () => {
            try
            {
                await cutscene;
            }
            catch (e)
            {
                console.error(`Error while playing cutscene ${cutscene}:
${e}`);
            }
            finally
            {
                if (this._currentCutscene == cutscene)
                    this._currentCutscene = undefined;
            }
        });
    }

    public get isPlayingCutscene()
    {
        return !!this._currentCutscene;
    }
}