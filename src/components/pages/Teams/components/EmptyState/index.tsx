import Button from '@/components/elements/Button';
import classes from './classes.module.scss';

interface EmptyStateProps {
	onCreateTeam: () => void;
}

export default function EmptyState({ onCreateTeam }: EmptyStateProps) {
	return (
		<div className={classes.emptyState}>
			<div className={classes.content}>
				<h3 className={classes.title}>Aucune équipe créée</h3>
				<p className={classes.description}>
					Commencez par créer votre première équipe pour gérer vos joueurs et statistiques
				</p>
				<Button onClick={onCreateTeam} leftIcon="+">
					Créer ma première équipe
				</Button>
			</div>
		</div>
	);
}