"use client";

import { useState, useMemo } from "react";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import { TPlayer } from "@/types/player";
import { EPlayerPosition } from "@/enums/player";
import { PlayersClientService } from "@/services/supabase/players/ClientService";
import { useToastContext } from "@/contexts/ToastContext";
import PlayerModal from "./components/PlayerModal";
import DeletePlayerConfirmModal from "./components/DeletePlayerConfirmModal";
import EmptyPlayersState from "./components/EmptyPlayersState";
import classes from "./classes.module.scss";
import PlayerCard from "./components/PlayerCard";
import { useRouter } from "next/navigation";

enum EPlayerPositionTranslated {
	PG = "Meneur",
	SG = "Arrière",
	SF = "Ailier",
	PF = "Ailier fort",
	C = "Pivot",
}

interface PlayersProps {
	teamId: string;
	initialPlayers: TPlayer[];
	teamName: string;
}

const playersService = PlayersClientService.getInstance();

export default function Players({ teamId, initialPlayers, teamName }: PlayersProps) {
	const router = useRouter();
	const { toast } = useToastContext();
	const [players, setPlayers] = useState<TPlayer[]>(initialPlayers);
	const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
	const [isEditPlayerModalOpen, setIsEditPlayerModalOpen] = useState(false);
	const [isDeletePlayerModalOpen, setIsDeletePlayerModalOpen] = useState(false);
	const [selectedPlayer, setSelectedPlayer] = useState<TPlayer | null>(null);
	const [playerToDelete, setPlayerToDelete] = useState<TPlayer | null>(null);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedPosition, setSelectedPosition] = useState<EPlayerPosition | "ALL">("ALL");

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

	const backToTeams = () => {
		router.push("/teams");
	};

	const filteredPlayers = useMemo(() => {
		return players.filter((player) => {
			const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesPosition = selectedPosition === "ALL" || player.position === selectedPosition;
			return matchesSearch && matchesPosition;
		});
	}, [players, searchQuery, selectedPosition]);

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<div className={classes.headerContent}>
					<div className={classes.teamInfo}>
						<h1 className={classes.title}>Gestion des joueurs</h1>
						<span className={classes.subtitle}>Gérez votre effectif et les informations des joueurs</span>
					</div>
				</div>
				<div className={classes.headerActions}>
					<Button variant="outlined" onClick={backToTeams} className={classes.backButton}>
						Retour aux équipes
					</Button>
					<Button onClick={() => setIsPlayerModalOpen(true)} leftIcon="+">
						Ajouter un joueur
					</Button>
				</div>
			</div>

			{players.length > 0 && (
				<div className={classes.filters}>
					<Input
						placeholder="Rechercher un joueur..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						leftIcon={
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
							</svg>
						}
						fullWidth
					/>
					<div className={classes.positionFilters}>
						<button className={`${classes.filterButton} ${selectedPosition === "ALL" ? classes.active : ""}`} onClick={() => setSelectedPosition("ALL")}>
							Tous
						</button>
						{Object.values(EPlayerPosition).map((position) => (
							<button
								key={position}
								className={`${classes.filterButton} ${selectedPosition === position ? classes.active : ""}`}
								onClick={() => setSelectedPosition(position)}>
								{EPlayerPositionTranslated[position]}
							</button>
						))}
					</div>
				</div>
			)}

			<div className={classes.content}>
				{players.length === 0 && <EmptyPlayersState onAddPlayer={() => setIsPlayerModalOpen(true)} />}

				{players.length > 0 && (
					<>
						<div className={classes.playersCount}>
							{filteredPlayers.length} joueur{filteredPlayers.length > 1 ? "s" : ""} dans l'équipe {teamName}
							{(searchQuery || selectedPosition !== "ALL") && ` (${players.length} au total)`}
						</div>
						<div className={classes.playersList}>
							{filteredPlayers.map((player) => (
								<PlayerCard
									key={player.id}
									name={player.name}
									number={player.number}
									position={player.position}
									onDelete={() => openDeleteModal(player)}
									onEdit={() => openEditModal(player)}
								/>
							))}
						</div>
						{filteredPlayers.length === 0 && (
							<div className={classes.noResults}>
								<p>Aucun joueur ne correspond aux critères de recherche</p>
							</div>
						)}
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
