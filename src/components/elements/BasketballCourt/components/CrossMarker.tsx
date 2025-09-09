import { CLICK_MARKER } from '../constants';

interface CrossMarkerProps {
	x: number;
	y: number;
	id: string;
}

export default function CrossMarker({ x, y, id }: CrossMarkerProps) {
	return (
		<g key={id}>
			{/* Croix */}
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