import { redirect } from "next/navigation";
import { TeamsServerService } from "@/services/supabase/teams/ServerService";
import { PlayersServerService } from "@/services/supabase/players/ServerService";
import Players from "@/components/pages/Players";

interface PlayersPageProps {
	params: Promise<{
		id: string;
	}>;
}

const teamsService = TeamsServerService.getInstance();
const playersService = PlayersServerService.getInstance();

export default async function PlayersPage({ params }: PlayersPageProps) {
	const { id } = await params;
	const [team, initialPlayers] = await Promise.all([
		teamsService.getTeamById(id),
		playersService.getPlayersByTeamId(id)
	]);

	if (!team) {
		redirect("/teams");
	}

	return <Players teamId={id} initialPlayers={initialPlayers} teamName={team.name} />;
}
