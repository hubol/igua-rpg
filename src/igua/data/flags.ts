export function getInitialFlags()
{
    return {
        objects: {
            gotLevelValuable: new Set<string>(),
            clearedBoulder: new Set<string>(),
            permanentlyDefeatedEnemies: new Set<string>(),
            readLibraryBooks: new Set<string>(),
        },
        jungle: {
            bigua: {
                met: false,
                repairedKey: false,
                salad: {
                    held: false,
                    fed: 0,
                }
            },
            sickIguana: {
                requestedHelp: false,
                healed: false,
            },
            key: {
                shrunkenKey: false,
                fromSickIguana: false,
                fromBiguaRepair: false,
                fromSpider: false,
            },
            bigKey: {
                piece1: false,
                piece2: false,
                piece3: false,
                reward: false,
            },
            templeLever: {
                on: false,
                position: 0
            },
            spokeWithOutcast: false,
            usedBlessing: false,
            defeatedUnorthodoxAngel: false,
        },
        desert: {
            heardIntroduction: false,
            stackedAllCrates: false,
            diguaIsFollowing: false,
            diguaIsInBar: false,
            unlockedTemple: false,
            dugInDesertTown: false,
            crateStacker: {
                receivedBallon: false,
                receivedFreeRound: false,
            },
            digua: {
                discussedKey: false,
            },
            key: {
                fromTopOfCrateStack: false,
                fromInn: false,
                fromDiggingInTown: false,
            },
            bigKey: {
                piece1: false,
                piece2: false,
                piece3: false,
                reward: false,
            },
            defeatedOversizedAngel: false,
            costumeMirror: {
                shardCollected: false,
                repaired: false,
            }
        },
        oracle: {
            lore1: false,
            lore2: false,
            discussedOpeningDesertTemple: false,
        },
        volcano: {
            satisfiedPrankster: false,
            rescuedOracle: false,
            key: {
                hiddenInCave: false,
                fromPrankster: false,
                fromLava: false,
            },
            bigKey: {
                piece1: false,
                piece2: false,
                piece3: false,
                reward: false,
            },
            defeatedVileAngel: false,
            openedPathToCapital: false,
        },
        capital: {
            key: {
                fromClown: false,
                fromTiming: false,
                fromStorage: false,
            },
            bigKey: {
                piece1: false,
                piece2: false,
                piece3: false,
                reward: false,
            },
            oracle: {
                pestered: false,
            },
            turnedFireplaceOn: false,
            spokeWithStatua: false,
            openedStorage: false,
            defeatedDassmann: false,
            spokeWithOracle: false,
            solvedImpossiblePuzzle: false,
        },
        giants: {
            casinoProfit: 0,
            slotMachineDamaged: false,
        },
        final: {
            playerMetEmoWizard: false,
            oraclesLearnedTruth: false,
            doorOpened: false,
            enemiesCanBePermanentlyDefeated: false,
            defeatedOrnateAngel: false,
        },
        global: {
            somethingGreatHappened: false,
        }
    };
}
