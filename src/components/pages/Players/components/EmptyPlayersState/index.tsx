import Button from "@/components/elements/Button";
import classes from "./classes.module.scss";

interface EmptyPlayersStateProps {
	onAddPlayer: () => void;
}

export default function EmptyPlayersState({ onAddPlayer }: EmptyPlayersStateProps) {
	return (
		<div className={classes.emptyState}>
			<div className={classes.icon}>🏀</div>
			<h2 className={classes.title}>Aucun joueur dans cette équipe</h2>
			<p className={classes.description}>
				Commencez par ajouter des joueurs à votre équipe pour pouvoir saisir des statistiques et suivre leurs performances.
			</p>
			<Button onClick={onAddPlayer} leftIcon="+" size="lg">
				Ajouter le premier joueur
			</Button>
		</div>
	);
}