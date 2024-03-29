import {setSceneMeta} from "../igua/level/setSceneMeta";
import {scene} from "../igua/scene";
import {IguaRpgTitle, ValuableIcon} from "../textures";
import {Graphics, Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/object/merge";
import {getDefaultLooks} from "../igua/looks/getDefaultLooks";
import {Looks} from "../igua/looks/looksModel";
import {iguanaHead, iguanaPuppet} from "../igua/puppet/iguanaPuppet";
import {makeIguanaPuppetArgsFromLooks} from "../igua/looks/makeIguanaPuppetArgsFromLooks";
import {pageRoot} from "../igua/ui/pageRoot";
import {button as uiButton} from "../igua/ui/button";
import {IguaText} from "../igua/text";
import {persistence, SaveFile} from "../igua/data/persistence";
import {PageElement} from "../igua/ui/page";
import {Progress} from "../igua/data/progress";
import {PurchaseFail} from "../sounds";
import {getCompletionText} from "../igua/data/getCompletion";
import {jukebox} from "../igua/jukebox";
import {TitleScreen as Music} from "../musics";
import {Vibratey} from "../igua/puppet/mods/vibratey";
import {environment} from "../igua/environment";
import {getWorldBounds} from "../igua/gameplay/getCenter";

export async function TitleScreen() {
    jukebox.play(Music);
    scene.backgroundColor = 0x002C38;
    const t = title().at(0, 80).show();

    const peek = await persistence.peek();

    const c = character().show().at(138, t.getBounds().y - 10);
    const info = saveFileInfo().show();

    showDemoText();

    const noExistingFiles = !peek || (!peek.file1 && !peek.file2 && !peek.file3);

    const root = pageRoot().show().at(20, 123);

    function button(text: string, fn: () => unknown) {
        const font = IguaText.Large(text).at(6, 6);
        let progress: Progress | undefined;
        let looks = getDefaultLooks();
        let looksScared = false;

        function center() {
            // @ts-ignore
            font.anchor.x = 0.5;
            font.x = 40;
            return button;
        }

        function showLooks(file?: SaveFile, scared = false) {
            if (file && peek && peek[file]) {
                progress = peek[file]!;
                looks = progress!.looks;
            }
            looksScared = scared;
            return button;
        }

        function disabled() {
            button.onPress = () => { PurchaseFail.play() };
            button.alpha = 0.5;
            button.jiggle();
            return button;
        }

        let lastSelected = false;

        const button = merge(uiButton(fn, 80, 25), { center, showLooks, disabled }).withStep(() => {
            if (button.selected !== lastSelected && button.selected) {
                c.showLooks(looks, looksScared);
                if (progress)
                    info.set(progress).at(button.getBounds().add(90, 1));
                else
                    info.clear();
            }
            lastSelected = button.selected;
        });
        button.addChild(font);
        return button;
    }

    function goto(elements: PageElement[], selectionIndex = 0) {
        root.goto(elements, { selectionIndex });
    }

    async function loadFile(file: SaveFile) {
        jukebox.stop();
        await persistence.load(file);
    }

    function rootPage() {
        const e = [
            button('Continue', () => loadFile(peek?.lastPlayedSaveFile!)).center().showLooks(peek?.lastPlayedSaveFile),
            button('Load Game', () => goto(loadPage())).center().at(0, 30),
            button('New Game', () => goto(newPage())).center().at(0, 60),
        ];

        if (environment.isElectron)
            e.push(button('Quit', () => window.close()).center().at(0, 90 + 5));

        if (!peek?.lastPlayedSaveFile)
            e[0].disabled();

        if (noExistingFiles)
            e[1].disabled();

        return e;
    }

    function loadButton(text: string, file: SaveFile) {
        const disabled = !peek || !peek[file];
        const b = button(text, () => loadFile(file)).center().showLooks(file);
        if (disabled)
            b.disabled();
        return b;
    }

    function loadPage() {
        return [
            loadButton('File 1', SaveFile.Slot1),
            loadButton('File 2', SaveFile.Slot2).at(0, 30),
            loadButton('File 3', SaveFile.Slot3).at(0, 60),
            button('Back', () => goto(rootPage(), 1)).center().escape().at(0, 95),
        ];
    }

    function newButton(text: string, file: SaveFile) {
        const exists = peek && !!peek[file];
        return button(exists ? 'Overwrite' : text, () => persistence.new(file)).center().showLooks(file, exists);
    }

    function newPage() {
        return [
            newButton('File 1', SaveFile.Slot1),
            newButton('File 2', SaveFile.Slot2).at(0, 30),
            newButton('File 3', SaveFile.Slot3).at(0, 60),
            button('Back', () => goto(rootPage(), 2)).center().escape().at(0, 95),
        ];
    }

    goto(rootPage(), noExistingFiles ? 2 : 0);
}

export const TitleScreenGameObjects = {
    character,
    title,
}

function character(duck = false) {
    const c = merge(container(), {
        showLooks(looks: Looks, scared = false) {
            c.removeAllChildren();
            const puppet = iguanaPuppet(makeIguanaPuppetArgsFromLooks(looks));
            if (scared || duck)
                puppet.duckImmediately();
            if (scared)
                puppet.mods.add(Vibratey);

            c.addChild(puppet);
        }
    });

    c.showLooks(getDefaultLooks());

    return c;
}

function saveFileInfo() {
    const level = IguaText.Large('');
    const valuableIcon = Sprite.from(ValuableIcon).at(26, 13);
    const valuables = IguaText.Large('').at(valuableIcon.x + 11, 10);
    const headContainer = container();
    const completion = IguaText.Large('').at(0, 10);
    const newGamePlus = newGamePlusMarker().at(9, -5);
    const text = container(level, valuables);
    const right = container(headContainer, newGamePlus).at(85, 5);
    headContainer.scale.x = -1;
    const c = merge(container(text, valuableIcon, completion, right), {
        clear() {
            c.visible = false;
        },
        set(progress: Progress) {
            c.visible = true;
            headContainer.removeAllChildren();
            headContainer.addChild(iguanaHead(makeIguanaPuppetArgsFromLooks(progress.looks)));
            level.text = `Claw Level ${progress.levels.strength}`;
            completion.text = getCompletionText(progress);
            valuables.text = progress.valuables.toString();
            newGamePlus.text = getNewGamePlusText(progress.newGamePlus);
            right.x = getWorldBounds(text).width + 24;
            return c;
        }
    });
    return c;
}

function getNewGamePlusText(ng: number) {
    if (ng === 0)
        return '';
    if (ng === 1)
        return 'NG+';
    return `NG+${ng}`;
}

function newGamePlusMarker() {
    const gfx = new Graphics();
    const text = IguaText.Large('').at(2, -1);
    const c = merge(container(gfx, text), { set text(value: string) { text.text = value; c.visible = !!value; } })
        .withStep(() => {
            gfx.clear()
                .beginFill(0x005870)
                .drawRect(0, 1, text.textWidth + 3, 9)
                .drawRect(1, 0, text.textWidth + 1, 11);
        });
    return c;
}

function title(dropShadow = true) {
    const c = container();
    if (dropShadow) {
        for (let i = 1; i < 5; i++) {
            const b = Sprite.from(IguaRpgTitle).at(128 + i, i).centerAnchor();
            c.addChild(b);
            b.opaqueTint = 0x001A22;
        }
    }

    c.addChild(Sprite.from(IguaRpgTitle).at(128, 0).centerAnchor());

    return c;
}

function getVersionText() {
    if (environment.isDemo)
        return 'Demo Ver.'
    return `Ver. ${environment.version}`;
}

function showDemoText() {
    const demo = IguaText.Large(getVersionText(), {tint: 0x005870}).at(254, 255).show();
    // @ts-ignore
    demo.anchor.set(1);
}

setSceneMeta(TitleScreen, { isLevel: false })