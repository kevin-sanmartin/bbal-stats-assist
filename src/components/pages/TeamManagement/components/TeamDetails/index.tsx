"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TTeam } from "@/types/team";
import { ETeamCategory } from "@/enums/team";
import { TeamStats } from "@/services/supabase/games/ServerService";
import Card from "@/components/elements/Card";
import Button from "@/components/elements/Button";
import Badge from "@/components/elements/Badge";
import StatCounter from "@/components/elements/StatCounter";
import TeamModal from "../TeamModal";
import DeleteConfirmModal from "../DeleteConfirmModal";
import { TeamsClientService } from "@/services/supabase/teams/ClientService";
import { useToastContext } from "@/contexts/ToastContext";
import classes from "./classes.module.scss";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TeamDetailsProps {
	team: TTeam;
	playersCount: number;
	teamStats: TeamStats;
}

const teamsService = TeamsClientService.getInstance();

export default function TeamDetails({ team: initialTeam, playersCount, teamStats }: TeamDetailsProps) {
	const router = useRouter();
	const { toast } = useToastContext();
	const [team, setTeam] = useState(initialTeam);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const handleEditTeam = async (teamData: { name: string; category: ETeamCategory }) => {
		try {
			const updatedTeam = await teamsService.updateTeam(team.id, teamData);
			setTeam(updatedTeam);
			setIsEditModalOpen(false);
			toast.success("Équipe modifiée avec succès");
		} catch (error) {
			console.error("Erreur lors de la mise à jour de l'équipe :", error);
			toast.error("Impossible de modifier l'équipe");
		}
	};

	const handleDeleteTeam = async () => {
		setDeleteLoading(true);

		try {
			await teamsService.deleteTeam(team.id);
			toast.success("Équipe supprimée avec succès");
			router.push("/");
		} catch (error) {
			console.error("Erreur lors de la suppression de l'équipe :", error);
			toast.error("Impossible de supprimer l'équipe");
			setDeleteLoading(false);
		}
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

	return (
		<div className={classes.root}>
			<div className={classes.teamHeader}>
				<div className={classes.teamInfo}>
					<h1 className={classes.teamName}>{team.name}</h1>
					<Badge variant={getCategoryColor(team.category)}>{team.category}</Badge>
				</div>
				<div className={classes.teamActions}>
					<Button variant="contained" onClick={() => setIsEditModalOpen(true)} leftIcon={<FaEdit />}>
						Modifier
					</Button>
					<Button color="danger" variant="outlined" onClick={() => setIsDeleteModalOpen(true)} leftIcon={<FaTrash />}>
						Supprimer
					</Button>
				</div>
			</div>

			<div className={classes.statsSection}>
				<h2>Statistiques de l'équipe</h2>
				<div className={classes.statsGrid}>
					<StatCounter label="Victoires" value={teamStats.wins} variant={teamStats.winRate >= 70 ? "success" : "warning"} />
					<StatCounter label="Points/match" value={teamStats.avgPointsPerGame} variant={teamStats.avgPointsPerGame >= 60 ? "success" : "warning"} />
					<StatCounter label="Matchs joués" value={teamStats.totalGames} variant="default" />
					<StatCounter label="Joueurs" value={playersCount} variant="default" />
					<StatCounter label="Défaites" value={teamStats.losses} variant="danger" />
					<StatCounter label="Matchs nuls" value={teamStats.draws} variant="warning" />
					<StatCounter
						label="Taux de victoire"
						value={teamStats.winRate}
						suffix="%"
						variant={teamStats.winRate >= 70 ? "success" : teamStats.winRate >= 50 ? "warning" : "danger"}
					/>
					<StatCounter
						label="Différentiel"
						value={teamStats.totalGames > 0 ? Math.round((teamStats.totalPointsFor - teamStats.totalPointsAgainst) / teamStats.totalGames) : 0}
						prefix={teamStats.totalPointsFor > teamStats.totalPointsAgainst ? "+" : ""}
						variant={teamStats.totalPointsFor > teamStats.totalPointsAgainst ? "success" : "danger"}
					/>
				</div>
				<div className={classes.statsLegend}>
					<ul>
						<li>
							<strong>Points/match :</strong> Moyenne de points marqués par match
						</li>
						<li>
							<strong>Taux de victoire :</strong> Pourcentage de matchs gagnés
						</li>
						<li>
							<strong>Différentiel :</strong> Différence moyenne de points marqués vs encaissés
						</li>
					</ul>
				</div>
			</div>

			<TeamModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSubmit={handleEditTeam} title="Modifier l'équipe" initialData={team} />

			<DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteTeam} teamName={team.name} loading={deleteLoading} />
		</div>
	);
}
