import LiveMatch from "@/components/pages/LiveMatch";
import { PlayersServerService } from "@/services/supabase/players/ServerService";
import { redirect } from "next/navigation";

const playersService = PlayersServerService.getInstance();

interface PageProps {
	searchParams: Promise<{ team?: string; competition?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
	const params = await searchParams;
	const teamId = params.team;
	const competitionId = params.competition;

	if (!teamId) {
		redirect("/teams");
	}

	const players = await playersService.getPlayersByTeamId(teamId);

	return <LiveMatch players={players} teamId={teamId} competitionId={competitionId} />;
}
