import { EquippedItems } from "./EquippedItems";
import { EquippedPetInformation } from "./EquippedPetInformation";
import { GuildInformation } from "./GuildInformation";
import { GuildLeaderInformation } from "./GuildLeaderInformation";
import { PublicCraftlandMaps } from "./PublicCraftlandMaps";

export interface PlayerData {
    accountAvatarImage: string;
    accountBannerImage: string;
    accountBooyahPass: string;
    accountBooyahPassBadges: number;
    accountCelebrityStatus: string;
    accountCharacterId: number;
    accountCreateTime: string;
    accountEvoAccessBadge: string;
    accountHonorScore: number;
    accountLanguage: string;
    accountLastLogin: string;
    accountLevel: number;
    accountLikes: number;
    accountName: string;
    accountPinImage: string;
    accountRegion: string;
    accountSignature: string;
    accountUID: string;
    accountXP: number;
    brRankPoints: number;
    csRankPoints: number;
    equippedItems: EquippedItems;
    equippedPetInformation: EquippedPetInformation;
    equippedTitle: string;
    guildInformation: GuildInformation;
    guildLeaderInformation: GuildLeaderInformation;
    publicCraftlandMaps: PublicCraftlandMaps;
  }