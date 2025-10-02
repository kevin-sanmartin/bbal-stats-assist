"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TTeam } from "@/types/team";
import { TGame, TGameWithRelations } from "@/types/game";
import Card from "@/components/elements/Card";
import Button from "@/components/elements/Button";
import Badge from "@/components/elements/Badge";
import Input from "@/components/elements/Input";
import Select from "@/components/elements/Select";
import StatCounter from "@/components/elements/StatCounter";
import Table, { TableColumn } from "@/components/materials/Table";
import classes from "./classes.module.scss";

interface TeamHistoryProps {
	team: TTeam;
	games: TGameWithRelations[];
}

export default function TeamHistory({ team, games }: TeamHistoryProps) {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCompetition, setSelectedCompetition] = useState("ALL");

	const filteredGames = useMemo(() => {
		let filtered = games;

		// Filtrer par compétition
		if (selectedCompetition !== "ALL") {
			filtered = filtered.filter((game) => (selectedCompetition === "NONE" ? !game.competition?.name : game.competition?.name === selectedCompetition));
		}

		// Filtrer par recherche
		if (searchTerm.trim()) {
			const term = searchTerm.toLowerCase().trim();
			filtered = filtered.filter((game) => game.opponent.toLowerCase().includes(term) || game.competition?.name?.toLowerCase().includes(term));
		}

		return filtered;
	}, [games, searchTerm, selectedCompetition]);

	// Options des compétitions disponibles
	const competitionOptions = useMemo(() => {
		const competitions = Array.from(new Set(games.map((game) => game.competition?.name).filter((name): name is string => Boolean(name))));
		const hasNoCompetition = games.some((game) => !game.competition?.name);

		const options = [{ value: "ALL", label: "Toutes les compétitions" }];

		competitions.forEach((comp) => {
			options.push({ value: comp, label: comp });
		});

		if (hasNoCompetition) {
			options.push({ value: "NONE", label: "Sans compétition" });
		}

		return options;
	}, [games]);

	// Calcul des statistiques de l'équipe
	const teamStats = useMemo(() => {
		const totalGames = games.length;
		const wins = games.filter((game) => game.score > game.opponent_score).length;
		const losses = games.filter((game) => game.score < game.opponent_score).length;
		const draws = games.filter((game) => game.score === game.opponent_score).length;
		const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
		const totalPointsFor = games.reduce((sum, game) => sum + game.score, 0);
		const totalPointsAgainst = games.reduce((sum, game) => sum + game.opponent_score, 0);
		const avgPointsFor = totalGames > 0 ? Math.round(totalPointsFor / totalGames) : 0;
		const avgPointsAgainst = totalGames > 0 ? Math.round(totalPointsAgainst / totalGames) : 0;

		return {
			totalGames,
			wins,
			losses,
			draws,
			winRate,
			avgPointsFor,
			avgPointsAgainst,
		};
	}, [games]);

	const getResultBadge = (game: TGame) => {
		if (game.score > game.opponent_score) {
			return <Badge variant="success">Victoire</Badge>;
		} else if (game.score < game.opponent_score) {
			return <Badge variant="danger">Défaite</Badge>;
		} else {
			return <Badge variant="warning">Match nul</Badge>;
		}
	};

	const getLocationBadge = (location: string) => {
		return location === "HOME" ? <Badge variant="info">🏠 Domicile</Badge> : <Badge variant="default">✈️ Extérieur</Badge>;
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("fr-FR", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	const formatTime = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
		});
	};

	const getCategoryColor = (category: string) => {
		switch (category) {
			case "U13":
				return "success";
			case "U15":
				return "info";
			case "U18":
				return "warning";
			case "SENIOR":
				return "primary";
			default:
				return "default";
		}
	};

	// Configuration des colonnes de la table
	const columns: TableColumn<TGame>[] = [
		{
			key: "date",
			title: "Date",
			width: "120px",
			align: "center",
			sortable: true,
			render: (value) => (
				<div className={classes.dateCell}>
					<div className={classes.dateMain}>{formatTime(value)}</div>
					<div className={classes.dateSecondary}>{formatDate(value).split(" ").slice(0, 2).join(" ")}</div>
				</div>
			),
		},
		{
			key: "opponent",
			title: "Adversaire",
			width: "180px",
			render: (value) => <div className={classes.opponentName}>{value}</div>,
		},
		{
			key: "score",
			title: "Score",
			width: "100px",
			align: "center",
			render: (value, row: TGame) => (
				<div className={classes.scoreCell}>
					<span className={classes.ourScore}>{value}</span>
					<span className={classes.scoreSeparator}>-</span>
					<span className={classes.theirScore}>{row.opponent_score}</span>
				</div>
			),
		},
		{
			key: "result",
			title: "Résultat",
			width: "100px",
			align: "center",
			render: (value, row: TGame) => getResultBadge(row),
		},
		{
			key: "location",
			title: "Lieu",
			width: "100px",
			align: "center",
			render: (value) => getLocationBadge(value),
		},
		{
			key: "competitions",
			title: "Compétition",
			width: "120px",
			render: (value) => (value?.name ? <Badge variant="primary">{value.name}</Badge> : <span className={classes.noCompetition}>-</span>),
		},
		{
			key: "actions",
			title: "",
			width: "80px",
			align: "center",
			render: (value, row: TGame) => (
				<Button variant="outlined" onClick={() => router.push(`/matches/${row.id}`)}>
					Détails
				</Button>
			),
		},
	];

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Button variant="outlined" onClick={() => router.push("/")}>
					← Accueil
				</Button>
				<div className={classes.headerContent}>
					<h1>{team.name}</h1>
					<Badge variant={getCategoryColor(team.category)}>{team.category}</Badge>
				</div>
				<div className={classes.headerActions}>
					<Button onClick={() => router.push(`/matches?team=${team.id}`)}>+ Nouveau match</Button>
				</div>
			</div>

			{/* Team Statistics */}
			<div className={classes.statsSection}>
				<h2>Statistiques de l'équipe</h2>
				<div className={classes.statsGrid}>
					<Card className={classes.statCard}>
						<StatCounter label="Matchs joués" value={teamStats.totalGames} size="lg" showButtons={false} />
					</Card>
					<Card className={classes.statCard}>
						<StatCounter label="Victoires" value={teamStats.wins} size="lg" variant="success" showButtons={false} />
					</Card>
					<Card className={classes.statCard}>
						<StatCounter
							label="Taux de victoire"
							value={teamStats.winRate}
							suffix="%"
							size="lg"
							variant={teamStats.winRate >= 70 ? "success" : teamStats.winRate >= 50 ? "warning" : "danger"}
							showButtons={false}
						/>
					</Card>
					<Card className={classes.statCard}>
						<StatCounter label="Points/match" value={teamStats.avgPointsFor} size="lg" variant="default" showButtons={false} />
					</Card>
				</div>
			</div>

			{/* Filters */}
			{games.length > 0 && (
				<div className={classes.filtersSection}>
					<div className={classes.filtersRow}>
						<Input
							type="text"
							placeholder="Rechercher par adversaire ou compétition..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className={classes.searchInput}
						/>
						<Select
							value={selectedCompetition}
							onChange={(e) => setSelectedCompetition(e.target.value)}
							options={competitionOptions}
							className={classes.competitionSelect}
						/>
					</div>

					{/* Active Filters */}
					{(searchTerm || selectedCompetition !== "ALL") && (
						<div className={classes.activeFilters}>
							<span className={classes.filterLabel}>Filtres actifs :</span>
							{searchTerm && (
								<Button variant="outlined" className={classes.filterChip} onClick={() => setSearchTerm("")}>
									Recherche : "{searchTerm}" ✕
								</Button>
							)}
							{selectedCompetition !== "ALL" && (
								<Button variant="outlined" className={classes.filterChip} onClick={() => setSelectedCompetition("ALL")}>
									{competitionOptions.find((opt) => opt.value === selectedCompetition)?.label} ✕
								</Button>
							)}
						</div>
					)}
				</div>
			)}

			{/* Games List */}
			{filteredGames.length === 0 ? (
				<div className={classes.emptyState}>
					{searchTerm || selectedCompetition !== "ALL" ? (
						<>
							<div className={classes.emptyIcon}>🔍</div>
							<h2>Aucun match trouvé</h2>
							<p>
								Aucun match ne correspond aux critères sélectionnés
								{searchTerm && ` pour "${searchTerm}"`}
								{selectedCompetition !== "ALL" && ` dans cette compétition`}
							</p>
							<div className={classes.clearFilters}>
								<Button variant="ghost" onClick={() => setSearchTerm("")}>
									Effacer la recherche
								</Button>
								<Button variant="outlined" onClick={() => setSelectedCompetition("ALL")}>
									Toutes les compétitions
								</Button>
							</div>
						</>
					) : (
						<>
							<div className={classes.emptyIcon}>🏀</div>
							<h2>{team.name} n'a pas encore joué de match</h2>
							<p>Commencez par créer votre premier match pour voir l'historique ici</p>
							<Button onClick={() => router.push(`/matches?team=${team.id}`)}>Créer un match</Button>
						</>
					)}
				</div>
			) : (
				<div className={classes.gamesSection}>
					<h2>Historique des matchs ({filteredGames.length})</h2>
					<Card className={classes.tableCard}>
						<Table
							columns={columns}
							data={filteredGames}
							hoverable
							striped
							empty={
								<div className={classes.emptyTable}>
									<div className={classes.emptyIcon}>🏀</div>
									<p>Aucun match dans l'historique</p>
								</div>
							}
						/>
					</Card>
				</div>
			)}
		</div>
	);
}
