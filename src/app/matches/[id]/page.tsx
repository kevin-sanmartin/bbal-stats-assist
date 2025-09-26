import { notFound } from "next/navigation";
import MatchDetails from "@/components/pages/MatchDetails";
import { getGameById } from "@/services/supabase/games/ServerService";
import { getActionsByGameId } from "@/services/supabase/actions/ServerService";
import { getPlayersByTeamId } from "@/services/supabase/players/ServerService";
import { getTeamById } from "@/services/supabase/teams/ServerService";

interface MatchDetailsPageProps {
	params: Promise<{ id: string }>;
}

export default async function MatchDetailsPage({ params }: MatchDetailsPageProps) {
	const { id } = await params;

	try {
		// Récupérer les données du match
		const game = await getGameById(id);
		if (!game) {
			notFound();
		}

		// Récupérer l'équipe
		const team = await getTeamById(game.team_id);
		if (!team) {
			notFound();
		}

		// Récupérer les actions et les joueurs en parallèle
		const [actions, players] = await Promise.all([
			getActionsByGameId(id),
			getPlayersByTeamId(game.team_id)
		]);

		return (
			<MatchDetails
				game={game}
				team={team}
				actions={actions}
				players={players}
			/>
		);
	} catch (error) {
		console.error("Error loading match details:", error);
		notFound();
	}
}