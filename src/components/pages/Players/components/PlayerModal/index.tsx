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
};

export default function PlayerModal({ isOpen, onClose, onSubmit, title, initialData }: PlayerModalProps) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		number: "" as number | "",
		position: EPlayerPosition.PG,
	});

	const resetForm = () => {
		setFormData({
			name: "",
			number: "",
			position: EPlayerPosition.PG,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		if (!formData.name.trim()) return;
		const numberValue = typeof formData.number === "number" ? formData.number : parseInt(formData.number);
		if (isNaN(numberValue) || numberValue < 0 || numberValue > 99) {
			setError("Le numéro de maillot doit être entre 0 et 99");
			return;
		}
		setLoading(true);

		onSubmit({
			name: formData.name.trim(),
			number: numberValue,
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
		setError("");
	};

	const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setFormData({ ...formData, number: value === "" ? "" : parseInt(value) });
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
				<Input
					label="Nom du joueur"
					placeholder="Ex: Michael Jordan"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					fullWidth
				/>

				<Input label="Numéro de maillot" type="number" min="0" max="99" value={formData.number.toString()} onChange={handleNumberChange} fullWidth />

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

				{error && <p className={classes.error}>{error}</p>}

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
