import { TPlayer } from "@/types/player";
import Modal from "@/components/materials/Modal";
import Button from "@/components/elements/Button";
import PlayerCard from "@/components/elements/PlayerCard";
import Input from "@/components/elements/Input";
import { useState, useMemo } from "react";
import classes from "./classes.module.scss";

interface PlayerSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	players: TPlayer[];
	onPlayerSelect: (player: TPlayer) => void;
	title?: string;
}

export default function PlayerSelectionModal({
	isOpen,
	onClose,
	players,
	onPlayerSelect,
	title = "Sélectionner le joueur"
}: PlayerSelectionModalProps) {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredPlayers = useMemo(() => {
		if (!searchTerm.trim()) return players;

		const term = searchTerm.toLowerCase().trim();
		return players.filter(player =>
			player.name.toLowerCase().includes(term) ||
			player.number.toString().includes(term) ||
			player.position.toLowerCase().includes(term)
		);
	}, [players, searchTerm]);

	const handlePlayerClick = (player: TPlayer) => {
		onPlayerSelect(player);
		setSearchTerm("");
	};

	const handleClose = () => {
		setSearchTerm("");
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} title={title} size="lg">
			<div className={classes.modalContent}>
				{players.length > 6 && (
					<div className={classes.searchSection}>
						<Input
							type="text"
							placeholder="Rechercher un joueur..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className={classes.searchInput}
						/>
					</div>
				)}

				{filteredPlayers.length > 0 ? (
					<div className={classes.playerGrid}>
						{filteredPlayers.map((player) => (
							<PlayerCard
								key={player.id}
								name={player.name}
								number={player.number}
								position={player.position as any}
								size="md"
								onClick={() => handlePlayerClick(player)}
								className={classes.selectablePlayerCard}
							/>
						))}
					</div>
				) : (
					<div className={classes.emptyState}>
						{searchTerm ? (
							<>
								<p>Aucun joueur trouvé pour "{searchTerm}"</p>
								<Button variant="secondary" onClick={() => setSearchTerm("")}>
									Effacer la recherche
								</Button>
							</>
						) : (
							<>
								<p>Aucun joueur disponible dans cette équipe</p>
								<Button variant="secondary" onClick={handleClose}>
									Fermer
								</Button>
							</>
						)}
					</div>
				)}
			</div>
		</Modal>
	);
}
