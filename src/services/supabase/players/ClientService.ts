import { TUpdatePlayerInput, TCreatePlayerInput, TPlayer } from "@/types/player";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export class PlayersClientService {
	private static instance: PlayersClientService;
	private readonly tableName = "players";
	private readonly supabase = createBrowserSupabaseClient();

	private constructor() {}

	public static getInstance(): PlayersClientService {
		if (!PlayersClientService.instance) {
			PlayersClientService.instance = new PlayersClientService();
		}
		return PlayersClientService.instance;
	}

	public async createPlayer(playerData: TCreatePlayerInput): Promise<TPlayer> {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.insert({
				...playerData,
			})
			.select()
			.single();

		if (error) {
			console.error("Erreur lors de la création du joueur:", error);
			throw new Error(`Impossible de sauvegarder le joueur: ${error.message}`);
		}

		return data;
	}

	public async getPlayersByTeamId(teamId: string): Promise<TPlayer[]> {
		const { data, error } = await this.supabase.from(this.tableName).select("*").eq("team_id", teamId).order("number", { ascending: true });

		if (error) {
			console.error("Erreur lors de la récupération des joueurs:", error);
			throw new Error(`Impossible de récupérer les joueurs: ${error.message}`);
		}

		return data || [];
	}

	public async updatePlayer(playerId: string, updates: TUpdatePlayerInput): Promise<TPlayer> {
		const { data, error } = await this.supabase.from(this.tableName).update(updates).eq("id", playerId).select().single();

		if (error) {
			console.error("Erreur lors de la mise à jour du joueur:", error);
			throw new Error(`Impossible de mettre à jour le joueur: ${error.message}`);
		}

		return data;
	}

	public async deletePlayer(playerId: string): Promise<void> {
		const { error } = await this.supabase.from(this.tableName).delete().eq("id", playerId);

		if (error) {
			console.error("Erreur lors de la suppression du joueur:", error);
			throw new Error(`Impossible de supprimer le joueur: ${error.message}`);
		}
	}

	public async checkJerseyNumber(teamId: string, number: number, excludePlayerId?: string): Promise<boolean> {
		let query = this.supabase.from(this.tableName).select("id").eq("team_id", teamId).eq("number", number);

		if (excludePlayerId) {
			query = query.neq("id", excludePlayerId);
		}

		const { data, error } = await query;

		if (error) {
			console.error("Erreur lors de la vérification du numéro:", error);
			return false;
		}

		return (data?.length || 0) > 0;
	}
}
