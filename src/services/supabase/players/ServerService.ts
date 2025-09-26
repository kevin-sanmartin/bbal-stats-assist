import { TUpdatePlayerInput, TCreatePlayerInput, TPlayer } from "@/types/player";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export class PlayersServerService {
	private static instance: PlayersServerService;
	private readonly tableName = "players";

	private constructor() {}

	public static getInstance(): PlayersServerService {
		if (!PlayersServerService.instance) {
			PlayersServerService.instance = new PlayersServerService();
		}
		return PlayersServerService.instance;
	}

	public async getPlayersByTeamId(teamId: string): Promise<TPlayer[]> {
		const supabase = await createServerSupabaseClient();
		const { data, error } = await supabase.from(this.tableName).select("*").eq("team_id", teamId).order("number", { ascending: true });

		if (error) {
			console.error("Erreur lors de la récupération des joueurs:", error);
			throw new Error(`Impossible de récupérer les joueurs: ${error.message}`);
		}

		return data || [];
	}
}

// Exports pour l'utilisation dans les pages
const service = PlayersServerService.getInstance();

export const getPlayersByTeamId = (teamId: string) => service.getPlayersByTeamId(teamId);
