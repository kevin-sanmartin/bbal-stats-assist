"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/materials/Modal";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Select from "@/components/elements/Select";
import { ETeamCategory } from "@/enums/team";
import classes from "./classes.module.scss";

interface TeamModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: { name: string; category: ETeamCategory }) => Promise<void>;
	title: string;
	initialData?: {
		name: string;
		category: ETeamCategory;
	};
}

export default function TeamModal({ isOpen, onClose, onSubmit, title, initialData }: TeamModalProps) {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		category: ETeamCategory.SENIOR,
	});

	const resetForm = () => {
		setFormData({
			name: "",
			category: ETeamCategory.SENIOR,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formData.name.trim()) return;
		setLoading(true);

		onSubmit({
			name: formData.name.trim(),
			category: formData.category,
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
				category: initialData.category,
			});
		} else {
			resetForm();
		}
	}, [initialData, isOpen]);

	return (
		<Modal isOpen={isOpen} onClose={handleClose} title={title}>
			<form className={classes.form} onSubmit={handleSubmit}>
				<Input
					label="Nom de l'équipe"
					placeholder="Ex: Les Dragons U18"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					fullWidth
				/>

				<Select
					label="Catégorie"
					value={formData.category}
					onChange={(e) => setFormData({ ...formData, category: e.target.value as ETeamCategory })}
					options={Object.values(ETeamCategory).map((category) => ({
						value: category,
						label: category,
					}))}
					fullWidth
				/>

				<div className={classes.modalActions}>
					<Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
						Annuler
					</Button>
					<Button type="submit" disabled={!formData.name.trim()} loading={loading}>
						{initialData ? "Sauvegarder" : "Créer"}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
