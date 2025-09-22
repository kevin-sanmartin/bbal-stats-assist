"use client";
import { useState } from "react";
import Button from "@/components/elements/Button";
import { TCreateTeamInput, TTeam } from "@/types/team";
import { ETeamCategory } from "@/enums/team";
import TeamCard from "./components/TeamCard";
import TeamModal from "./components/TeamModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import EmptyState from "./components/EmptyState";
import classes from "./classes.module.scss";
import { TeamsClientService } from "@/services/supabase/teams/ClientService";
import { useToastContext } from "@/contexts/ToastContext";

type IProps = {
	initialTeams: TTeam[];
};

const teamsService = TeamsClientService.getInstance();

export default function Teams(props: IProps) {
	const { toast } = useToastContext();
	const [teams, setTeams] = useState<TTeam[]>(props.initialTeams);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState<TTeam | null>(null);
	const [teamToDelete, setTeamToDelete] = useState<TTeam | null>(null);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const isNameTaken = (name: string) => {
		const isTaken = teams.some((team) => team.name.toLowerCase() === name.toLowerCase() && team.id !== selectedTeam?.id);
		if (isTaken) {
			toast.error("Le nom de l'équipe est déjà utilisé.");
		}
		return isTaken;
	};

	const handleCreateTeam = async (teamData: TCreateTeamInput) => {
		if (isNameTaken(teamData.name)) return;
		teamsService
			.createTeam(teamData)
			.then((newTeam) => {
				setTeams([...teams, newTeam]);
				setIsCreateModalOpen(false);
			})
			.catch((error) => {
				console.error("Erreur lors de la création de l'équipe :", error);
			});
	};

	const handleEditTeam = async (teamData: { name: string; category: ETeamCategory }) => {
		if (!selectedTeam) return;
		if (isNameTaken(teamData.name)) return;

		teamsService
			.updateTeam(selectedTeam.id, teamData)
			.then((updatedTeam) => {
				setTeams(teams.map((team) => (team.id === selectedTeam.id ? updatedTeam : team)));
				setIsEditModalOpen(false);
				setSelectedTeam(null);
			})
			.catch((error) => {
				console.error("Erreur lors de la mise à jour de l'équipe :", error);
			});
	};

	const openDeleteModal = (team: TTeam) => {
		setTeamToDelete(team);
		setIsDeleteModalOpen(true);
	};

	const handleDeleteTeam = () => {
		if (!teamToDelete) return;
		setDeleteLoading(true);

		teamsService
			.deleteTeam(teamToDelete.id)
			.then(() => {
				setTeams(teams.filter((team) => team.id !== teamToDelete.id));
				setIsDeleteModalOpen(false);
				setTeamToDelete(null);
				setDeleteLoading(false);
			})
			.catch((error) => {
				console.error("Erreur lors de la suppression de l'équipe :", error);
				setDeleteLoading(false);
			});
	};

	const openEditModal = (team: TTeam) => {
		setSelectedTeam(team);
		setIsEditModalOpen(true);
	};

	const closeModals = () => {
		setIsCreateModalOpen(false);
		setIsEditModalOpen(false);
		setIsDeleteModalOpen(false);
		setSelectedTeam(null);
		setTeamToDelete(null);
	};

	const hasTeams = teams.length > 0;

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<h1 className={classes.title}>Gestion des équipes</h1>
				<Button onClick={() => setIsCreateModalOpen(true)} leftIcon="+">
					Nouvelle équipe
				</Button>
			</div>

			{!hasTeams && <EmptyState onCreateTeam={() => setIsCreateModalOpen(true)} />}
			{hasTeams && (
				<div className={classes.teamsList}>
					{teams.map((team) => (
						<TeamCard key={team.id} team={team} onEdit={() => openEditModal(team)} onDelete={() => openDeleteModal(team)} />
					))}
				</div>
			)}

			<TeamModal isOpen={isCreateModalOpen} onClose={closeModals} onSubmit={handleCreateTeam} title="Créer une nouvelle équipe" />
			<TeamModal isOpen={isEditModalOpen} onClose={closeModals} onSubmit={handleEditTeam} title="Modifier l'équipe" initialData={selectedTeam ?? undefined} />
			<DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={closeModals} onConfirm={handleDeleteTeam} teamName={teamToDelete?.name ?? ""} loading={deleteLoading} />
		</div>
	);
}
