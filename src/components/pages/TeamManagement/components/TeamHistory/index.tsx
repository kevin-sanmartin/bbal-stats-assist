"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TTeam } from "@/types/team";
import { TGame, TGameWithRelations } from "@/types/game";
import Button from "@/components/elements/Button";
import Badge from "@/components/elements/Badge";
import Input from "@/components/elements/Input";
import Select from "@/components/elements/Select";
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

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
		});
	};

	const getResultLetter = (game: TGame) => {
		if (game.score > game.opponent_score) return "V";
		if (game.score < game.opponent_score) return "D";
		return "N";
	};

	const getResultVariant = (game: TGame) => {
		if (game.score > game.opponent_score) return "success";
		if (game.score < game.opponent_score) return "danger";
		return "warning";
	};

	return (
		<div className={classes.root}>
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

			{/* Timeline */}
			{filteredGames.length === 0 ? (
				<div className={classes.emptyState}>
					<div className={classes.emptyIcon}>🔍</div>
					<h2>Aucun match trouvé</h2>
					<p>Aucun match ne correspond aux critères sélectionnés</p>
				</div>
			) : (
				<div className={classes.timeline}>
					{filteredGames.map((game, index) => (
						<div key={game.id} className={classes.timelineItem}>
							<div className={classes.timelineDotContainer}>
								<div className={classes.timelineDot}></div>
								<div className={classes.timelineDate}>{formatDate(game.date)}</div>
							</div>
							<div className={classes.timelineContent}>
								<div className={classes.timelineResult}>
									<Badge variant={getResultVariant(game)}>{getResultLetter(game)}</Badge>
									<span className={classes.timelineScore}>
										{game.score}-{game.opponent_score}
									</span>
								</div>
								<div className={classes.timelineOpponent}>vs {game.opponent}</div>
								<div className={classes.timelineMeta}>
									<Badge variant={game.location === "HOME" ? "info" : "default"}>{game.location === "HOME" ? "🏠 Domicile" : "✈️ Extérieur"}</Badge>
									{game.competition && <Badge variant="primary">{game.competition.name}</Badge>}
								</div>
								<Button variant="outlined" className={classes.timelineButton} onClick={() => router.push(`/matches/${game.id}`)}>
									Voir détails →
								</Button>
							</div>
							{index < filteredGames.length - 1 && <div className={classes.timelineLine}></div>}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
