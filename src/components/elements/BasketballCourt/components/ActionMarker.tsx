import { CLICK_MARKER } from '../constants';

interface ActionMarkerProps {
	x: number;
	y: number;
	id: string;
	actionType?: string;
	playerName?: string;
	color?: string;
}

export default function ActionMarker({ x, y, id, actionType, playerName, color }: ActionMarkerProps) {
	// Si pas d'action définie, affichage par défaut (croix rouge)
	if (!actionType) {
		return (
			<g key={id}>
				<line
					x1={x - CLICK_MARKER.CROSS_SIZE}
					y1={y - CLICK_MARKER.CROSS_SIZE}
					x2={x + CLICK_MARKER.CROSS_SIZE}
					y2={y + CLICK_MARKER.CROSS_SIZE}
					stroke={CLICK_MARKER.COLOR}
					strokeWidth={CLICK_MARKER.STROKE_WIDTH}
					strokeLinecap="round"
				/>
				<line
					x1={x - CLICK_MARKER.CROSS_SIZE}
					y1={y + CLICK_MARKER.CROSS_SIZE}
					x2={x + CLICK_MARKER.CROSS_SIZE}
					y2={y - CLICK_MARKER.CROSS_SIZE}
					stroke={CLICK_MARKER.COLOR}
					strokeWidth={CLICK_MARKER.STROKE_WIDTH}
					strokeLinecap="round"
				/>
			</g>
		);
	}

	// Couleurs par type d'action
	const actionColor = color || getActionColor(actionType);

	return (
		<g key={id}>
			{/* Cercle de fond */}
			<circle
				cx={x}
				cy={y}
				r={12}
				fill={actionColor}
				fillOpacity={0.8}
				stroke="white"
				strokeWidth={2}
			/>

			{/* Label de l'action */}
			<text
				x={x}
				y={y + 1}
				textAnchor="middle"
				dominantBaseline="middle"
				fontSize="8"
				fontWeight="bold"
				fill="white"
			>
				{getActionLabel(actionType)}
			</text>

			{/* Nom du joueur */}
			{playerName && (
				<text
					x={x}
					y={y + 22}
					textAnchor="middle"
					dominantBaseline="middle"
					fontSize="8"
					fontWeight="normal"
					fill={actionColor}
					fillOpacity={0.9}
				>
					{playerName}
				</text>
			)}
		</g>
	);
}

function getActionColor(actionType: string): string {
	switch (actionType) {
		case '3PTS': return '#22c55e';    // Vert
		case '2PTS': return '#3b82f6';    // Bleu
		case 'FREE_THROW': return '#f59e0b'; // Jaune
		case 'REBOUND': return '#8b5cf6';    // Violet
		case 'ASSIST': return '#10b981';     // Emeraude
		case 'STEAL': return '#f97316';      // Orange
		case 'FOUL': return '#ef4444';       // Rouge
		default: return CLICK_MARKER.COLOR;
	}
}

function getActionLabel(actionType: string): string {
	switch (actionType) {
		case '3PTS': return '3';
		case '2PTS': return '2';
		case 'FREE_THROW': return 'LF';
		case 'REBOUND': return 'R';
		case 'ASSIST': return 'A';
		case 'STEAL': return 'S';
		case 'FOUL': return 'F';
		default: return '?';
	}
}