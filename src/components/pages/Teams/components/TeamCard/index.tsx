import Button from "@/components/elements/Button";
import { TTeam } from "@/types/team";
import classes from "./classes.module.scss";
import Badge from "@/components/elements/Badge";
import Card from "@/components/elements/Card";

interface TeamCardProps {
	team: TTeam;
	onEdit: () => void;
	onDelete: () => void;
}

export default function TeamCard({ team, onEdit, onDelete }: TeamCardProps) {
	return (
		<Card className={classes.teamCard} variant="elevated">
			<div className={classes.teamInfo}>
				<div className={classes.teamDetails}>
					<h3 className={classes.teamName}>{team.name}</h3>
					<Badge variant="info">{team.category}</Badge>
				</div>
			</div>

			<div className={classes.teamActions}>
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
