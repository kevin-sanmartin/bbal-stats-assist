export type TCompetition = {
	id: string;
	name: string;
	team_id: string;
	created_at: string;
};

export type TCreateCompetitionInput = {
	name: string;
	team_id: string;
};

export type TUpdateCompetitionInput = {
	name?: string;
};
