"use client";

import Modal from "@/components/materials/Modal";
import Button from "@/components/elements/Button";
import classes from "./classes.module.scss";

interface DeleteConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	teamName: string;
	loading?: boolean;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, teamName, loading = false }: DeleteConfirmModalProps) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Supprimer l'équipe" size="sm">
			<div className={classes.content}>
				<p className={classes.message}>
					Êtes-vous sûr de vouloir supprimer l'équipe <strong>"{teamName}"</strong> ?
				</p>
				<p className={classes.warning}>Cette action est irréversible.</p>

				<div className={classes.actions}>
					<Button type="button" variant="outlined" onClick={onClose} disabled={loading}>
						Annuler
					</Button>
					<Button type="button" color="danger" onClick={onConfirm} loading={loading}>
						Supprimer
					</Button>
				</div>
			</div>
		</Modal>
	);
}
