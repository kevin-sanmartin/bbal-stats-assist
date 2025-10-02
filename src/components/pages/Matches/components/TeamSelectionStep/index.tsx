"use client";

import { useState } from "react";
import Button from "@/components/elements/Button";
import Badge from "@/components/elements/Badge";
import Card from "@/components/elements/Card";
import Alert from "@/components/materials/Alert";
import { TTeam } from "@/types/team";
import classes from "./classes.module.scss";

interface TeamSelectionStepProps {
	onTeamSelect: (teamId: string) => void;
	teams: TTeam[];
}

export default function TeamSelectionStep({ onTeamSelect, teams }: TeamSelectionStepProps) {
	const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

	const handleTeamClick = (teamId: string) => {
		setSelectedTeam(teamId);
	};

	const handleContinue = () => {
		if (selectedTeam) {
			onTeamSelect(selectedTeam);
		}
	};

	if (teams.length === 0) {
		return (
			<Alert variant="warning" title="Aucune équipe trouvée">
				<p>Vous devez d'abord créer une équipe pour pouvoir créer un match.</p>
				<Button onClick={() => (window.location.href = "/teams")}>Créer une équipe</Button>
			</Alert>
		);
	}

	return (
		<div className={classes.root}>
			<div className={classes.teamsList}>
				{teams.map((team) => (
					<Card
						key={team.id}
						padding="md"
						hoverable
						className={`${classes.teamCard} ${selectedTeam === team.id ? classes.selected : ""}`}
						onClick={() => handleTeamClick(team.id)}>
						<div className={classes.teamInfo}>
							<h3 className={classes.teamName}>{team.name}</h3>
							<Badge variant="info" size="md">
								{team.category}
							</Badge>
						</div>
					</Card>
				))}
			</div>

			<div className={classes.actions}>
				<Button onClick={handleContinue} disabled={!selectedTeam}>
					Continuer
				</Button>
			</div>
		</div>
	);
}
