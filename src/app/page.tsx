import Home from "@/components/pages/Home";
import { TeamsServerService } from "@/services/supabase/teams/ServerService";
import { GamesServerService } from "@/services/supabase/games/ServerService";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
	title: "Bbal Stats Assist App - Home",
	description: "Welcome to the Bbal Stats Assist App home page",
};

const teamsService = TeamsServerService.getInstance();
const gamesService = GamesServerService.getInstance();

// Respect the coding style, inside /app it's always "Page" and import <*YourPage*> from "@/components/pages"
export default async function Page() {
	const [initialTeams, initialGames, userStats] = await Promise.all([teamsService.getUserTeams(), gamesService.getUserGames(), gamesService.getUserStats()]);

	return <Home initialTeams={initialTeams} initialGames={initialGames} userStats={userStats} />;
}
