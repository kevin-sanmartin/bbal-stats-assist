import { TTeam } from "@/types/team";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export class TeamsServerService {
	private readonly tableName = "teams";

	public async getUserTeams(): Promise<TTeam[]> {
		const supabase = await createServerSupabaseClient();
		const { data, error } = await supabase.from(this.tableName).select("*").order("created_at");

		if (error) {
			console.error("Erreur lors de la récupération des équipes:", error);
			throw new Error(`Impossible de récupérer les équipes: ${error.message}`);
		}

		return data || [];
	}
}
