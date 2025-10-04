import Modal from "@/components/materials/Modal";
import Button from "@/components/elements/Button";
import classes from "./classes.module.scss";

interface DeletePlayerConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	playerName: string;
	loading?: boolean;
}

export default function DeletePlayerConfirmModal({ isOpen, onClose, onConfirm, playerName, loading = false }: DeletePlayerConfirmModalProps) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Supprimer le joueur">
			<div className={classes.content}>
				<p className={classes.message}>
					Êtes-vous sûr de vouloir supprimer <strong>{playerName}</strong> de l'équipe ?
				</p>
				<p className={classes.warning}>Cette action est irréversible.</p>

				<div className={classes.actions}>
					<Button variant="outlined" onClick={onClose} disabled={loading}>
						Annuler
					</Button>
					<Button color="danger" onClick={onConfirm} loading={loading}>
						Supprimer
					</Button>
				</div>
			</div>
		</Modal>
	);
}
