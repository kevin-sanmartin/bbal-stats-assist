import Teams from "@/components/pages/Teams";
import { TeamsServerService } from "@/services/supabase/teams/ServerService";

const teamsService = TeamsServerService.getInstance();

export default async function Page() {
	const initialTeams = await teamsService.getUserTeams();
	return <Teams initialTeams={initialTeams} />;
}
