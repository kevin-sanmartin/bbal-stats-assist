import { CourtClick } from "./types";
import { CourtOrientation } from "./enums";
import { fibaToSvg } from "./utils";
import CrossMarker from "./components/CrossMarker";

interface HorizontalCourtProps {
	handleCourtClick: (event: React.MouseEvent<SVGSVGElement>) => void;
	classes: { [key: string]: string };
	clicks: CourtClick[];
}

export default function HorizontalCourt({ handleCourtClick, classes, clicks }: HorizontalCourtProps) {
	return (
		<svg viewBox="0 0 940 500" className={classes.courtSvg} preserveAspectRatio="xMidYMid meet" onClick={handleCourtClick}>
			{/* Contour principal du terrain */}
			<rect x="2" y="2" width="936" height="496" fill="none" stroke="currentColor" strokeWidth="3" className={classes.courtBorder} />

			{/* Ligne médiane */}
			<line x1="470" y1="2" x2="470" y2="498" stroke="currentColor" strokeWidth="2" className={classes.centerLine} />

			{/* Cercle central */}
			<circle cx="470" cy="250" r="60" fill="none" stroke="currentColor" strokeWidth="2" className={classes.centerCircle} />

			{/* Panier gauche */}
			<g className={classes.leftBasket}>
				{/* Zone restrictive (raquette) */}
				<rect x="2" y="170" width="190" height="160" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Ligne des lancers francs */}
				<line x1="192" y1="170" x2="192" y2="330" stroke="currentColor" strokeWidth="2" />
				{/* Demi-cercle des lancers francs */}
				<path d="M 192 170 A 80 80 0 0 1 192 330" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Arc à 3 points gauche */}
				<path d="M 2 92 L 2 460 L 90 460 A 100 100 0 0 0 90 40 L 2 40" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Panier */}
				<circle cx="30" cy="250" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Panneau */}
				<line x1="30" y1="230" x2="30" y2="270" stroke="currentColor" strokeWidth="3" />
			</g>

			{/* Panier droit (miroir du gauche) */}
			<g className={classes.rightBasket}>
				{/* Zone restrictive (raquette) */}
				<rect x="748" y="170" width="190" height="160" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Ligne des lancers francs */}
				<line x1="748" y1="170" x2="748" y2="330" stroke="currentColor" strokeWidth="2" />
				{/* Demi-cercle des lancers francs */}
				<path d="M 748 170 A 80 80 0 0 0 748 330" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Arc à 3 points droit */}
				<path d="M 938 92 L 938 460 L 850 460 A 100 100 0 0 1 850 40 L 938 40" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Panier */}
				<circle cx="910" cy="250" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
				{/* Panneau */}
				<line x1="910" y1="230" x2="910" y2="270" stroke="currentColor" strokeWidth="3" />
			</g>

			{/* Marqueurs de clics */}
			{clicks.map((click) => {
				const svgPos = fibaToSvg(click.position, CourtOrientation.HORIZONTAL);
				return <CrossMarker key={click.id} id={click.id} x={svgPos.x} y={svgPos.y} />;
			})}
		</svg>
	);
}
