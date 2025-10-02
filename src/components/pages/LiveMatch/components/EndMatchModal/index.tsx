import { useState } from "react";
import Modal from "@/components/materials/Modal";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Select from "@/components/elements/Select";
import classes from "./classes.module.scss";

interface EndMatchModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: { opponent: string; ourScore: number; opponentScore: number; location: "HOME" | "AWAY" }) => void;
	isLoading?: boolean;
}

export default function EndMatchModal({ isOpen, onClose, onSubmit, isLoading = false }: EndMatchModalProps) {
	const [formData, setFormData] = useState({
		opponent: "",
		ourScore: 0,
		opponentScore: 0,
		location: "HOME" as "HOME" | "AWAY",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleInputChange = (field: string, value: string | number) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));

		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({
				...prev,
				[field]: "",
			}));
		}
	};

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.opponent.trim()) {
			newErrors.opponent = "Le nom de l'équipe adverse est requis";
		}

		if (formData.ourScore < 0) {
			newErrors.ourScore = "Le score ne peut pas être négatif";
		}

		if (formData.opponentScore < 0) {
			newErrors.opponentScore = "Le score ne peut pas être négatif";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			onSubmit(formData);
		}
	};

	const handleClose = () => {
		if (!isLoading) {
			onClose();
			// Reset form
			setFormData({
				opponent: "",
				ourScore: 0,
				opponentScore: 0,
				location: "HOME",
			});
			setErrors({});
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} title="Finaliser le match" size="md">
			<form onSubmit={handleSubmit} className={classes.form}>
				<div className={classes.formGroup}>
					<label htmlFor="opponent" className={classes.label}>
						Équipe adverse *
					</label>
					<Input
						id="opponent"
						type="text"
						value={formData.opponent}
						onChange={(e) => handleInputChange("opponent", e.target.value)}
						placeholder="Nom de l'équipe adverse"
						disabled={isLoading}
					/>
					{errors.opponent && <span className={classes.error}>{errors.opponent}</span>}
				</div>

				<div className={classes.scoresRow}>
					<div className={classes.formGroup}>
						<label htmlFor="ourScore" className={classes.label}>
							Notre score
						</label>
						<Input
							id="ourScore"
							type="number"
							min="0"
							value={formData.ourScore}
							onChange={(e) => handleInputChange("ourScore", parseInt(e.target.value) || 0)}
							disabled={isLoading}
						/>
						{errors.ourScore && <span className={classes.error}>{errors.ourScore}</span>}
					</div>

					<div className={classes.scoresSeparator}>-</div>

					<div className={classes.formGroup}>
						<label htmlFor="opponentScore" className={classes.label}>
							Score adverse
						</label>
						<Input
							id="opponentScore"
							type="number"
							min="0"
							value={formData.opponentScore}
							onChange={(e) => handleInputChange("opponentScore", parseInt(e.target.value) || 0)}
							disabled={isLoading}
						/>
						{errors.opponentScore && <span className={classes.error}>{errors.opponentScore}</span>}
					</div>
				</div>

				<div className={classes.formGroup}>
					<label htmlFor="location" className={classes.label}>
						Lieu du match
					</label>
					<Select
						value={formData.location}
						onChange={(e) => handleInputChange("location", e.target.value as "HOME" | "AWAY")}
						options={[
							{ value: "HOME", label: "Domicile" },
							{ value: "AWAY", label: "Extérieur" },
						]}
					/>
				</div>

				<div className={classes.actions}>
					<Button type="button" variant="ghost" onClick={handleClose} disabled={isLoading}>
						Annuler
					</Button>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? "Sauvegarde..." : "Finaliser le match"}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
