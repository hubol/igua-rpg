import {setSceneMeta} from "../igua/level/setSceneMeta";
import {scene} from "../igua/scene";
import {IguaRpgTitle, ValuableIcon} from "../textures";
import {Sprite} from "pixi.js";
import {container} from "../utils/pixi/container";
import {merge} from "../utils/merge";
import {getDefaultLooks} from "../igua/looks/getDefaultLooks";
import {Looks} from "../igua/looks/looksModel";
import {iguanaHead, iguanaPuppet} from "../igua/puppet/iguanaPuppet";
import {makeIguanaPuppetArgsFromLooks} from "../igua/looks/makeIguanaPuppetArgsFromLooks";
import {pageRoot} from "../igua/ui/pageRoot";
import {button as uiButton} from "../igua/ui/button";
import {IguaText} from "../igua/text";
import {persistence, SaveFile} from "../igua/data/persistence";
import {PageElement} from "../igua/ui/page";
import {sleep} from "../cutscene/sleep";
import {Progress} from "../igua/data/progress";
import {PurchaseFail} from "../sounds";

export async function TitleScreen() {
    scene.backgroundColor = 0x002C38;
    const t = title().at(0, 80).show();
    const c = character().show().at(138, t.getBounds().y - 10);
    const info = saveFileInfo().show();

    const peek = await persistence.peek();

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

        let lastSelected = false;

        const button = merge(uiButton(fn, 80, 25), { center, showLooks }).withStep(() => {
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

    function rootPage() {
        return [
            button('Continue', () => persistence.load()).center().showLooks(peek?.lastPlayedSaveFile),
            button('Load Game', () => goto(loadPage())).center().at(0, 30),
            button('New Game', () => goto(newPage())).center().at(0, 60),
        ];
    }

    function loadButton(text: string, file: SaveFile) {
        const disabled = !peek || !peek[file];
        const fn = disabled ? () => { PurchaseFail.play() } : () => persistence.load(file);
        const b = button(text, fn).center().showLooks(file);
        if (disabled) {
            b.alpha = 0.5;
            b.jiggle();
        }
        return b;
    }

    function loadPage() {
        return [
            loadButton('File 1', SaveFile.Slot1),
            loadButton('File 2', SaveFile.Slot2).at(0, 30),
            loadButton('File 3', SaveFile.Slot3).at(0, 60),
            button('Back', () => goto(rootPage(), 1)).center().at(0, 95),
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
            button('Back', () => {
                const elements = rootPage();
                goto(elements, elements.length - 1);
            }).center().at(0, 95),
        ];
    }

    goto(rootPage());
}

function character() {
    let lastLooks;
    let lastScared;

    const c = merge(container(), {
        showLooks(looks: Looks, scared = false) {
            if (looks === lastLooks && scared === lastScared)
                return;
            lastLooks = looks;
            lastScared = scared;
            c.removeAllChildren();
            const puppet = iguanaPuppet(makeIguanaPuppetArgsFromLooks(looks));
            if (scared) {
                puppet.duckImmediately();
                puppet.withAsync(async () => {
                    const ms = 100;
                    while (true) {
                        puppet.x += 1;
                        await sleep(ms);
                        puppet.x -= 1;
                        await sleep(ms);
                    }
                })
            }
            c.addChild(puppet);
        }
    });

    c.showLooks(getDefaultLooks());

    return c;
}

function saveFileInfo() {
    const level = IguaText.Large('');
    const valuableIcon = Sprite.from(ValuableIcon).at(0, 13);
    const valuables = IguaText.Large('').at(11, 10);
    const headContainer = container().at(85, 5);
    headContainer.scale.x = -1;
    const c = merge(container(level, valuableIcon, valuables, headContainer), {
        clear() {
            c.visible = false;
        },
        set(progress: Progress) {
            c.visible = true;
            headContainer.removeAllChildren();
            headContainer.addChild(iguanaHead(makeIguanaPuppetArgsFromLooks(progress.looks)));
            level.text = `Claw Level ${progress.level}`;
            valuables.text = progress.valuables.toString();
            return c;
        }
    });
    return c;
}

function title() {
    const c = container();
    for (let i = 1; i < 5; i++) {
        const b = Sprite.from(IguaRpgTitle).at(128 + i, i).centerAnchor();
        c.addChild(b);
        b.opaqueTint = 0x001A22;
    }

    c.addChild(Sprite.from(IguaRpgTitle).at(128, 0).centerAnchor());

    return c;
}

setSceneMeta(TitleScreen, { isLevel: false })