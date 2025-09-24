"use client";

import { useState, useEffect } from "react";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Select from "@/components/elements/Select";
import { CompetitionsClientService } from "@/services/supabase/competitions/ClientService";
import { TCompetition } from "@/types/competition";
import classes from "./classes.module.scss";

interface CompetitionSelectionStepProps {
	onCompetitionSelect: (competitionId: string | null) => void;
	selectedTeamId: string;
	competitions: TCompetition[];
	isLoading: boolean;
}

export default function CompetitionSelectionStep({ onCompetitionSelect, selectedTeamId, competitions, isLoading }: CompetitionSelectionStepProps) {
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [showCompetitionsList, setShowCompetitionsList] = useState(false);
	const [newCompetitionName, setNewCompetitionName] = useState("");
	const [isCreating, setIsCreating] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const competitionsService = CompetitionsClientService.getInstance();

	const handleFriendlyMatch = () => {
		onCompetitionSelect(null);
	};

	const handleSelectCompetition = (competitionId: string) => {
		onCompetitionSelect(competitionId);
	};

	const handleCreateCompetition = async () => {
		if (!newCompetitionName.trim()) return;

		setError(null);
		setIsCreating(true);

		try {
			const competition = await competitionsService.createCompetition({
				name: newCompetitionName.trim(),
				team_id: selectedTeamId
			});
			onCompetitionSelect(competition.id);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erreur lors de la création");
			setIsCreating(false);
		}
	};

	const resetForms = () => {
		setShowCreateForm(false);
		setShowCompetitionsList(false);
		setNewCompetitionName("");
		setError(null);
	};

	if (isLoading) {
		return (
			<div className={classes.loading}>
				Chargement...
			</div>
		);
	}

	return (
		<div className={classes.root}>
			{!showCreateForm && !showCompetitionsList && (
				<div className={classes.mainActions}>
					<Button
						variant="primary"
						size="lg"
						onClick={handleFriendlyMatch}
						className={classes.actionButton}
					>
						🏀 Match amical
					</Button>

					{competitions.length > 0 && (
						<Button
							variant="secondary"
							size="lg"
							onClick={() => setShowCompetitionsList(true)}
							className={classes.actionButton}
						>
							🏆 Compétition ({competitions.length})
						</Button>
					)}

					<Button
						variant="outline"
						size="lg"
						onClick={() => setShowCreateForm(true)}
						className={classes.actionButton}
					>
						+ Nouvelle compétition
					</Button>
				</div>
			)}

			{showCompetitionsList && (
				<div className={classes.competitionsList}>
					<div className={classes.header}>
						<h3 className={classes.title}>Choisir une compétition</h3>
						<Button variant="ghost" size="sm" onClick={resetForms}>✕</Button>
					</div>

					<div className={classes.competitions}>
						{competitions.map((competition) => (
							<Button
								key={competition.id}
								variant="ghost"
								size="md"
								onClick={() => handleSelectCompetition(competition.id)}
								className={classes.competitionButton}
							>
								{competition.name}
							</Button>
						))}
					</div>
				</div>
			)}

			{showCreateForm && (
				<div className={classes.createForm}>
					<div className={classes.header}>
						<h3 className={classes.title}>Nouvelle compétition</h3>
						<Button variant="ghost" size="sm" onClick={resetForms}>✕</Button>
					</div>

					<Input
						placeholder="Nom de la compétition"
						value={newCompetitionName}
						onChange={(e) => setNewCompetitionName(e.target.value)}
						disabled={isCreating}
						onKeyPress={(e) => e.key === 'Enter' && handleCreateCompetition()}
					/>

					<Button
						variant="primary"
						size="md"
						onClick={handleCreateCompetition}
						disabled={!newCompetitionName.trim() || isCreating}
						loading={isCreating}
					>
						Créer et utiliser
					</Button>
				</div>
			)}

			{error && (
				<div className={classes.error}>
					{error}
				</div>
			)}
		</div>
	);
}
