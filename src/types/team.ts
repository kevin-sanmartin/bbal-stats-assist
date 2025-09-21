import { ETeamCategory } from "../enums/team";

export type TTeam = {
	id: string;
	name: string;
	category: ETeamCategory;
	user_id: string;
	created_at: string;
};

export type TCreateTeamInput = {
	name: string;
	category: ETeamCategory;
};

export type TUpdateTeamInput = {
	name?: string;
	category?: ETeamCategory;
};
