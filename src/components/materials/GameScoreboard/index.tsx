import { ReactNode } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";
import KPICard from "@/components/materials/KPICard";
import Card from "@/components/elements/Card";

export type GameStatus = "upcoming" | "live" | "finished" | "halftime";
export type ScoreboardSize = "sm" | "md" | "lg";

interface TeamScore {
	name: string;
	logo?: string;
	score: number;
	fouls?: number;
}

interface GameTime {
	period: number;
	timeLeft: string;
	status: GameStatus;
}

interface GameScoreboardProps {
	homeTeam: TeamScore;
	awayTeam: TeamScore;
	gameTime?: GameTime;
	size?: ScoreboardSize;
	showStats?: boolean;
	stats?: {
		totalPoints: number;
		totalRebounds: number;
		totalAssists: number;
		totalFouls: number;
	};
	className?: string;
}

const statusLabels = {
	upcoming: "À venir",
	live: "En cours",
	finished: "Terminé",
	halftime: "Mi-temps"
};

const statusColors = {
	upcoming: "info" as const,
	live: "success" as const,
	finished: "default" as const,
	halftime: "warning" as const
};

export default function GameScoreboard({
	homeTeam,
	awayTeam,
	gameTime,
	size = "md",
	showStats = false,
	stats,
	className
}: GameScoreboardProps) {
	const scoreboardClasses = classNames(
		classes.gameScoreboard,
		classes[`size-${size}`],
		className
	);

	const winningTeam = homeTeam.score > awayTeam.score ? "home" : 
		awayTeam.score > homeTeam.score ? "away" : "tie";

	return (
		<div className={scoreboardClasses}>
			<Card variant="elevated" padding={size === "sm" ? "sm" : size === "lg" ? "lg" : "md"}>
				{gameTime && (
					<div className={classes.gameInfo}>
						<div className={classes.period}>
							{gameTime.status === "live" ? `Q${gameTime.period}` : statusLabels[gameTime.status]}
						</div>
						<div className={classes.timeLeft}>{gameTime.timeLeft}</div>
					</div>
				)}

				<div className={classes.scoreContainer}>
					<div className={classNames(
						classes.team,
						{ [classes.winning]: winningTeam === "away" }
					)}>
						{awayTeam.logo && (
							<div className={classes.teamLogo}>
								<img src={awayTeam.logo} alt={`${awayTeam.name} logo`} />
							</div>
						)}
						<div className={classes.teamInfo}>
							<div className={classes.teamName}>{awayTeam.name}</div>
							{awayTeam.fouls !== undefined && (
								<div className={classes.fouls}>Fautes: {awayTeam.fouls}</div>
							)}
						</div>
						<div className={classes.score}>{awayTeam.score}</div>
					</div>

					<div className={classes.vs}>vs</div>

					<div className={classNames(
						classes.team,
						{ [classes.winning]: winningTeam === "home" }
					)}>
						<div className={classes.score}>{homeTeam.score}</div>
						<div className={classes.teamInfo}>
							<div className={classes.teamName}>{homeTeam.name}</div>
							{homeTeam.fouls !== undefined && (
								<div className={classes.fouls}>Fautes: {homeTeam.fouls}</div>
							)}
						</div>
						{homeTeam.logo && (
							<div className={classes.teamLogo}>
								<img src={homeTeam.logo} alt={`${homeTeam.name} logo`} />
							</div>
						)}
					</div>
				</div>

				{showStats && stats && (
					<div className={classes.statsContainer}>
						<KPICard
							title="Points totaux"
							value={stats.totalPoints}
							icon="🏀"
							size="sm"
						/>
						<KPICard
							title="Rebonds"
							value={stats.totalRebounds}
							icon="⬆️"
							size="sm"
						/>
						<KPICard
							title="Passes"
							value={stats.totalAssists}
							icon="🤝"
							size="sm"
						/>
						<KPICard
							title="Fautes"
							value={stats.totalFouls}
							icon="⚠️"
							size="sm"
							trend={stats.totalFouls > 15 ? "up" : "neutral"}
						/>
					</div>
				)}
			</Card>
		</div>
	);
}