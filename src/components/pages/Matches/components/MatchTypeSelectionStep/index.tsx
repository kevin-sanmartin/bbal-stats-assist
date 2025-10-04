"use client";

import Button from "@/components/elements/Button";
import { FiActivity, FiEdit } from "react-icons/fi";
import { EMatchType } from "@/enums/match";
import classes from "./classes.module.scss";

interface MatchTypeSelectionStepProps {
	onMatchTypeSelect: (matchType: EMatchType) => void;
}

export default function MatchTypeSelectionStep({ onMatchTypeSelect }: MatchTypeSelectionStepProps) {
	return (
		<div className={classes.root}>
			<div className={classes.typesList}>
				<div className={classes.typeCard} onClick={() => onMatchTypeSelect(EMatchType.LIVE)}>
					<div className={classes.typeIcon}>
						<FiActivity />
					</div>
					<h3 className={classes.typeTitle}>Match en direct</h3>
					<p className={classes.typeDescription}>Saisissez les statistiques en temps réel pendant le match</p>
					<div className={classes.typeAction}>
						<Button fullWidth>Commencer →</Button>
					</div>
				</div>

				<div className={`${classes.typeCard} ${classes.disabled}`}>
					<div className={classes.comingSoonBadge}>Bientôt disponible</div>
					<div className={classes.typeIcon}>
						<FiEdit />
					</div>
					<h3 className={classes.typeTitle}>Saisie manuelle</h3>
					<p className={classes.typeDescription}>Entrez les statistiques après le match via un formulaire</p>
					<div className={classes.typeAction}>
						<Button fullWidth disabled>
							Indisponible
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
