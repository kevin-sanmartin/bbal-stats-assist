"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/elements/Button";
import Card from "@/components/elements/Card";
import { TMatchFlow } from "@/types/match";
import { TCompetition } from "@/types/competition";
import { TTeam } from "@/types/team";
import { EMatchType } from "@/enums/match";
import { CompetitionsClientService } from "@/services/supabase/competitions/ClientService";
import TeamSelectionStep from "./components/TeamSelectionStep";
import CompetitionSelectionStep from "./components/CompetitionSelectionStep";
import MatchTypeSelectionStep from "./components/MatchTypeSelectionStep";
import classes from "./classes.module.scss";

interface MatchesProps {
	initialTeams: TTeam[];
}

export default function Matches({ initialTeams }: MatchesProps) {
	const router = useRouter();
	const [matchFlow, setMatchFlow] = useState<TMatchFlow>({
		selectedTeam: null,
		selectedCompetition: null,
		matchType: null,
	});
	const [currentStep, setCurrentStep] = useState<"team" | "competition" | "match-type">("team");
	const [competitions, setCompetitions] = useState<TCompetition[]>([]);
	const [isLoadingCompetitions, setIsLoadingCompetitions] = useState(false);

	const competitionsService = CompetitionsClientService.getInstance();

	const handleTeamSelect = async (teamId: string) => {
		setMatchFlow((prev) => ({ ...prev, selectedTeam: teamId }));

		// Fetch competitions for this team
		setIsLoadingCompetitions(true);
		try {
			const teamCompetitions = await competitionsService.getCompetitionsByTeamId(teamId);
			setCompetitions(teamCompetitions);
		} catch (error) {
			console.error('Erreur lors du chargement des compétitions:', error);
			setCompetitions([]);
		} finally {
			setIsLoadingCompetitions(false);
		}

		setCurrentStep("competition");
	};

	const handleCompetitionSelect = (competitionId: string | null) => {
		setMatchFlow((prev) => ({ ...prev, selectedCompetition: competitionId }));
		setCurrentStep("match-type");
	};

	const handleMatchTypeSelect = (matchType: EMatchType) => {
		const finalFlow = { ...matchFlow, matchType };

		// Redirection vers la page de match appropriée
		const queryParams = new URLSearchParams({
			team: finalFlow.selectedTeam!,
			type: matchType,
			...(finalFlow.selectedCompetition && { competition: finalFlow.selectedCompetition }),
		});

		if (matchType === EMatchType.LIVE) {
			router.push(`/matches/live?${queryParams.toString()}`);
		} else {
			router.push(`/matches/manual?${queryParams.toString()}`);
		}
	};

	const handleBack = () => {
		if (currentStep === "competition") {
			setCurrentStep("team");
			setMatchFlow((prev) => ({ ...prev, selectedCompetition: null }));
		} else if (currentStep === "match-type") {
			setCurrentStep("competition");
			setMatchFlow((prev) => ({ ...prev, matchType: null }));
		}
	};

	const getStepTitle = () => {
		switch (currentStep) {
			case "team":
				return "Sélectionnez votre équipe";
			case "competition":
				return "Choisissez une compétition (optionnel)";
			case "match-type":
				return "Type de match";
			default:
				return "";
		}
	};

	const getStepSubtitle = () => {
		switch (currentStep) {
			case "team":
				return "Choisissez l'équipe pour laquelle vous voulez créer un match";
			case "competition":
				return "Associez ce match à une compétition ou laissez vide pour un match amical";
			case "match-type":
				return "Choisissez le mode de saisie des statistiques";
			default:
				return "";
		}
	};

	const getStepStatus = (step: string) => {
		const stepOrder = ["team", "competition", "match-type"];
		const currentIndex = stepOrder.indexOf(currentStep);
		const stepIndex = stepOrder.indexOf(step);

		if (stepIndex < currentIndex) return "completed";
		if (stepIndex === currentIndex) return "active";
		return "inactive";
	};

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<div className={classes.headerContent}>
					<h1 className={classes.title}>Nouveau match</h1>
					<p className={classes.subtitle}>Configurez votre match en 3 étapes</p>
				</div>
			</div>

			<div className={classes.content}>
				{/* Barre de progression */}
				<div className={classes.progressBar}>
					<div
						className={`${classes.progressStep} ${getStepStatus("team") === "active" ? classes.active : ""} ${
							getStepStatus("team") === "completed" ? classes.completed : ""
						}`}>
						<div className={classes.stepNumber}>1</div>
						<span>Équipe</span>
					</div>
					<div
						className={`${classes.progressStep} ${getStepStatus("competition") === "active" ? classes.active : ""} ${
							getStepStatus("competition") === "completed" ? classes.completed : ""
						}`}>
						<div className={classes.stepNumber}>2</div>
						<span>Compétition</span>
					</div>
					<div
						className={`${classes.progressStep} ${getStepStatus("match-type") === "active" ? classes.active : ""} ${
							getStepStatus("match-type") === "completed" ? classes.completed : ""
						}`}>
						<div className={classes.stepNumber}>3</div>
						<span>Type</span>
					</div>
				</div>

				<Card padding="lg">
					<div className={classes.stepHeader}>
						<h2 className={classes.stepTitle}>{getStepTitle()}</h2>
						<p className={classes.stepSubtitle}>{getStepSubtitle()}</p>
						{currentStep !== "team" && (
							<Button variant="secondary" size="sm" onClick={handleBack} className={classes.backButton}>
								← Retour
							</Button>
						)}
					</div>

					<div className={classes.stepContent}>
						{currentStep === "team" && <TeamSelectionStep onTeamSelect={handleTeamSelect} teams={initialTeams} />}
						{currentStep === "competition" && (
							<CompetitionSelectionStep
								onCompetitionSelect={handleCompetitionSelect}
								selectedTeamId={matchFlow.selectedTeam!}
								competitions={competitions}
								isLoading={isLoadingCompetitions}
							/>
						)}
						{currentStep === "match-type" && <MatchTypeSelectionStep onMatchTypeSelect={handleMatchTypeSelect} />}
					</div>
				</Card>
			</div>
		</div>
	);
}
