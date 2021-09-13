export function getInitialFlags()
{
    return {
        desert: {
            heardIntroduction: false,
            stackedAllCrates: false,
            diguaIsFollowing: false,
            diguaIsInBar: false,
            unlockedTemple: false,
            dugInDesertTown: false,
            key: {
                fromCrateStacker: false,
                fromInn: false,
                fromDiggingInTown: false,
            },
            bigKey: {
                piece1: false,
                piece2: false,
                piece3: false,
            }
        },
        oracle: {
            lore1: false,
        }
    };
}
