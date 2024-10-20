export interface PlayerStats {
  soloStats: SoloStats;
  duoStats: DuoStats;
  quadStats: QuadStats;
}

export interface SoloStats {
  accountId: string;
  gamesPlayed: number;
  wins: number;
  kills: number;
  detailedStats: DetailedStats;
}

export interface DuoStats {
  accountId: string;
  gamesPlayed: number;
  wins: number;
  kills: number;
  detailedStats: DetailedStats;
}

export interface QuadStats {
  accountId: string;
  gamesPlayed: number;
  wins: number;
  kills: number;
  detailedStats: DetailedStats;
}

export interface DetailedStats {
  deaths: number;
  topNTimes: number;
  distanceTravelled: number;
  survivalTime: number;
  highestKills: number;
  damage: number;
  headshots: number;
  headshotKills: number;
  pickUps: number;
  revives?: number;    // Optional if not available in DuoStats
  roadKills?: number;  // Optional if not available in QuadStats
  knockDown?: number;  // Optional if not available in QuadStats
}
