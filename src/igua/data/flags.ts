export function getInitialFlags()
{
    return {
        objects: {
            gotLevelValuable: new Set<string>(),
            clearedBoulder: new Set<string>(),
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
            }
        },
        oracle: {
            lore1: false,
            discussedOpeningDesertTemple: false,
        }
    };
}
