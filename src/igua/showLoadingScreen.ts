import {AsshatApplication} from "../utils/pixi/createApplication";
import {Container, Graphics} from "pixi.js";
import {now} from "../utils/now";
import {approachLinear} from "../utils/math/number";
import {environment} from "./environment";

const ExpectedResourceLength = 250;
const MaxUnitUntilReady = 0.9;
const LoadingBarInterpolationFactor = 0.02;
const LoadingBarColor = 0xCCAE0A;
const LoadingBarY = 256 - 32;
const MinimumLoadingScreenTimeS = 0.2;

export function newReady() {
    return {
        ready() {
            this.readySince = now.s;
        },
        readySince: -1,
        get isReady() {
            return this.readySince > -1;
        }
    };
}

type Ready = ReturnType<typeof newReady>;

function makeStage(app: AsshatApplication) {
    const stage = new Container();
    app.stage.addChild(stage);
    const bg = new Graphics().beginFill(0x002C38).drawRect(0, 0, 256, 256);
    stage.addChild(bg);

    return stage;
}

export function showLoadingScreen(app: AsshatApplication, ready: Ready) {
    if (!environment.isProduction || environment.isElectron)
        return showEmptyScreen(app, ready);
    return showLoadingScreenImpl(app, ready);
}

function showLoadingScreenImpl(app: AsshatApplication, ready: Ready) {
    const startTimeS = now.s;

    function getTargetUnit() {
        if (ready.isReady)
            return 1;
        return Math.min(MaxUnitUntilReady, window.performance.getEntriesByType("resource").length / ExpectedResourceLength);
    }

    const stage = makeStage(app);
    const gfx = new Graphics();
    gfx.y = LoadingBarY;
    let unit = 0;

    stage.addChild(gfx);

    return new Promise<void>(r => {
        function animate() {
            if (unit >= 1 && now.s >= startTimeS + MinimumLoadingScreenTimeS)
                r();
            else
                requestAnimationFrame(animate);

            unit = approachLinear(unit, getTargetUnit(), LoadingBarInterpolationFactor);
            gfx.clear().lineStyle(1, LoadingBarColor).lineTo(256 * unit, 0);
        }

        animate();
    })
    .then(() => stage.destroy());
}

function showEmptyScreen(app: AsshatApplication, ready: Ready) {
    const stage = makeStage(app);

    return new Promise<void>(r => {
        function animate() {
            if (ready.isReady)
                r();
            else
                requestAnimationFrame(animate);
        }

        animate();
    })
    .then(() => stage.destroy());
}