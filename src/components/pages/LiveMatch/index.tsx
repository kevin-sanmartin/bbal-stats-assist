"use client";

import { useSearchParams } from "next/navigation";
import Card from "@/components/elements/Card";
import Button from "@/components/elements/Button";
import classes from "./classes.module.scss";

export default function LiveMatch() {
	const searchParams = useSearchParams();
	const teamId = searchParams.get("team");
	const competitionId = searchParams.get("competition");
	const matchType = searchParams.get("type");

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Button
					variant="secondary"
					size="sm"
					onClick={() => window.history.back()}
				>
					← Retour
				</Button>
				<h1 className={classes.title}>Match en direct</h1>
			</div>

			<Card variant="elevated" className={classes.placeholderCard}>
				<div className={classes.placeholderContent}>
					<div className={classes.placeholderIcon}>🔴</div>
					<h2 className={classes.placeholderTitle}>Interface de match en direct</h2>
					<p className={classes.placeholderText}>Cette page contiendra :</p>
					<ul className={classes.featuresList}>
						<li>Le terrain de basket interactif</li>
						<li>La sélection des joueurs</li>
						<li>Le suivi du score en temps réel</li>
						<li>L'enregistrement des actions (tirs, passes, fautes, etc.)</li>
						<li>Le chronomètre du match</li>
					</ul>

					<div className={classes.debugInfo}>
						<h3>Paramètres reçus :</h3>
						<ul>
							<li><strong>Équipe :</strong> {teamId || "Non spécifiée"}</li>
							<li><strong>Compétition :</strong> {competitionId || "Aucune"}</li>
							<li><strong>Type :</strong> {matchType || "Non spécifié"}</li>
						</ul>
					</div>
				</div>
			</Card>
		</div>
	);
}