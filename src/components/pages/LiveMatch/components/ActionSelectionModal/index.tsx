import { EActionType } from "@/enums/action";
import { TPlayer } from "@/types/player";
import Modal from "@/components/materials/Modal";
import Button from "@/components/elements/Button";
import classes from "./classes.module.scss";

interface ActionSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	selectedPlayer: TPlayer | null;
	onActionSelect: (actionType: EActionType) => void;
}

const ACTION_OPTIONS = [
	{ type: EActionType.THREE_PTS, label: "3 Points", icon: "3", color: "#22c55e" },
	{ type: EActionType.TWO_PTS, label: "2 Points", icon: "2", color: "#3b82f6" },
	{ type: EActionType.FREE_THROW, label: "Lancer franc", icon: "LF", color: "#f59e0b" },
	{ type: EActionType.REBOUND, label: "Rebond", icon: "R", color: "#8b5cf6" },
	{ type: EActionType.ASSIST, label: "Passe décisive", icon: "A", color: "#10b981" },
	{ type: EActionType.STEAL, label: "Interception", icon: "S", color: "#f97316" },
	{ type: EActionType.FOUL, label: "Faute", icon: "F", color: "#ef4444" },
];

export default function ActionSelectionModal({ isOpen, onClose, selectedPlayer, onActionSelect }: ActionSelectionModalProps) {
	const handleActionClick = (actionType: EActionType) => {
		onActionSelect(actionType);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={`Action pour ${selectedPlayer?.name || "Joueur"}`} size="md">
			<div className={classes.playerInfo}>
				{selectedPlayer && (
					<div className={classes.selectedPlayer}>
						<div className={classes.playerNumber}>#{selectedPlayer.number}</div>
						<div>
							<div className={classes.playerName}>{selectedPlayer.name}</div>
							<div className={classes.playerPosition}>{selectedPlayer.position}</div>
						</div>
					</div>
				)}
			</div>

			<div className={classes.actionGrid}>
				{ACTION_OPTIONS.map((action) => (
					<button
						key={action.type}
						className={classes.actionCard}
						onClick={() => handleActionClick(action.type)}
						style={{ "--action-color": action.color } as React.CSSProperties}>
						<div className={classes.actionIcon}>{action.icon}</div>
						<div className={classes.actionLabel}>{action.label}</div>
					</button>
				))}
			</div>

			<div className={classes.modalFooter}>
				<Button variant="ghost" onClick={onClose}>
					Annuler
				</Button>
			</div>
		</Modal>
	);
}
