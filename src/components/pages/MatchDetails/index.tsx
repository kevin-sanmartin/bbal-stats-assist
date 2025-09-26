"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TGameWithRelations } from "@/types/game";
import { TAction } from "@/types/action";
import { TPlayer } from "@/types/player";
import { TTeam } from "@/types/team";
import { EActionType } from "@/enums/action";
import BasketballCourt from "@/components/elements/BasketballCourt";
import Card from "@/components/elements/Card";
import Button from "@/components/elements/Button";
import Badge from "@/components/elements/Badge";
import Avatar from "@/components/elements/Avatar";
import StatCounter from "@/components/elements/StatCounter";
import Table, { TableColumn } from "@/components/materials/Table";
import { CourtSize } from "@/components/elements/BasketballCourt/enums";
import classes from "./classes.module.scss";

interface MatchDetailsProps {
	game: TGameWithRelations;
	team: TTeam;
	actions: TAction[];
	players: TPlayer[];
}

export default function MatchDetails({ game, team, actions, players }: MatchDetailsProps) {
	const router = useRouter();
	const [selectedActionType, setSelectedActionType] = useState<EActionType | "ALL">("ALL");

	// Convertir les actions pour le terrain
	const courtActions = useMemo(() => {
		const filteredActions = selectedActionType === "ALL" ? actions : actions.filter((action) => action.type === selectedActionType);

		return filteredActions.map((action) => {
			const player = players.find((p) => p.id === action.player_id);
			return {
				id: action.id,
				position: { x: action.position_x, y: action.position_y },
				actionType: action.type as EActionType,
				playerName: player?.name || "Joueur inconnu",
			};
		});
	}, [actions, selectedActionType]);

	const getResultBadge = () => {
		if (game.score > game.opponent_score) {
			return (
				<Badge variant="success" size="lg">
					🏆 Victoire
				</Badge>
			);
		} else if (game.score < game.opponent_score) {
			return (
				<Badge variant="danger" size="lg">
					😞 Défaite
				</Badge>
			);
		} else {
			return (
				<Badge variant="warning" size="lg">
					🤝 Match nul
				</Badge>
			);
		}
	};

	const getLocationBadge = () => {
		return game.location === "HOME" ? <Badge variant="info">🏠 Domicile</Badge> : <Badge variant="default">✈️ Extérieur</Badge>;
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("fr-FR", {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	// Calcul des statistiques
	const stats = useMemo(() => {
		const totalActions = actions.length;
		const points3 = actions.filter((a) => a.type === EActionType.THREE_PTS).length;
		const points2 = actions.filter((a) => a.type === EActionType.TWO_PTS).length;
		const freeThrows = actions.filter((a) => a.type === EActionType.FREE_THROW).length;
		const rebounds = actions.filter((a) => a.type === EActionType.REBOUND).length;
		const assists = actions.filter((a) => a.type === EActionType.ASSIST).length;
		const steals = actions.filter((a) => a.type === EActionType.STEAL).length;
		const fouls = actions.filter((a) => a.type === EActionType.FOUL).length;

		return {
			totalActions,
			points3,
			points2,
			freeThrows,
			rebounds,
			assists,
			steals,
			fouls,
		};
	}, [actions]);

	// Statistiques par joueur
	const playerStats = useMemo(() => {
		return players
			.map((player) => {
				const playerActions = actions.filter((a) => a.player_id === player.id);
				const threePointers = playerActions.filter((a) => a.type === EActionType.THREE_PTS).length;
				const twoPointers = playerActions.filter((a) => a.type === EActionType.TWO_PTS).length;
				const freeThrows = playerActions.filter((a) => a.type === EActionType.FREE_THROW).length;
				const points = threePointers * 3 + twoPointers * 2 + freeThrows;

				return {
					...player,
					points,
					threePointers,
					twoPointers,
					freeThrows,
					rebounds: playerActions.filter((a) => a.type === EActionType.REBOUND).length,
					assists: playerActions.filter((a) => a.type === EActionType.ASSIST).length,
					steals: playerActions.filter((a) => a.type === EActionType.STEAL).length,
					fouls: playerActions.filter((a) => a.type === EActionType.FOUL).length,
					totalActions: playerActions.length,
				};
			})
			.sort((a, b) => b.points - a.points);
	}, [players, actions]);

	const actionTypes = [
		{ type: "ALL" as const, label: "Toutes", count: stats.totalActions },
		{ type: EActionType.THREE_PTS, label: "3 Points", count: stats.points3 },
		{ type: EActionType.TWO_PTS, label: "2 Points", count: stats.points2 },
		{ type: EActionType.FREE_THROW, label: "Lancers", count: stats.freeThrows },
		{ type: EActionType.REBOUND, label: "Rebonds", count: stats.rebounds },
		{ type: EActionType.ASSIST, label: "Passes", count: stats.assists },
		{ type: EActionType.STEAL, label: "Interceptions", count: stats.steals },
		{ type: EActionType.FOUL, label: "Fautes", count: stats.fouls },
	];

	// Configuration des colonnes pour le tableau des statistiques
	const playerStatsColumns: TableColumn<any>[] = [
		{
			key: "number",
			title: "#",
			width: "50px",
			align: "center",
			render: (value) => <span className={classes.playerNumber}>{value}</span>,
		},
		{
			key: "name",
			title: "Joueur",
			width: "150px",
			render: (value) => <div className={classes.playerName}>{value}</div>,
		},
		{
			key: "points",
			title: "Points",
			width: "60px",
			align: "center",
			sortable: true,
			render: (value) => <strong>{value}</strong>,
		},
		{
			key: "threePointers",
			title: "3pts",
			width: "50px",
			align: "center",
			render: (value) => value || "-",
		},
		{
			key: "twoPointers",
			title: "2pts",
			width: "50px",
			align: "center",
			render: (value) => value || "-",
		},
		{
			key: "freeThrows",
			title: "LF",
			width: "50px",
			align: "center",
			render: (value) => value || "-",
		},
		{
			key: "rebounds",
			title: "Reb",
			width: "50px",
			align: "center",
			render: (value) => value || "-",
		},
		{
			key: "assists",
			title: "Ast",
			width: "50px",
			align: "center",
			render: (value) => value || "-",
		},
		{
			key: "steals",
			title: "Int",
			width: "50px",
			align: "center",
			render: (value) => value || "-",
		},
		{
			key: "fouls",
			title: "Fts",
			width: "50px",
			align: "center",
			render: (value) => value || "-",
		},
	];

	return (
		<div className={classes.root}>
			{/* Header */}
			<div className={classes.header}>
				<Button variant="outline" onClick={() => router.push(`/teams/${team.id}/history`)}>
					← Historique
				</Button>
				<div className={classes.headerContent}>
					<h1>Match du {formatDate(game.date)}</h1>
					<div className={classes.matchInfo}>
						<span className={classes.teamName}>{team.name}</span>
						<span className={classes.vs}>vs</span>
						<span className={classes.opponent}>{game.opponent}</span>
					</div>
				</div>
				<div className={classes.headerActions}>
					{getLocationBadge()}
					{getResultBadge()}
				</div>
			</div>

			{/* Game Summary */}
			<Card className={classes.gameSummary}>
				<div className={classes.matchup}>
					<div className={classes.team}>
						<div className={classes.teamName}>{team.name}</div>
						<div className={classes.teamScore}>{game.score}</div>
						<Badge variant="default" size="sm">
							{team.category}
						</Badge>
					</div>
					<div className={classes.vs}>vs</div>
					<div className={classes.team}>
						<div className={classes.teamName}>{game.opponent}</div>
						<div className={classes.teamScore}>{game.opponent_score}</div>
					</div>
				</div>

				{game.competition?.name && (
					<div className={classes.gameInfo}>
						<Badge variant="primary">{game.competition.name}</Badge>
					</div>
				)}
			</Card>

			{/* Action Filters */}
			<Card className={classes.filtersCard}>
				<h3>Filtrer par type d'action</h3>
				<div className={classes.actionFilters}>
					{actionTypes.map(({ type, label, count }) => (
						<Button
							key={type}
							variant={selectedActionType === type ? "primary" : "outline"}
							size="sm"
							onClick={() => setSelectedActionType(type)}
							className={classes.filterButton}>
							{label} ({count})
						</Button>
					))}
				</div>
			</Card>

			{/* Main Content */}
			<div className={classes.mainContent}>
				{/* Court Visualization */}
				<div className={classes.courtSection}>
					<Card className={classes.courtCard}>
						<h3>Visualisation du terrain</h3>
						<div className={classes.courtContainer}>
							<BasketballCourt
								size={CourtSize.FULLWIDTH}
								actions={courtActions}
								onCourtClick={() => {}} // Mode lecture seule
							/>
						</div>
						<p className={classes.courtInfo}>
							{courtActions.length} action{courtActions.length > 1 ? "s" : ""} affichée{courtActions.length > 1 ? "s" : ""}
							{selectedActionType !== "ALL" && ` (${actionTypes.find((a) => a.type === selectedActionType)?.label})`}
						</p>
					</Card>
				</div>

				{/* Statistics */}
				<div className={classes.statsSection}>
					<Card className={classes.statsCard}>
						<h3>Statistiques du match</h3>
						<div className={classes.statsGrid}>
							<StatCounter label="Actions totales" value={stats.totalActions} showButtons={false} />
							<StatCounter label="3 Points" value={stats.points3} variant="success" showButtons={false} />
							<StatCounter label="2 Points" value={stats.points2} variant="default" showButtons={false} />
							<StatCounter label="Lancers francs" value={stats.freeThrows} variant="warning" showButtons={false} />
							<StatCounter label="Rebonds" value={stats.rebounds} variant="warning" showButtons={false} />
							<StatCounter label="Passes D." value={stats.assists} variant="success" showButtons={false} />
						</div>
					</Card>

					{/* Actions List */}
					{courtActions.length > 0 && (
						<Card className={classes.actionsListCard}>
							<h3>Actions détaillées</h3>
							<div className={classes.actionsList}>
								{courtActions.slice(0, 10).map((action, index) => (
									<div key={action.id} className={classes.actionItem}>
										<div className={classes.actionIndex}>#{courtActions.length - index}</div>
										<Avatar name={action.playerName} size="xs" />
										<div className={classes.actionDetails}>
											<div className={classes.actionPlayer}>{action.playerName}</div>
											<div className={classes.actionType}>{action.actionType}</div>
										</div>
										<div className={classes.actionPosition}>
											({action.position.x.toFixed(1)}m, {action.position.y.toFixed(1)}m)
										</div>
									</div>
								))}
								{courtActions.length > 10 && (
									<div className={classes.moreActions}>
										... et {courtActions.length - 10} autre{courtActions.length - 10 > 1 ? "s" : ""} action{courtActions.length - 10 > 1 ? "s" : ""}
									</div>
								)}
							</div>
						</Card>
					)}
				</div>
			</div>

			{/* Player Statistics */}
			<Card className={classes.playersStatsCard}>
				<h3>Statistiques par joueur</h3>
				<Table
					columns={playerStatsColumns}
					data={playerStats}
					hoverable
					striped
					empty={
						<div className={classes.emptyTable}>
							<div className={classes.emptyIcon}>👥</div>
							<p>Aucune statistique disponible</p>
						</div>
					}
				/>
			</Card>
		</div>
	);
}
