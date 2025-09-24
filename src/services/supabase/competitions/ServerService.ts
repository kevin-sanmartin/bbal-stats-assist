import { TCompetition } from "@/types/competition";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export class CompetitionsServerService {
	private static instance: CompetitionsServerService;
	private readonly tableName = "competitions";

	private constructor() {}

	public static getInstance(): CompetitionsServerService {
		if (!CompetitionsServerService.instance) {
			CompetitionsServerService.instance = new CompetitionsServerService();
		}
		return CompetitionsServerService.instance;
	}

	public async getCompetitionsByTeamId(teamId: string): Promise<TCompetition[]> {
		const supabase = await createServerSupabaseClient();
		const { data, error } = await supabase.from(this.tableName).select("*").eq("team_id", teamId).order("created_at", { ascending: false });

		if (error) {
			console.error("Erreur lors de la récupération des compétitions:", error);
			throw new Error(`Impossible de récupérer les compétitions: ${error.message}`);
		}

		return data || [];
	}
}