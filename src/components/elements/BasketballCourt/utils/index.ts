import { CourtPosition, CourtClick } from '../types';
import { CourtOrientation } from '../enums';
import { SVG_DIMENSIONS, COURT_REFERENCE } from '../constants';

/**
 * Convertit les coordonnées FIBA (référence horizontale) vers coordonnées SVG
 * @param position Position en mètres FIBA (référence horizontale)
 * @param targetOrientation Orientation cible pour l'affichage
 * @returns Coordonnées SVG pour l'affichage
 */
export const fibaToSvg = (position: CourtPosition, targetOrientation: CourtOrientation) => {
	if (targetOrientation === CourtOrientation.HORIZONTAL) {
		// Affichage horizontal : conversion directe
		return {
			x: (position.x / COURT_REFERENCE.WIDTH) * SVG_DIMENSIONS.HORIZONTAL.width,
			y: (position.y / COURT_REFERENCE.HEIGHT) * SVG_DIMENSIONS.HORIZONTAL.height
		};
	} else {
		// Affichage vertical : rotation 90° depuis référence horizontale
		return {
			x: ((COURT_REFERENCE.HEIGHT - position.y) / COURT_REFERENCE.HEIGHT) * SVG_DIMENSIONS.VERTICAL.width,
			y: (position.x / COURT_REFERENCE.WIDTH) * SVG_DIMENSIONS.VERTICAL.height
		};
	}
};


/**
 * Génère un ID unique pour un nouveau clic
 * @returns ID unique basé sur timestamp et random
 */
export const generateClickId = (): string => {
	return `click-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Convertit un clic SVG en coordonnées FIBA (référence horizontale)
 * @param svgX Position X dans le SVG
 * @param svgY Position Y dans le SVG
 * @param orientation Orientation actuelle du terrain
 * @returns Position en coordonnées FIBA
 */
export const svgToFiba = (svgX: number, svgY: number, orientation: CourtOrientation): CourtPosition => {
	if (orientation === CourtOrientation.HORIZONTAL) {
		// Terrain horizontal : conversion directe vers référence FIBA
		return {
			x: (svgX / SVG_DIMENSIONS.HORIZONTAL.width) * COURT_REFERENCE.WIDTH,
			y: (svgY / SVG_DIMENSIONS.HORIZONTAL.height) * COURT_REFERENCE.HEIGHT
		};
	} else {
		// Terrain vertical : conversion vers référence horizontale
		// Rotation inverse pour stocker en référence horizontale
		return {
			x: (svgY / SVG_DIMENSIONS.VERTICAL.height) * COURT_REFERENCE.WIDTH, // Y vertical -> X horizontal
			y: (1 - svgX / SVG_DIMENSIONS.VERTICAL.width) * COURT_REFERENCE.HEIGHT // X vertical inversé -> Y horizontal
		};
	}
};