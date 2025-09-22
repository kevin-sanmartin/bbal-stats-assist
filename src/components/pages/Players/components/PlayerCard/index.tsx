import Button from "@/components/elements/Button";
import { TPlayer } from "@/types/player";
import { EPlayerPosition } from "@/enums/player";
import classes from "./classes.module.scss";
import Badge from "@/components/elements/Badge";
import Card from "@/components/elements/Card";

interface PlayerCardProps {
	player: TPlayer;
	onEdit: () => void;
	onDelete: () => void;
}

const positionLabels: Record<EPlayerPosition, string> = {
	[EPlayerPosition.PG]: "Meneur",
	[EPlayerPosition.SG]: "Arrière",
	[EPlayerPosition.SF]: "Ailier",
	[EPlayerPosition.PF]: "Ailier fort",
	[EPlayerPosition.C]: "Pivot",
	[EPlayerPosition.OTHER]: "Autre",
};

export default function PlayerCard({ player, onEdit, onDelete }: PlayerCardProps) {
	return (
		<Card className={classes.playerCard}>
			<div className={classes.playerHeader}>
				<div className={classes.playerNumber}>#{player.number}</div>
				<div className={classes.playerDetails}>
					<h4 className={classes.playerName}>{player.name}</h4>
					<div className={classes.playerPosition}>
						<Badge variant="info">{positionLabels[player.position]}</Badge>
					</div>
				</div>
			</div>

			<div className={classes.playerActions}>
				<Button variant="outline" size="sm" onClick={onEdit}>
					Modifier
				</Button>
				<Button variant="danger" size="sm" onClick={onDelete}>
					Supprimer
				</Button>
			</div>
		</Card>
	);
}