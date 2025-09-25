export type TGame = {
	id: string;
	opponent: string;
	score: number;
	opponent_score: number;
	date: string;
	location: 'HOME' | 'AWAY';
	team_id: string;
	competition_id?: string;
	created_at: string;
	updated_at: string;
};

export type TCreateGameInput = {
	opponent: string;
	score: number;
	opponent_score: number;
	date: string;
	location: 'HOME' | 'AWAY';
	team_id: string;
	competition_id?: string;
};

export type TUpdateGameInput = {
	opponent?: string;
	score?: number;
	opponent_score?: number;
	date?: string;
	location?: 'HOME' | 'AWAY';
	competition_id?: string;
};