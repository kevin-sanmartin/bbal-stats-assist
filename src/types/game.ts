import { TCompetition } from "./competition";
import { TTeam } from "./team";

export type TGame = {
	id: string;
	opponent: string;
	score: number;
	opponent_score: number;
	date: string;
	location: "HOME" | "AWAY";
	team_id: string;
	competition_id?: string;
	created_at: string;
};

export type TGameWithRelations = TGame & {
	competition: TCompetition | null;
	team: TTeam | null;
};

export type TCreateGameInput = {
	opponent: string;
	score: number;
	opponent_score: number;
	date: string;
	location: "HOME" | "AWAY";
	team_id: string;
	competition_id?: string;
};

export type TUpdateGameInput = {
	opponent?: string;
	score?: number;
	opponent_score?: number;
	date?: string;
	location?: "HOME" | "AWAY";
	competition_id?: string;
};
