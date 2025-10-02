"use client";

import { useState } from "react";
import Button from "@/components/elements/Button";
import Card from "@/components/elements/Card";
import { EMatchType } from "@/enums/match";
import classes from "./classes.module.scss";

interface MatchTypeSelectionStepProps {
	onMatchTypeSelect: (matchType: EMatchType) => void;
}

export default function MatchTypeSelectionStep({ onMatchTypeSelect }: MatchTypeSelectionStepProps) {
	const [selectedType, setSelectedType] = useState<EMatchType | null>(null);

	const handleTypeClick = (type: EMatchType) => {
		setSelectedType(type);
	};

	const handleContinue = () => {
		if (selectedType) {
			onMatchTypeSelect(selectedType);
		}
	};

	return (
		<div className={classes.root}>
			<div className={classes.typesList}>
				<Card
					hoverable
					className={`${classes.typeCard} ${selectedType === EMatchType.LIVE ? classes.selected : ""}`}
					onClick={() => handleTypeClick(EMatchType.LIVE)}>
					<div className={classes.typeHeader}>
						<h3 className={classes.typeTitle}>Match en direct</h3>
						<div className={classes.typeIcon}>🔴</div>
					</div>
					<p className={classes.typeDescription}>Saisissez les statistiques en temps réel pendant le match</p>
				</Card>

				<Card variant="outlined" className={`${classes.typeCard} ${classes.disabled}`}>
					<div className={classes.typeHeader}>
						<h3 className={classes.typeTitle}>Saisie manuelle</h3>
						<div className={classes.typeIcon}>📝</div>
						<div className={classes.comingSoon}>Bientôt disponible</div>
					</div>
					<p className={classes.typeDescription}>Entrez les statistiques après le match via un formulaire</p>
				</Card>
			</div>

			<div className={classes.actions}>
				<Button onClick={handleContinue} disabled={!selectedType}>
					Commencer
				</Button>
			</div>
		</div>
	);
}
