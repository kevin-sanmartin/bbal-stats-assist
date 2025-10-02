"use client";
import { useState } from "react";
import classes from "./classes.module.scss";
import PlayerCard from "@/components/elements/PlayerCard";
import StatCounter from "@/components/elements/StatCounter";
import GameScoreboard from "@/components/materials/GameScoreboard";
import BasketballCourt from "@/components/elements/BasketballCourt";
import Button from "@/components/elements/Button";
import Card from "@/components/elements/Card";
import KPICard from "@/components/materials/KPICard";
import Badge from "@/components/elements/Badge";
import { useToastContext } from "@/contexts/ToastContext";
import { CourtPosition } from "@/components/elements/BasketballCourt/types";
import { CourtSize, CourtTheme } from "@/components/elements/BasketballCourt/enums";

// Demo players data - moved outside component to avoid recreation on each render
const demoPlayers = [
	{
		id: 1,
		name: "Michael Jordan",
		number: 23,
		position: "SG" as const,
		stats: { points: 28, rebounds: 6, assists: 5, steals: 2, fouls: 1 },
	},
	{
		id: 2,
		name: "LeBron James",
		number: 6,
		position: "SF" as const,
		stats: { points: 25, rebounds: 8, assists: 7, steals: 1, fouls: 2 },
	},
	{
		id: 3,
		name: "Stephen Curry",
		number: 30,
		position: "PG" as const,
		stats: { points: 32, rebounds: 4, assists: 8, steals: 3, fouls: 0 },
	},
	{
		id: 4,
		name: "Shaquille O'Neal",
		number: 34,
		position: "C" as const,
		stats: { points: 22, rebounds: 12, assists: 2, steals: 0, fouls: 4 },
	},
	{
		id: 5,
		name: "Tim Duncan",
		number: 21,
		position: "PF" as const,
		stats: { points: 18, rebounds: 10, assists: 3, steals: 1, fouls: 2 },
	},
];

