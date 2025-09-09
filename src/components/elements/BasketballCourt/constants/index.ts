import { CourtOrientation } from '../enums';

// === CONSTANTES ===
// Dimensions SVG des terrains
export const SVG_DIMENSIONS = {
	HORIZONTAL: { width: 940, height: 500 },
	VERTICAL: { width: 500, height: 940 }
} as const;

// Marqueurs visuels
export const CLICK_MARKER = {
	CROSS_SIZE: 8,
	COLOR: '#ff4444',
	STROKE_WIDTH: 3
} as const;


// Constantes de référence du terrain (toujours en orientation horizontale)
export const COURT_REFERENCE = {
	WIDTH: 28,   // Longueur terrain (baseline to baseline) en mètres FIBA
	HEIGHT: 15,  // Largeur terrain (sideline to sideline) en mètres FIBA
	ORIENTATION: CourtOrientation.HORIZONTAL // Référence par défaut
} as const;