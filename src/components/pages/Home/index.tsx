"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { TTeam } from "@/types/team";
import { TGame } from "@/types/game";
import { UserStats } from "@/services/supabase/games/ServerService";
import Card from "@/components/elements/Card";
import Button from "@/components/elements/Button";
import Badge from "@/components/elements/Badge";
import StatCounter from "@/components/elements/StatCounter";
import classes from "./classes.module.scss";

interface HomeProps {
	initialTeams: TTeam[];
	initialGames: TGame[];
	userStats: UserStats;
}

export default function Home({ initialTeams, initialGames, userStats }: HomeProps) {
	const { user } = useAuthContext();
	const router = useRouter();

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

	if (!user) {
		return (
			<div className={classes.welcome}>
				<div className={classes.welcomeContent}>
					<h1>🏀 BasketStats Assistant</h1>
					<p>Suivez les statistiques de vos équipes de basketball en temps réel</p>
					<div className={classes.features}>
						<div className={classes.feature}>
							<span className={classes.featureIcon}>⚡</span>
							<span>Saisie live pendant les matchs</span>
						</div>
						<div className={classes.feature}>
							<span className={classes.featureIcon}>📊</span>
							<span>Statistiques détaillées</span>
						</div>
						<div className={classes.feature}>
							<span className={classes.featureIcon}>📱</span>
							<span>Interface mobile optimisée</span>
						</div>
					</div>
					<Button color="primary" onClick={() => router.push("/auth/login")}>
						Se connecter
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<div className={classes.headerContent}>
					<h1>Tableau de bord</h1>
					<p>Bienvenue, {user.email}</p>
				</div>
				<div className={classes.headerActions}>
					<Button color="primary" onClick={() => router.push("/teams")}>
						+ Nouvelle équipe
					</Button>
				</div>
			</div>

			{initialTeams.length === 0 ? (
				<div className={classes.emptyState}>
					<div className={classes.emptyIcon}>🏀</div>
					<h2>Aucune équipe trouvée</h2>
					<p>Créez votre première équipe pour commencer à suivre vos statistiques</p>
					<Button color="primary" onClick={() => router.push("/teams")}>
						Créer ma première équipe
					</Button>
				</div>
			) : (
				<div className={classes.content}>
					<div className={classes.stats}>
						<Card className={classes.statCard}>
							<StatCounter label="Équipes actives" value={initialTeams.length} size="lg" showButtons={false} />
						</Card>
						<Card className={classes.statCard}>
							<StatCounter label="Victoires" value={userStats.totalWins} size="lg" variant="success" showButtons={false} />
						</Card>
						<Card className={classes.statCard}>
							<StatCounter
								label="Taux de victoire"
								value={userStats.winRate}
								suffix="%"
								size="lg"
								variant={userStats.winRate >= 70 ? "success" : userStats.winRate >= 50 ? "warning" : "danger"}
								showButtons={false}
							/>
						</Card>
						<Card className={classes.statCard}>
							<StatCounter label="Joueurs total" value={userStats.totalPlayers} size="lg" variant="warning" showButtons={false} />
						</Card>
					</div>

					<div className={classes.teamsSection}>
						<h2>Mes équipes</h2>
						<div className={classes.teamsGrid}>
							{initialTeams.map((team) => (
								<Card key={team.id} className={classes.teamCard}>
									<div className={classes.teamHeader}>
										<h3>{team.name}</h3>
										<Badge variant={getCategoryColor(team.category) as any}>{team.category}</Badge>
									</div>
									<div className={classes.teamActions}>
										<Button variant="outlined" onClick={() => router.push(`/teams/${team.id}/players`)}>
											👥 Joueurs
										</Button>
										<Button color="primary" onClick={() => router.push(`/teams/${team.id}/history`)}>
											📊 Historique
										</Button>
									</div>
								</Card>
							))}
						</div>
					</div>

					<div className={classes.quickActions}>
						<h2>Actions rapides</h2>
						<div className={classes.actionsGrid}>
							<Card className={classes.actionCard} onClick={() => router.push("/matches")}>
								<div className={classes.actionIcon}>🏆</div>
								<h3>Nouveau match</h3>
								<p>Démarrer un match en direct ou manuel</p>
							</Card>
							<Card className={classes.actionCard} onClick={() => router.push("/teams")}>
								<div className={classes.actionIcon}>👥</div>
								<h3>Gérer les équipes</h3>
								<p>Ajouter ou modifier vos équipes</p>
							</Card>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