export default function BasketStats() {
	const { toast } = useToastContext();

	const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
	const [playerStats, setPlayerStats] = useState<Record<number, any>>({
		1: { points: 0, rebounds: 0, assists: 0, fouls: 0 },
		2: { points: 0, rebounds: 0, assists: 0, fouls: 0 },
		3: { points: 0, rebounds: 0, assists: 0, fouls: 0 },
		4: { points: 0, rebounds: 0, assists: 0, fouls: 0 },
		5: { points: 0, rebounds: 0, assists: 0, fouls: 0 },
	});

	const updateStat = (playerId: number, stat: string, value: number) => {
		setPlayerStats((prev) => ({
			...prev,
			[playerId]: {
				...prev[playerId],
				[stat]: value,
			},
		}));
		toast.success(`${stat} mis à jour pour le joueur #${demoPlayers.find((p) => p.id === playerId)?.number}`, "Statistique");
	};

	const resetStats = () => {
		setPlayerStats({
			1: { points: 0, rebounds: 0, assists: 0, fouls: 0 },
			2: { points: 0, rebounds: 0, assists: 0, fouls: 0 },
			3: { points: 0, rebounds: 0, assists: 0, fouls: 0 },
			4: { points: 0, rebounds: 0, assists: 0, fouls: 0 },
			5: { points: 0, rebounds: 0, assists: 0, fouls: 0 },
		});
		toast.info("Toutes les statistiques ont été remises à zéro", "Reset");
	};

	const handleCourtClick = (position: CourtPosition) => {
		console.log("🎯 Court clicked at position:", position);
		toast.info(`Clic sur le terrain : x=${position.x.toFixed(2)}, y=${position.y.toFixed(2)}`, "Position");
	};

	const totalPoints = Object.values(playerStats).reduce((sum: number, stats: any) => sum + stats.points, 0);
	const totalRebounds = Object.values(playerStats).reduce((sum: number, stats: any) => sum + stats.rebounds, 0);
	const totalAssists = Object.values(playerStats).reduce((sum: number, stats: any) => sum + stats.assists, 0);
	const totalFouls = Object.values(playerStats).reduce((sum: number, stats: any) => sum + stats.fouls, 0);

	return (
		<main className={classes.root}>
			<div className={classes.container}>
				{/* Header avec le titre */}
				<div className={classes.header}>
					<div className={classes.headerContent}>
						<h1>🏀 BasketStats Assistant</h1>
						<p>Showcase des composants spécialisés pour le suivi des statistiques basketball</p>
					</div>
					<div className={classes.headerActions}>
						<Button variant="outlined" onClick={resetStats}>
							Reset Stats
						</Button>
					</div>
				</div>

				{/* Visualisation du terrain */}
				<div className={classes.section}>
					<h2>Terrain de basketball</h2>
					<div className={classes.courtContainer}>
						<BasketballCourt size={CourtSize.LG} theme={CourtTheme.MODERN} onCourtClick={handleCourtClick} />
					</div>
				</div>

				{/* Tableau de bord du match */}
				<div className={classes.section}>
					<h2>Tableau de bord du match</h2>
					<div className={classes.scoreboardContainer}>
						<GameScoreboard
							homeTeam={{ name: "Lakers", score: totalPoints, fouls: totalFouls }}
							awayTeam={{ name: "Warriors", score: 78, fouls: 8 }}
							gameTime={{ period: 3, timeLeft: "08:45", status: "live" }}
							showStats={true}
							stats={{
								totalPoints: totalPoints + 78,
								totalRebounds: totalRebounds + 32,
								totalAssists: totalAssists + 18,
								totalFouls: totalFouls + 8,
							}}
							size="lg"
						/>
					</div>
				</div>

				{/* KPIs globaux */}
				<div className={classes.section}>
					<h2>Statistiques globales de l'équipe</h2>
					<div className={classes.kpiGrid}>
						<KPICard
							title="Points marqués"
							value={totalPoints}
							icon="🏀"
							trend={totalPoints > 70 ? "up" : totalPoints > 50 ? "neutral" : "down"}
							trendValue={`${totalPoints}/100`}
							trendLabel="objectif du match"
							size="lg"
						/>
						<KPICard
							title="Rebonds"
							value={totalRebounds}
							icon="⬆️"
							trend={totalRebounds > 40 ? "up" : "neutral"}
							trendValue={`${totalRebounds}/50`}
							trendLabel="objectif"
							size="lg"
						/>
						<KPICard
							title="Passes décisives"
							value={totalAssists}
							icon="🤝"
							trend={totalAssists > 20 ? "up" : "neutral"}
							trendValue={`${totalAssists}/25`}
							trendLabel="objectif"
							size="lg"
						/>
						<KPICard
							title="Fautes"
							value={totalFouls}
							icon="⚠️"
							trend={totalFouls > 15 ? "up" : totalFouls > 10 ? "neutral" : "down"}
							trendValue={`${totalFouls}/20`}
							trendLabel="limite recommandée"
							size="lg"
						/>
					</div>
				</div>

				{/* Équipe et joueurs */}
				<div className={classes.section}>
					<h2>Équipe - Lakers</h2>
					<div className={classes.playersGrid}>
						{demoPlayers.map((player) => (
							<PlayerCard
								key={player.id}
								name={player.name}
								number={player.number}
								position={player.position}
								stats={playerStats[player.id]}
								active={selectedPlayer === player.id}
								onClick={() => setSelectedPlayer(selectedPlayer === player.id ? null : player.id)}
							/>
						))}
					</div>
				</div>

				{/* Interface de saisie des statistiques */}
				{selectedPlayer && (
					<div className={classes.section}>
						<h2>
							Saisie des statistiques - {demoPlayers.find((p) => p.id === selectedPlayer)?.name}
							<Badge variant="primary" size="md">
								#{demoPlayers.find((p) => p.id === selectedPlayer)?.number}
							</Badge>
						</h2>
						<Card variant="elevated">
							<div className={classes.statCountersGrid}>
								<StatCounter
									label="Points"
									value={playerStats[selectedPlayer]?.points || 0}
									onChange={(value) => updateStat(selectedPlayer, "points", value)}
									variant="default"
									max={50}
									size="lg"
								/>
								<StatCounter
									label="Rebonds"
									value={playerStats[selectedPlayer]?.rebounds || 0}
									onChange={(value) => updateStat(selectedPlayer, "rebounds", value)}
									variant="default"
									max={20}
									size="lg"
								/>
								<StatCounter
									label="Passes"
									value={playerStats[selectedPlayer]?.assists || 0}
									onChange={(value) => updateStat(selectedPlayer, "assists", value)}
									variant="default"
									max={15}
									size="lg"
								/>
								<StatCounter
									label="Fautes"
									value={playerStats[selectedPlayer]?.fouls || 0}
									onChange={(value) => updateStat(selectedPlayer, "fouls", value)}
									variant="danger"
									max={5}
									size="lg"
								/>
							</div>
						</Card>
					</div>
				)}

				{/* Démonstration des différentes tailles */}
				<div className={classes.section}>
					<h2>Variations des composants</h2>

					<div className={classes.subsection}>
						<h3>PlayerCard - Différentes tailles</h3>
						<div className={classes.playerSizesGrid}>
							<PlayerCard name="Magic Johnson" number={32} position="PG" stats={{ points: 15, rebounds: 5, assists: 10 }} size="sm" />
							<PlayerCard name="Kobe Bryant" number={24} position="SG" stats={{ points: 28, rebounds: 6, assists: 4 }} size="md" />
							<PlayerCard name="Kareem Abdul-Jabbar" number={33} position="C" stats={{ points: 24, rebounds: 11, assists: 2 }} size="lg" />
						</div>
					</div>

					<div className={classes.subsection}>
						<h3>StatCounter - Différentes variantes</h3>
						<div className={classes.statVariantsGrid}>
							<StatCounter label="Points" value={12} variant="default" size="md" showButtons={false} />
							<StatCounter label="Rebounds" value={8} variant="default" size="md" showButtons={false} />
							<StatCounter label="Assists" value={6} variant="default" size="md" showButtons={false} />
							<StatCounter label="Fouls" value={3} variant="danger" size="md" showButtons={false} />
						</div>
					</div>

					<div className={classes.subsection}>
						<h3>GameScoreboard - Différents états</h3>
						<div className={classes.scoreboardVariants}>
							<GameScoreboard
								homeTeam={{ name: "Celtics", score: 89 }}
								awayTeam={{ name: "Heat", score: 92 }}
								gameTime={{ period: 4, timeLeft: "02:34", status: "live" }}
								size="sm"
							/>
							<GameScoreboard
								homeTeam={{ name: "Bulls", score: 76 }}
								awayTeam={{ name: "Knicks", score: 74 }}
								gameTime={{ period: 0, timeLeft: "Final", status: "finished" }}
								size="md"
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
