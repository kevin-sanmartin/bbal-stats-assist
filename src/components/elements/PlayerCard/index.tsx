import { ReactNode } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";
import Avatar from "@/components/elements/Avatar";
import Badge from "@/components/elements/Badge";

export type PlayerPosition = "PG" | "SG" | "SF" | "PF" | "C" | "OTHER";
export type PlayerCardSize = "sm" | "md" | "lg";

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
	position: PlayerPosition;
	stats?: PlayerStats;
	size?: PlayerCardSize;
	active?: boolean;
	avatarUrl?: string;
	className?: string;
	onClick?: () => void;
}

const positionLabels = {
	PG: "Point Guard",
	SG: "Shooting Guard",
	SF: "Small Forward",
	PF: "Power Forward",
	C: "Center",
	OTHER: "Utility",
};

const positionColors = {
	PG: "info" as const,
	SG: "primary" as const,
	SF: "success" as const,
	PF: "warning" as const,
	C: "danger" as const,
	OTHER: "default" as const,
};

export default function PlayerCard({ name, number, position, stats, size = "sm", active = false, avatarUrl, className, onClick }: PlayerCardProps) {
	const cardClasses = classNames(classes.playerCard, classes[`size-${size}`], { [classes.active]: active, [classes.clickable]: onClick }, className);

	return (
		<div className={cardClasses} onClick={onClick}>
			<div className={classes.header}>
				<Avatar name={name} src={avatarUrl} size={size === "sm" ? "sm" : size === "lg" ? "lg" : "md"} />
				<div className={classes.playerInfo}>
					<div className={classes.nameRow}>
						<h3 className={classes.name}>{name}</h3>
						<span className={classes.number}>#{number}</span>
					</div>
					<Badge variant={positionColors[position]} size={size === "lg" ? "md" : "sm"}>
						{position}
					</Badge>
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
