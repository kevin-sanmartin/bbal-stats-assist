import { TUpdateCompetitionInput, TCreateCompetitionInput, TCompetition } from "@/types/competition";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export class CompetitionsClientService {
	private static instance: CompetitionsClientService;
	private readonly tableName = "competitions";
	private readonly supabase = createBrowserSupabaseClient();

	private constructor() {}

	public static getInstance(): CompetitionsClientService {
		if (!CompetitionsClientService.instance) {
			CompetitionsClientService.instance = new CompetitionsClientService();
		}
		return CompetitionsClientService.instance;
	}

	public async createCompetition(competitionData: TCreateCompetitionInput): Promise<TCompetition> {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.insert({
				...competitionData,
			})
			.select()
			.single();

		if (error) {
			console.error("Erreur lors de la création de la compétition:", error);
			throw new Error(`Impossible de sauvegarder la compétition: ${error.message}`);
		}

		return data;
	}

	public async updateCompetition(competitionId: string, updates: TUpdateCompetitionInput): Promise<TCompetition> {
		const { data, error } = await this.supabase.from(this.tableName).update(updates).eq("id", competitionId).select().single();

		if (error) {
			console.error("Erreur lors de la mise à jour de la compétition:", error);
			throw new Error(`Impossible de mettre à jour la compétition: ${error.message}`);
		}

		return data;
	}

	public async deleteCompetition(competitionId: string): Promise<void> {
		const { error } = await this.supabase.from(this.tableName).delete().eq("id", competitionId);

		if (error) {
			console.error("Erreur lors de la suppression de la compétition:", error);
			throw new Error(`Impossible de supprimer la compétition: ${error.message}`);
		}
	}

	public async getCompetitionsByTeamId(teamId: string): Promise<TCompetition[]> {
		const { data, error } = await this.supabase.from(this.tableName).select("*").eq("team_id", teamId).order("created_at", { ascending: false });

		if (error) {
			console.error("Erreur lors de la récupération des compétitions:", error);
			throw new Error(`Impossible de récupérer les compétitions: ${error.message}`);
		}

		return data || [];
	}
}