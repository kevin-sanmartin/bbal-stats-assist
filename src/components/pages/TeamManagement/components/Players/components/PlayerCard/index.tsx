import classes from "./classes.module.scss";
import classNames from "classnames";
import Avatar from "@/components/elements/Avatar";
import Badge from "@/components/elements/Badge";
import { EPlayerPosition } from "@/enums/player";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import Card from "@/components/elements/Card";

interface PlayerCardProps {
	name: string;
	number: number;
	position: EPlayerPosition;
	onEdit: () => void;
	onDelete: () => void;
	avatarUrl?: string;
	className?: string;
}

const positionLabels = {
	PG: "Meneur",
	SG: "Arrière",
	SF: "Ailier",
	PF: "Ailier fort",
	C: "Pivot",
	OTHER: "Autre",
};

const positionColors = {
	PG: "info" as const,
	SG: "primary" as const,
	SF: "success" as const,
	PF: "warning" as const,
	C: "danger" as const,
	OTHER: "default" as const,
};

export default function PlayerCard({ name, number, position, avatarUrl, className, onEdit, onDelete }: PlayerCardProps) {
	const cardClasses = classNames(classes.playerCard, className);

	return (
		<Card className={cardClasses} variant="bordered">
			<Avatar name={name} src={avatarUrl} size="md" />
			<div className={classes.playerInfo}>
				<div className={classes.nameRow}>
					<h3 className={classes.name}>{name}</h3>
					<span className={classes.number}>#{number}</span>
				</div>
				<div className={classes.bottomRow}>
					<Badge variant={positionColors[position]}>{positionLabels[position]}</Badge>
					<div className={classes.actions}>
						<FiEdit size={18} className={classes.icon} onClick={onEdit} />
						<FaTrashAlt size={18} className={classNames(classes.trashIcon, classes.icon)} onClick={onDelete} />
					</div>
				</div>
			</div>
		</Card>
	);
}
