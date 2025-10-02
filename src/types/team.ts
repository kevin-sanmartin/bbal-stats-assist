import { ETeamCategory } from "../enums/team";
import { TPlayer } from "./player";

export type TTeam = {
	id: string;
	name: string;
	category: ETeamCategory;
	user_id: string;
	created_at: string;
};

export type TTeamWithPlayers = TTeam & {
	players: Partial<TPlayer[]>;
};

export type TCreateTeamInput = {
	name: string;
	category: ETeamCategory;
};

export type TUpdateTeamInput = {
	name?: string;
	category?: ETeamCategory;
};
