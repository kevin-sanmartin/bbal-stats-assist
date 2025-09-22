import { EPlayerPosition } from "../enums/player";

export type TPlayer = {
	id: string;
	name: string;
	number: number;
	position: EPlayerPosition;
	team_id: string;
	created_at: string;
};

export type TCreatePlayerInput = {
	name: string;
	number: number;
	position: EPlayerPosition;
	team_id: string;
};

export type TUpdatePlayerInput = {
	name?: string;
	number?: number;
	position?: EPlayerPosition;
};