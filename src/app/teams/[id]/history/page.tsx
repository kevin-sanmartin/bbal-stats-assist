import { notFound } from "next/navigation";
import TeamHistory from "@/components/pages/TeamHistory";
import { TeamsServerService } from "@/services/supabase/teams/ServerService";
import { GamesServerService } from "@/services/supabase/games/ServerService";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	const teamsService = TeamsServerService.getInstance();
	const team = await teamsService.getTeamById(params.id);

	if (!team) {
		return {
			title: "Équipe non trouvée - BasketStats Assistant",
		};
	}

	return {
		title: `Historique ${team.name} - BasketStats Assistant`,
		description: `Historique des matchs de l'équipe ${team.name} (${team.category})`,
	};
}

const teamsService = TeamsServerService.getInstance();
const gamesService = GamesServerService.getInstance();

export default async function Page({ params }: { params: { id: string } }) {
	try {
		const [team, games] = await Promise.all([
			teamsService.getTeamById(params.id),
			gamesService.getTeamGames(params.id),
		]);

		if (!team) {
			notFound();
		}

		return <TeamHistory team={team} games={games} />;
	} catch (error) {
		console.error("Erreur lors du chargement de l'historique de l'équipe:", error);
		notFound();
	}
}