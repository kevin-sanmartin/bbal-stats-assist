"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/elements/Button";
import { TPlayer, TCreatePlayerInput } from "@/types/player";
import { EPlayerPosition } from "@/enums/player";
import { PlayersClientService } from "@/services/supabase/players/ClientService";
import { TeamsClientService } from "@/services/supabase/teams/ClientService";
import { useToastContext } from "@/contexts/ToastContext";
import PlayerTable from "./components/PlayerTable";
import PlayerModal from "./components/PlayerModal";
import DeletePlayerConfirmModal from "./components/DeletePlayerConfirmModal";
import EmptyPlayersState from "./components/EmptyPlayersState";
import classes from "./classes.module.scss";

interface PlayersProps {
	teamId: string;
}

const playersService = PlayersClientService.getInstance();
const teamsService = TeamsClientService.getInstance();

export default function Players({ teamId }: PlayersProps) {
	const router = useRouter();
	const { toast } = useToastContext();
	const [players, setPlayers] = useState<TPlayer[]>([]);
	const [team, setTeam] = useState<{ name: string } | null>(null);
	const [loading, setLoading] = useState(true);
	const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
	const [isEditPlayerModalOpen, setIsEditPlayerModalOpen] = useState(false);
	const [isDeletePlayerModalOpen, setIsDeletePlayerModalOpen] = useState(false);
	const [selectedPlayer, setSelectedPlayer] = useState<TPlayer | null>(null);
	const [playerToDelete, setPlayerToDelete] = useState<TPlayer | null>(null);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const loadData = async () => {
		setLoading(true);
		try {
			const [teamPlayers, teamData] = await Promise.all([
				playersService.getTeamPlayers(teamId),
				teamsService.getUserTeams().then((teams) => teams.find((t) => t.id === teamId)),
			]);

			if (!teamData) {
				router.push("/teams");
				return;
			}

			setPlayers(teamPlayers);
			setTeam({ name: teamData.name });
		} catch (error) {
			console.error("Erreur lors du chargement des données:", error);
			toast.error("Impossible de charger les données");
			router.push("/teams");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadData();
	}, [teamId]);

	const isJerseyNumberTaken = async (number: number, excludePlayerId?: string) => {
		const isTaken = await playersService.checkJerseyNumber(teamId, number, excludePlayerId);
		if (isTaken) {
			toast.error(`Le numéro ${number} est déjà utilisé dans cette équipe.`);
		}
		return isTaken;
	};

	const handleCreatePlayer = async (playerData: { name: string; number: number; position: EPlayerPosition }) => {
		const isTaken = await isJerseyNumberTaken(playerData.number);
		if (isTaken) return;

		try {
			const newPlayer = await playersService.createPlayer({
				...playerData,
				team_id: teamId,
			});
			setPlayers([...players, newPlayer].sort((a, b) => a.number - b.number));
			setIsPlayerModalOpen(false);
			toast.success("Joueur ajouté avec succès");
		} catch (error) {
			console.error("Erreur lors de la création du joueur:", error);
			toast.error("Impossible d'ajouter le joueur");
		}
	};

	const handleEditPlayer = async (playerData: { name: string; number: number; position: EPlayerPosition }) => {
		if (!selectedPlayer) return;

		const isTaken = await isJerseyNumberTaken(playerData.number, selectedPlayer.id);
		if (isTaken) return;

		try {
			const updatedPlayer = await playersService.updatePlayer(selectedPlayer.id, playerData);
			setPlayers(players.map((player) => (player.id === selectedPlayer.id ? updatedPlayer : player)).sort((a, b) => a.number - b.number));
			setIsEditPlayerModalOpen(false);
			setSelectedPlayer(null);
			toast.success("Joueur modifié avec succès");
		} catch (error) {
			console.error("Erreur lors de la modification du joueur:", error);
			toast.error("Impossible de modifier le joueur");
		}
	};

	const openEditModal = (player: TPlayer) => {
		setSelectedPlayer(player);
		setIsEditPlayerModalOpen(true);
	};

	const openDeleteModal = (player: TPlayer) => {
		setPlayerToDelete(player);
		setIsDeletePlayerModalOpen(true);
	};

	const handleDeletePlayer = async () => {
		if (!playerToDelete) return;
		setDeleteLoading(true);

		try {
			await playersService.deletePlayer(playerToDelete.id);
			setPlayers(players.filter((player) => player.id !== playerToDelete.id));
			setIsDeletePlayerModalOpen(false);
			setPlayerToDelete(null);
			toast.success("Joueur supprimé avec succès");
		} catch (error) {
			console.error("Erreur lors de la suppression du joueur:", error);
			toast.error("Impossible de supprimer le joueur");
		} finally {
			setDeleteLoading(false);
		}
	};

	const closeModals = () => {
		setIsPlayerModalOpen(false);
		setIsEditPlayerModalOpen(false);
		setIsDeletePlayerModalOpen(false);
		setSelectedPlayer(null);
		setPlayerToDelete(null);
	};

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<div className={classes.headerContent}>
					<div className={classes.teamInfo}>
						<h1 className={classes.title}>Gestion des joueurs</h1>
						<span className={classes.subtitle}>Gérez votre effectif et les informations des joueurs</span>
					</div>
				</div>
				<Button onClick={() => setIsPlayerModalOpen(true)} leftIcon="+">
					Ajouter un joueur
				</Button>
			</div>

			<div className={classes.content}>
				{loading && (
					<div className={classes.loading}>
						<div className={classes.loadingSpinner}></div>
						<p>Chargement des joueurs...</p>
					</div>
				)}

				{!loading && players.length === 0 && <EmptyPlayersState onAddPlayer={() => setIsPlayerModalOpen(true)} />}

				{!loading && players.length > 0 && (
					<>
						<div className={classes.playersCount}>
							{players.length} joueur{players.length > 1 ? "s" : ""} dans l'équipe {team?.name}
						</div>
						<PlayerTable players={players} onEdit={openEditModal} onDelete={openDeleteModal} />
					</>
				)}
			</div>

			<PlayerModal isOpen={isPlayerModalOpen} onClose={closeModals} onSubmit={handleCreatePlayer} title="Ajouter un joueur" />

			<PlayerModal
				isOpen={isEditPlayerModalOpen}
				onClose={closeModals}
				onSubmit={handleEditPlayer}
				title="Modifier le joueur"
				initialData={
					selectedPlayer
						? {
								name: selectedPlayer.name,
								number: selectedPlayer.number,
								position: selectedPlayer.position,
						  }
						: undefined
				}
			/>

			<DeletePlayerConfirmModal
				isOpen={isDeletePlayerModalOpen}
				onClose={closeModals}
				onConfirm={handleDeletePlayer}
				playerName={playerToDelete?.name ?? ""}
				loading={deleteLoading}
			/>
		</div>
	);
}
