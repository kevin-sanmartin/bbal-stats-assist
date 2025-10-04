import classes from "./classes.module.scss";
import classNames from "classnames";
import Avatar from "@/components/elements/Avatar";
import Badge from "@/components/elements/Badge";
import { EPlayerPosition } from "@/enums/player";

interface PlayerStats {
	points?: number;
	rebounds?: number;
	assists?: number;
	steals?: number;
	fouls?: number;
}

interface PlayerCardProps {
	name: string;
	number: number;
	position: EPlayerPosition;
	stats?: PlayerStats;
	active?: boolean;
	avatarUrl?: string;
	className?: string;
	onClick?: () => void;
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

export default function PlayerCard({ name, number, position, stats, active = false, avatarUrl, className, onClick }: PlayerCardProps) {
	const cardClasses = classNames(classes.playerCard, { [classes.active]: active, [classes.clickable]: onClick }, className);

	return (
		<div className={cardClasses} onClick={onClick}>
			<div className={classes.header}>
				<Avatar name={name} src={avatarUrl} size="md" />
				<div className={classes.playerInfo}>
					<div className={classes.nameRow}>
						<h3 className={classes.name}>{name}</h3>
						<span className={classes.number}>#{number}</span>
					</div>
					<Badge variant={positionColors[position]}>{positionLabels[position]}</Badge>
				</div>
			</div>

			{stats && (
				<div className={classes.stats}>
					{stats.points !== undefined && (
						<div className={classes.statItem}>
							<span className={classes.statLabel}>PTS</span>
							<span className={classes.statValue}>{stats.points}</span>
						</div>
					)}
					{stats.rebounds !== undefined && (
						<div className={classes.statItem}>
							<span className={classes.statLabel}>REB</span>
							<span className={classes.statValue}>{stats.rebounds}</span>
						</div>
					)}
					{stats.assists !== undefined && (
						<div className={classes.statItem}>
							<span className={classes.statLabel}>AST</span>
							<span className={classes.statValue}>{stats.assists}</span>
						</div>
					)}
					{stats.steals !== undefined && (
						<div className={classes.statItem}>
							<span className={classes.statLabel}>STL</span>
							<span className={classes.statValue}>{stats.steals}</span>
						</div>
					)}
					{stats.fouls !== undefined && (
						<div className={classes.statItem}>
							<span className={classes.statLabel}>FOULS</span>
							<span className={classes.statValue}>{stats.fouls}</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
