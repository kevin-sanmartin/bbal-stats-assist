import { TAction } from "@/types/action";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export class ActionsServerService {
	private static instance: ActionsServerService;
	private readonly tableName = "actions";

	private constructor() {}

	public static getInstance(): ActionsServerService {
		if (!ActionsServerService.instance) {
			ActionsServerService.instance = new ActionsServerService();
		}
		return ActionsServerService.instance;
	}

	public async getGameActions(gameId: string): Promise<TAction[]> {
		const supabase = await createServerSupabaseClient();
		const { data, error } = await supabase
			.from(this.tableName)
			.select("*")
			.eq("game_id", gameId)
			.order("created_at");

		if (error) {
			console.error("Erreur lors de la récupération des actions:", error);
			throw new Error(`Impossible de récupérer les actions: ${error.message}`);
		}

		return data || [];
	}

	public async getActionById(actionId: string): Promise<TAction | null> {
		const supabase = await createServerSupabaseClient();
		const { data, error } = await supabase
			.from(this.tableName)
			.select("*")
			.eq("id", actionId)
			.single();

		if (error) {
			console.error("Erreur lors de la récupération de l'action:", error);
			return null;
		}

		return data;
	}

	public async getPlayerActions(playerId: string): Promise<TAction[]> {
		const supabase = await createServerSupabaseClient();
		const { data, error } = await supabase
			.from(this.tableName)
			.select("*")
			.eq("player_id", playerId)
			.order("created_at");

		if (error) {
			console.error("Erreur lors de la récupération des actions du joueur:", error);
			throw new Error(`Impossible de récupérer les actions du joueur: ${error.message}`);
		}

		return data || [];
	}
}