import { EMatchType, EMatchLocation } from "@/enums/match";

export type TMatch = {
	id: string;
	opponent: string;
	score: number;
	opponent_score: number;
	date: Date;
	location: EMatchLocation;
	team_id: string;
	competition_id?: string;
	created_at: string;
};

export type TCreateMatchInput = {
	opponent: string;
	score: number;
	opponent_score: number;
	date: Date;
	location: EMatchLocation;
	team_id: string;
	competition_id?: string;
};

export type TMatchFlow = {
	selectedTeam: string | null;
	selectedCompetition: string | null;
	matchType: EMatchType | null;
};
