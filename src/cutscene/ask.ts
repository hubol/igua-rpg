import {BitmapText, Container, Sprite} from "pixi.js";
import {MessageBox, Cursor} from "../textures";
import {AcrobatixFont} from "../fonts";
import {game} from "../igua/game";
import {waitForKey} from "./waitForKey";
import {Key} from "../utils/browser/key";
import {IguaPromiseConfig} from "./iguaPromiseConfig";

type Answer = string;

export async function ask(question: string, config?: IguaPromiseConfig): Promise<boolean>;
export async function ask<T extends Answer>(question: string, answers: [T], config?: IguaPromiseConfig): Promise<T>;
export async function ask<T extends Answer>(question: string, answers: [T, T], config?: IguaPromiseConfig): Promise<T>;
export async function ask<T extends Answer>(question: string, answers: [T, T, T], config?: IguaPromiseConfig): Promise<T>;

export function ask()
{
    let config: IguaPromiseConfig | undefined = undefined;

    const lastArgument = arguments[arguments.length - 1];
    if (lastArgument instanceof IguaPromiseConfig)
        config = lastArgument;

    let returnBool = true;
    let answers: any[] = ["Yes", "No"];

    if (arguments.length >= 2 && Array.isArray(arguments[1]))
    {
        answers = arguments[1];
        returnBool = false;
    }

    const promise = askImpl(arguments[0] as string, answers, config);
    if (returnBool)
        return promise.then(x => x === "Yes");

    return promise;
}

async function askImpl<T extends Answer>(question: string, answers: T[], config?: IguaPromiseConfig): Promise<T>
{
    const dialogContainer = new Container().at(24, 27);
    dialogContainer
        .addChild(Sprite.from(MessageBox), new BitmapText(question, { fontName: AcrobatixFont.font, maxWidth: 196 }).at(6, 6));

    const answerGameObjectXCoordinates = getAnswerXUnitCoordinates(answers.length).map(x => x * 208);

    let selectedIndex = -1;
    const answerGameObjects = answers.map((x, i) => {
        const container = new Container();
        const bitmapText = new BitmapText(x, { fontName: AcrobatixFont.font });
        container.addChild(bitmapText);
        dialogContainer.addChild(container);

        container.x = Math.round(answerGameObjectXCoordinates[i] - container.width / 2);
        container.y = 40;
        return container;
    })

    game.hudStage.addChild(dialogContainer);

    await new Promise((resolve, reject) => {
        const cursor = Sprite.from(Cursor).withStep(() => {
            config?.cancellationToken.rejectIfCancelled(reject);

            const nothingSelected = selectedIndex === -1;

            if (Key.justWentDown("ArrowLeft") && (selectedIndex > 0 || nothingSelected))
            {
                // TODO SFX
                if (nothingSelected)
                    selectedIndex = 0;
                else
                    selectedIndex--;
            }
            else if (Key.justWentDown("ArrowRight") && (selectedIndex < answers.length - 1 || nothingSelected))
            {
                // TODO SFX
                if (nothingSelected)
                    selectedIndex = answers.length - 1;
                else
                    selectedIndex++;
            }

            cursor.visible = selectedIndex !== -1;
            if (!cursor.visible)
                return;

            resolve();
            const selectedGameObject = answerGameObjects[selectedIndex];
            cursor.position.set(selectedGameObject.x - 2, selectedGameObject.y + selectedGameObject.height);
        });
        cursor.anchor.set(1, 0.6);
        dialogContainer.addChild(cursor);
    })
    .catch(e => {
        dialogContainer.destroy();
        throw e;
    });

    await waitForKey("Space", config);
    dialogContainer.destroy();

    return answers[selectedIndex];
}

function getAnswerXUnitCoordinates(length: number)
{
    switch (length)
    {
        case 1:
            return [0.5];
        case 2:
            return [0.25, 0.75];
        case 3:
            return [0.2, 0.5, 0.8];
        default:
            return new Array<number>(length).map((_, i) => .175 + (.65 * (i / (length - 1))));
    }
}