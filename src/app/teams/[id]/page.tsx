import { redirect } from "next/navigation";
import { TeamsServerService } from "@/services/supabase/teams/ServerService";
import { PlayersServerService } from "@/services/supabase/players/ServerService";
import { GamesServerService } from "@/services/supabase/games/ServerService";
import TeamManagement from "@/components/pages/TeamManagement";
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
		title: `${team.name} - BasketStats Assistant`,
		description: `Gestion de l'équipe ${team.name} (${team.category})`,
	};
}

interface TeamPageProps {
	params: Promise<{
		id: string;
	}>;
}

const teamsService = TeamsServerService.getInstance();
const playersService = PlayersServerService.getInstance();
const gamesService = GamesServerService.getInstance();

export default async function TeamPage({ params }: TeamPageProps) {
	const { id } = await params;
	const [team, initialPlayers, games, teamStats] = await Promise.all([
		teamsService.getTeamById(id),
		playersService.getPlayersByTeamId(id),
		gamesService.getTeamGames(id),
		gamesService.getTeamStats(id),
	]);

	if (!team) {
		redirect("/");
	}

	return <TeamManagement team={team} initialPlayers={initialPlayers} games={games} teamStats={teamStats} />;
}
