import Matches from "@/components/pages/Matches";
import { TeamsServerService } from "@/services/supabase/teams/ServerService";

const teamsService = TeamsServerService.getInstance();

export default async function Page() {
	const initialTeams = await teamsService.getUserTeams();

	return <Matches initialTeams={initialTeams} />;
}