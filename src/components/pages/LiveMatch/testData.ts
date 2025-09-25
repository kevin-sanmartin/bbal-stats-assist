import { EActionType } from "@/enums/action";

// Simulation d'un match complet de 40 minutes
// Estimation réaliste : ~80-120 actions réussies par match
// (tirs réussis, passes décisives, rebonds, fautes, LF réussis)

export interface TestAction {
	id: string;
	type: EActionType;
	position: { x: number; y: number };
	playerId: string;
	playerName: string;
}

// Pool de joueurs réalistes
const players = [
	'M. Johnson', 'L. Williams', 'S. Curry', 'K. Thompson', 'A. Davis',
	'J. Brown', 'D. Mitchell', 'T. Young', 'J. Morant', 'L. Doncic',
	'K. Durant', 'G. Antetokounmpo', 'N. Jokic', 'J. Embiid', 'J. Tatum'
];

// Génération aléatoire d'actions réalistes
function generateRandomAction(index: number): TestAction {
	const actionTypes = [
		EActionType.TWO_PTS,
		EActionType.TWO_PTS, // Plus fréquent
		EActionType.TWO_PTS,
		EActionType.THREE_PTS,
		EActionType.FREE_THROW,
		EActionType.REBOUND,
		EActionType.REBOUND, // Plus fréquent
		EActionType.ASSIST,
		EActionType.FOUL,
		EActionType.STEAL
	];

	const randomType = actionTypes[Math.floor(Math.random() * actionTypes.length)];
	let position: { x: number; y: number };

	// Positions réalistes selon le type d'action
	switch (randomType) {
		case EActionType.THREE_PTS:
			// Arc à 3 points
			position = {
				x: Math.random() > 0.5 ?
					Math.random() * 4 + 24 : // Côté droit
					Math.random() * 4 + 0,   // Côté gauche
				y: Math.random() * 15
			};
			break;
		case EActionType.TWO_PTS:
			// Zone à 2 points (plus près des paniers)
			position = {
				x: Math.random() > 0.5 ?
					Math.random() * 10 + 18 : // Zone droite
					Math.random() * 10 + 0,   // Zone gauche
				y: Math.random() * 15
			};
			break;
		case EActionType.FREE_THROW:
			// Ligne des lancers francs
			position = {
				x: Math.random() > 0.5 ? 22.5 : 5.5, // LF gauche ou droite
				y: 7.5 + (Math.random() - 0.5) * 2 // Petit variation
			};
			break;
		case EActionType.REBOUND:
			// Près des paniers
			position = {
				x: Math.random() > 0.5 ?
					Math.random() * 8 + 20 : // Zone droite
					Math.random() * 8 + 0,   // Zone gauche
				y: 4 + Math.random() * 7 // Zone centrale
			};
			break;
		default:
			// Actions partout sur le terrain
			position = {
				x: Math.random() * 28,
				y: Math.random() * 15
			};
	}

	return {
		id: `action-${index}`,
		type: randomType,
		position,
		playerId: `player-${index % players.length}`,
		playerName: players[index % players.length]
	};
}

// Match complet simulé (100 actions)
export const fullMatchTestData: TestAction[] = Array.from(
	{ length: 100 },
	(_, index) => generateRandomAction(index)
);

// Test de densité extrême (50 actions dans une zone restreinte)
export const densityTestData: TestAction[] = Array.from(
	{ length: 50 },
	(_, index) => ({
		id: `dense-${index}`,
		type: [EActionType.TWO_PTS, EActionType.THREE_PTS, EActionType.REBOUND, EActionType.ASSIST][index % 4],
		position: {
			x: 20 + Math.random() * 6, // Zone 20-26m
			y: 6 + Math.random() * 3   // Zone 6-9m
		},
		playerId: `player-${index % 5}`,
		playerName: players[index % 5]
	})
);

// Test réaliste modéré (30 actions bien réparties)
export const moderateTestData: TestAction[] = [
	// 3 points réussis
	{ id: '1', type: EActionType.THREE_PTS, position: { x: 24, y: 3 }, playerId: '1', playerName: 'S. Curry' },
	{ id: '2', type: EActionType.THREE_PTS, position: { x: 25, y: 12 }, playerId: '2', playerName: 'D. Mitchell' },
	{ id: '3', type: EActionType.THREE_PTS, position: { x: 2, y: 8 }, playerId: '3', playerName: 'K. Thompson' },

	// 2 points réussis
	{ id: '4', type: EActionType.TWO_PTS, position: { x: 22, y: 7 }, playerId: '4', playerName: 'L. Doncic' },
	{ id: '5', type: EActionType.TWO_PTS, position: { x: 6, y: 10 }, playerId: '5', playerName: 'J. Tatum' },
	{ id: '6', type: EActionType.TWO_PTS, position: { x: 19, y: 5 }, playerId: '1', playerName: 'S. Curry' },

	// Lancers francs
	{ id: '7', type: EActionType.FREE_THROW, position: { x: 22.5, y: 7.5 }, playerId: '6', playerName: 'A. Davis' },
	{ id: '8', type: EActionType.FREE_THROW, position: { x: 5.5, y: 7.5 }, playerId: '7', playerName: 'J. Embiid' },

	// Rebonds
	{ id: '9', type: EActionType.REBOUND, position: { x: 21, y: 6 }, playerId: '6', playerName: 'A. Davis' },
	{ id: '10', type: EActionType.REBOUND, position: { x: 7, y: 9 }, playerId: '7', playerName: 'J. Embiid' },

	// Passes décisives
	{ id: '11', type: EActionType.ASSIST, position: { x: 15, y: 12 }, playerId: '8', playerName: 'J. Morant' },
	{ id: '12', type: EActionType.ASSIST, position: { x: 12, y: 4 }, playerId: '4', playerName: 'L. Doncic' },
];