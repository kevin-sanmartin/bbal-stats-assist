"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/materials/Modal";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Select from "@/components/elements/Select";
import { EPlayerPosition } from "@/enums/player";
import classes from "./classes.module.scss";

interface PlayerModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: { name: string; number: number; position: EPlayerPosition }) => Promise<void>;
	title: string;
	initialData?: {
		name: string;
		number: number;
		position: EPlayerPosition;
	};
}

const positionLabels: Record<EPlayerPosition, string> = {
	[EPlayerPosition.PG]: "Meneur (PG)",
	[EPlayerPosition.SG]: "Arrière (SG)",
	[EPlayerPosition.SF]: "Ailier (SF)",
	[EPlayerPosition.PF]: "Ailier fort (PF)",
	[EPlayerPosition.C]: "Pivot (C)",
	[EPlayerPosition.OTHER]: "Autre",
};

export default function PlayerModal({ isOpen, onClose, onSubmit, title, initialData }: PlayerModalProps) {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		number: 1,
		position: EPlayerPosition.PG,
	});

	const resetForm = () => {
		setFormData({
			name: "",
			number: 1,
			position: EPlayerPosition.PG,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formData.name.trim()) return;
		if (formData.number < 1 || formData.number > 99) return;
		setLoading(true);

		onSubmit({
			name: formData.name.trim(),
			number: formData.number,
			position: formData.position,
		})
			.then(() => {
				setLoading(false);
				onClose();
				resetForm();
			})
			.catch(() => {
				setLoading(false);
			});
	};

	const handleClose = () => {
		onClose();
		resetForm();
	};

	useEffect(() => {
		if (initialData) {
			setFormData({
				name: initialData.name,
				number: initialData.number,
				position: initialData.position,
			});
		} else {
			resetForm();
		}
	}, [initialData, isOpen]);

	return (
		<Modal isOpen={isOpen} onClose={handleClose} title={title}>
			<form className={classes.form} onSubmit={handleSubmit}>
				<Input label="Nom du joueur" placeholder="Ex: Jean Dupont" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} fullWidth />

				<Input
					label="Numéro de maillot"
					type="number"
					min="1"
					max="99"
					value={formData.number.toString()}
					onChange={(e) => setFormData({ ...formData, number: parseInt(e.target.value) || 1 })}
					fullWidth
				/>

				<Select
					label="Position"
					value={formData.position}
					onChange={(e) => setFormData({ ...formData, position: e.target.value as EPlayerPosition })}
					options={Object.values(EPlayerPosition).map((position) => ({
						value: position,
						label: positionLabels[position],
					}))}
					fullWidth
				/>

				<div className={classes.modalActions}>
					<Button type="button" variant="outlined" onClick={handleClose} disabled={loading}>
						Annuler
					</Button>
					<Button type="submit" disabled={!formData.name.trim()} loading={loading}>
						{initialData ? "Sauvegarder" : "Ajouter"}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
