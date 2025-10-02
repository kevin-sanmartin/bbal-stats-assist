"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CourtPosition } from "@/components/elements/BasketballCourt/types";
import { EActionType } from "@/enums/action";
import { TPlayer } from "@/types/player";
import BasketballCourt from "@/components/elements/BasketballCourt";
import Card from "@/components/elements/Card";
import Button from "@/components/elements/Button";
import Badge from "@/components/elements/Badge";
import Avatar from "@/components/elements/Avatar";
import classes from "./classes.module.scss";
import { CourtSize } from "@/components/elements/BasketballCourt/enums";
import PlayerSelectionModal from "./components/PlayerSelectionModal";
import ActionSelectionModal from "./components/ActionSelectionModal";
import EndMatchModal from "./components/EndMatchModal";
import { GamesClientService } from "@/services/supabase/games/ClientService";
import { TCreateActionInput } from "@/types/action";
import { useToastContext } from "@/contexts/ToastContext";

interface LiveAction {
	id: string;
	type: EActionType;
	position: CourtPosition;
	playerId: string;
	playerName: string;
}

interface LiveMatchProps {
	players: TPlayer[];
	teamId: string;
	competitionId?: string;
}

export default function LiveMatch({ players, teamId, competitionId }: LiveMatchProps) {
	const [actions, setActions] = useState<LiveAction[]>([]);
	const { toast } = useToastContext();
	const router = useRouter();
	const gamesService = GamesClientService.getInstance();

	// États pour les modals
	const [clickedPosition, setClickedPosition] = useState<CourtPosition | null>(null);
	const [selectedPlayer, setSelectedPlayer] = useState<TPlayer | null>(null);
	const [showPlayerModal, setShowPlayerModal] = useState(false);
	const [showActionModal, setShowActionModal] = useState(false);
	const [showEndMatchModal, setShowEndMatchModal] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	const handleCourtClick = (position: CourtPosition) => {
		console.log("Court clicked at position:", position);
		setClickedPosition(position);
		setShowPlayerModal(true);
	};

	const handlePlayerSelect = (player: TPlayer) => {
		setSelectedPlayer(player);
		setShowPlayerModal(false);
		setShowActionModal(true);
	};

	const handleActionSelect = (actionType: EActionType) => {
		if (clickedPosition && selectedPlayer) {
			const newAction: LiveAction = {
				id: `action-${Date.now()}`,
				type: actionType,
				position: clickedPosition,
				playerId: selectedPlayer.id,
				playerName: selectedPlayer.name,
			};

			setActions((prev) => [...prev, newAction]);

			// Fermer les modals et reset les états
			setShowActionModal(false);
			setClickedPosition(null);
			setSelectedPlayer(null);
		}
	};

	const handleCloseModals = () => {
		setShowPlayerModal(false);
		setShowActionModal(false);
		setClickedPosition(null);
		setSelectedPlayer(null);
	};

	const handleUndoLastAction = () => {
		setActions((prev) => prev.slice(0, -1));
	};

	const handleEndMatch = () => {
		setShowEndMatchModal(true);
	};

	const handleEndMatchSubmit = async (matchData: { opponent: string; ourScore: number; opponentScore: number; location: "HOME" | "AWAY" }) => {
		setIsSaving(true);

		try {
			// Préparer les données du match
			const gameData = {
				opponent: matchData.opponent,
				score: matchData.ourScore,
				opponent_score: matchData.opponentScore,
				date: new Date().toISOString(),
				location: matchData.location,
				team_id: teamId,
				competition_id: competitionId,
			};

			// Préparer les actions pour la BDD
			const actionsData: TCreateActionInput[] = actions.map((action) => ({
				type: action.type,
				position_x: action.position.x,
				position_y: action.position.y,
				player_id: action.playerId,
				game_id: "", // Sera rempli par le service
			}));

			// Créer le match avec toutes ses actions
			const result = await gamesService.createGameWithActions(gameData, actionsData);

			toast.success(`Match sauvegardé ! ${result.actionsCreated} actions enregistrées.`);

			// Redirection vers la page d'accueil
			router.push("/");
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
			toast.error("Erreur lors de la sauvegarde du match");
		} finally {
			setIsSaving(false);
		}
	};

	const getLastActions = () => actions.slice(-5).reverse();

	const getActionIcon = (actionType: EActionType): string => {
		switch (actionType) {
			case EActionType.THREE_PTS:
				return "🏀";
			case EActionType.TWO_PTS:
				return "⛹️";
			case EActionType.FREE_THROW:
				return "🎯";
			case EActionType.REBOUND:
				return "📌";
			case EActionType.ASSIST:
				return "🤝";
			case EActionType.STEAL:
				return "💨";
			case EActionType.FOUL:
				return "⚠️";
			default:
				return "🏀";
		}
	};

	const getActionVariant = (actionType: EActionType): "default" | "primary" | "success" | "warning" | "danger" | "info" => {
		switch (actionType) {
			case EActionType.THREE_PTS:
				return "success";
			case EActionType.TWO_PTS:
				return "primary";
			case EActionType.FREE_THROW:
				return "info";
			case EActionType.REBOUND:
				return "warning";
			case EActionType.ASSIST:
				return "success";
			case EActionType.STEAL:
				return "info";
			case EActionType.FOUL:
				return "danger";
			default:
				return "default";
		}
	};

	const getActionLabel = (actionType: EActionType): string => {
		switch (actionType) {
			case EActionType.THREE_PTS:
				return "3 Points";
			case EActionType.TWO_PTS:
				return "2 Points";
			case EActionType.FREE_THROW:
				return "Lancer Franc";
			case EActionType.REBOUND:
				return "Rebond";
			case EActionType.ASSIST:
				return "Passe Décisive";
			case EActionType.STEAL:
				return "Interception";
			case EActionType.FOUL:
				return "Faute";
			default:
				return actionType;
		}
	};

	return (
		<div className={classes.liveMatch}>
			{/* Header */}
			<div className={classes.header}>
				<h1>Match Live</h1>

				<Button onClick={handleEndMatch} disabled={actions.length === 0}>
					Fin du match
				</Button>
			</div>

			{/* Terrain principal */}
			<div className={classes.courtSection}>
				<BasketballCourt
					onCourtClick={handleCourtClick}
					size={CourtSize.FULLWIDTH}
					actions={actions.map((action) => ({
						id: action.id,
						position: action.position,
						actionType: action.type,
						playerName: action.playerName,
					}))}
				/>
			</div>

			{/* Contenu en dessous */}
			<div className={classes.bottomContent}>
				{/* Dernières actions */}
				<Card className={classes.actionsHistory}>
					<div className={classes.actionsHeader}>
						<div className={classes.headerLeft}>
							<h3>Dernières actions</h3>
							<Badge variant="info" size="sm">
								{actions.length}
							</Badge>
						</div>
						<Button variant="outlined" onClick={handleUndoLastAction} disabled={actions.length === 0}>
							↶ Annuler
						</Button>
					</div>
					{getLastActions().length === 0 ? (
						<div className={classes.emptyState}>
							<div className={classes.emptyIcon}>🏀</div>
							<p>Aucune action enregistrée</p>
							<span>Cliquez sur le terrain pour commencer</span>
						</div>
					) : (
						<div className={classes.actionsList}>
							{getLastActions().map((action, index) => (
								<div key={action.id} className={classes.actionItem}>
									<div className={classes.actionMain}>
										<Badge variant={getActionVariant(action.type)} size="md" className={classes.actionBadge}>
											{getActionLabel(action.type)}
										</Badge>
										<span className={classes.actionIndex}>#{actions.length - index}</span>
									</div>
									<div className={classes.actionPlayer}>
										<Avatar name={action.playerName} size="xs" />
										<span>{action.playerName}</span>
									</div>
								</div>
							))}
						</div>
					)}
				</Card>
			</div>

			{/* Modals */}
			<PlayerSelectionModal isOpen={showPlayerModal} onClose={handleCloseModals} players={players} onPlayerSelect={handlePlayerSelect} />

			<ActionSelectionModal isOpen={showActionModal} onClose={handleCloseModals} selectedPlayer={selectedPlayer} onActionSelect={handleActionSelect} />

			<EndMatchModal isOpen={showEndMatchModal} onClose={() => setShowEndMatchModal(false)} onSubmit={handleEndMatchSubmit} isLoading={isSaving} />
		</div>
	);
}
