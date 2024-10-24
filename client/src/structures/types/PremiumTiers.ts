export enum PremiumTiers {
    NONE = "None",
    TIER_1 = "Foxy Premium I",
    TIER_2 = "Foxy Premium II",
    TIER_3 = "Foxy Premium III",
}

export function getTier(nameOrNumber: string, expiryAt: Date): PremiumTiers | null {
    if (expiryAt < new Date()) return PremiumTiers.NONE;
    
    switch (nameOrNumber) {
        case "0":
            return PremiumTiers.NONE;
        case "1":
        case "Foxy Premium I":
            return PremiumTiers.TIER_1;
        case "2":
        case "Foxy Premium II":
            return PremiumTiers.TIER_2;
        case "3":
        case "Foxy Premium III":
            return PremiumTiers.TIER_3;
        default:
            return PremiumTiers.NONE;
    }
}
