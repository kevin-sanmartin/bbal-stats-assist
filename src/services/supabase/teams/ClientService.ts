import { TUpdateTeamInput, TCreateTeamInput, TTeam } from "@/types/team";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export class TeamsClientService {
	private static instance: TeamsClientService;
	private readonly tableName = "teams";
	private readonly supabase = createBrowserSupabaseClient();

	private constructor() {}

	public static getInstance(): TeamsClientService {
		if (!TeamsClientService.instance) {
			TeamsClientService.instance = new TeamsClientService();
		}
		return TeamsClientService.instance;
	}

	public async createTeam(teamData: TCreateTeamInput): Promise<TTeam> {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.insert({
				...teamData,
			})
			.select()
			.single();

		if (error) {
			console.error("Erreur lors de la création de l'équipe:", error);
			throw new Error(`Impossible de sauvegarder l'équipe: ${error.message}`);
		}

		return data;
	}

	public async getUserTeams(): Promise<TTeam[]> {
		const { data, error } = await this.supabase.from(this.tableName).select("*").order("created_at", { ascending: false });

		if (error) {
			console.error("Erreur lors de la récupération des équipes:", error);
			throw new Error(`Impossible de récupérer les équipes: ${error.message}`);
		}

		return data || [];
	}

	public async updateTeam(teamId: string, updates: TUpdateTeamInput): Promise<TTeam> {
		const { data, error } = await this.supabase.from(this.tableName).update(updates).eq("id", teamId).select().single();

		if (error) {
			console.error("Erreur lors de la mise à jour de l'équipe:", error);
			throw new Error(`Impossible de mettre à jour l'équipe: ${error.message}`);
		}

		return data;
	}

	public async deleteTeam(teamId: string): Promise<void> {
		const { error } = await this.supabase.from(this.tableName).delete().eq("id", teamId);

		if (error) {
			console.error("Erreur lors de la suppression de l'équipe:", error);
			throw new Error(`Impossible de supprimer l'équipe: ${error.message}`);
		}
	}
}
