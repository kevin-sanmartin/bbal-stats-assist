export interface CourtPosition {
	x: number; // 0-28 (mètres FIBA, référence horizontale)
	y: number; // 0-15 (mètres FIBA, référence horizontale)
}

export interface CourtClick {
	id: string;
	position: CourtPosition;
	timestamp: number;
}