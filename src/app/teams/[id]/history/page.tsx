import { notFound } from "next/navigation";
import TeamHistory from "@/components/pages/TeamHistory";
import { TeamsServerService } from "@/services/supabase/teams/ServerService";
import { GamesServerService } from "@/services/supabase/games/ServerService";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
	const teamsService = TeamsServerService.getInstance();
	const { id } = await params;
	const team = await teamsService.getTeamById(id);

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

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const [team, games] = await Promise.all([
			teamsService.getTeamById(id),
			gamesService.getTeamGames(id),
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