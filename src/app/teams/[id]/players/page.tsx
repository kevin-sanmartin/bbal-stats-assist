import { redirect } from "next/navigation";
import { TeamsServerService } from "@/services/supabase/teams/ServerService";
import Players from "@/components/pages/Players";

interface PlayersPageProps {
	params: Promise<{
		id: string;
	}>;
}

const teamsService = TeamsServerService.getInstance();

export default async function PlayersPage({ params }: PlayersPageProps) {
	const { id } = await params;
	const team = await teamsService.getTeamById(id);

	if (!team) {
		redirect("/teams");
	}

	return <Players teamId={id} />;
}
