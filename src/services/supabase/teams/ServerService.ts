import { TTeam, TTeamWithPlayers } from "@/types/team";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export class TeamsServerService {
	private static instance: TeamsServerService;
	private readonly tableName = "teams";

	private constructor() {}

	public static getInstance(): TeamsServerService {
		if (!TeamsServerService.instance) {
			TeamsServerService.instance = new TeamsServerService();
		}
		return TeamsServerService.instance;
	}

	public async getUserTeams(): Promise<TTeamWithPlayers[]> {
		const supabase = await createServerSupabaseClient();
		const { data, error } = await supabase.from(this.tableName).select("*, players:players(id, name)").order("created_at");

		if (error) {
			console.error("Erreur lors de la récupération des équipes:", error);
			throw new Error(`Impossible de récupérer les équipes: ${error.message}`);
		}

		return data || [];
	}

	public async getTeamById(teamId: string): Promise<TTeam | null> {
		const supabase = await createServerSupabaseClient();
		const { data, error } = await supabase.from(this.tableName).select("*").eq("id", teamId).single();

		if (error) {
			console.error("Erreur lors de la récupération de l'équipe:", error);
			return null;
		}

		return data;
	}
}

// Exports pour l'utilisation dans les pages
const service = TeamsServerService.getInstance();

export const getUserTeams = () => service.getUserTeams();
export const getTeamById = (teamId: string) => service.getTeamById(teamId);
