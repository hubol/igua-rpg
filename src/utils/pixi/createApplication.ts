import {autoDetectRenderer, Container, InteractionManager} from "pixi.js";
import {Animator} from "./animator";

type ApplicationOptions = Parameters<typeof autoDetectRenderer>[0] & { maxFps: number, showCursor?: boolean };

export type AsshatApplication = ReturnType<typeof createApplication>;

export function createApplication(options: ApplicationOptions)
{
    const stage = new Container();
    const renderer = autoDetectRenderer(options);
    const animator = new Animator(options.maxFps);
    animator.add(() => renderer.render(stage));

    if (options.showCursor === false)
        (renderer.plugins.interaction as InteractionManager).cursorStyles.default = "none";

    return {
        canvasElement: renderer.view,
        renderer: renderer,
        stage: stage,
        animator,
        maxFps: options.maxFps
    };
}
