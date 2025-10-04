"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { TTeamWithPlayers } from "@/types/team";
import { UserStats } from "@/services/supabase/games/ServerService";
import Card from "@/components/elements/Card";
import Button from "@/components/elements/Button";
import StatCounter from "@/components/elements/StatCounter";
import classes from "./classes.module.scss";
import TeamCard from "@/components/materials/TeamCard";
import { FaUsers, FaTrophy } from "react-icons/fa";
interface HomeProps {
	teams: TTeamWithPlayers[];
	userStats: UserStats;
}

export default function Home({ teams, userStats }: HomeProps) {
	const { user } = useAuthContext();
	const router = useRouter();

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
			</div>

			{teams.length === 0 && (
				<div className={classes.emptyState}>
					<div className={classes.emptyIcon}>🏀</div>
					<h2>Aucune équipe trouvée</h2>
					<p>Créez votre première équipe pour commencer à suivre vos statistiques</p>
					<Button color="primary" onClick={() => router.push("/teams")}>
						Créer ma première équipe
					</Button>
				</div>
			)}
			{teams.length > 0 && (
				<div className={classes.content}>
					<div className={classes.stats}>
						<StatCounter label="Équipes actives" value={teams.length} />
						<StatCounter label="Victoires" value={userStats.totalWins} variant="success" />
						<StatCounter label="Taux de victoire" value={userStats.winRate} suffix="%" variant={userStats.winRate >= 70 ? "success" : "warning"} />
						<StatCounter label="Joueurs total" value={userStats.totalPlayers} variant="warning" />
					</div>

					<div className={classes.teamsSection}>
						<h2>Mes équipes</h2>
						<div className={classes.teamsGrid}>
							{teams.map((team) => (
								<TeamCard key={team.id} team={team} />
							))}
						</div>
					</div>

					<div className={classes.quickActions}>
						<h2>Actions rapides</h2>
						<div className={classes.actionsGrid}>
							<Card className={classes.actionCard} onClick={() => router.push("/matches")}>
								<FaTrophy size={40} className={classes.actionIcon} />
								<h3>Nouveau match</h3>
								<p>Démarrer un match en direct ou manuel</p>
							</Card>
							<Card className={classes.actionCard} onClick={() => router.push("/teams")}>
								<FaUsers size={40} className={classes.actionIcon} />
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
