import { EActionType } from "../enums/action";

export type TAction = {
	id: string;
	type: EActionType;
	position_x: number;
	position_y: number;
	player_id: string;
	game_id: string;
	created_at: string;
};

export type TCreateActionInput = {
	type: EActionType;
	position_x: number;
	position_y: number;
	player_id: string;
	game_id: string;
};

export type TUpdateActionInput = {
	type?: EActionType;
	position_x?: number;
	position_y?: number;
	player_id?: string;
	game_id?: string;
};
