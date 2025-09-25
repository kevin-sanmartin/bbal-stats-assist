import { TUpdateActionInput, TCreateActionInput, TAction } from "@/types/action";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export class ActionsClientService {
	private static instance: ActionsClientService;
	private readonly tableName = "actions";
	private readonly supabase = createBrowserSupabaseClient();

	private constructor() {}

	public static getInstance(): ActionsClientService {
		if (!ActionsClientService.instance) {
			ActionsClientService.instance = new ActionsClientService();
		}
		return ActionsClientService.instance;
	}

	public async createAction(actionData: TCreateActionInput): Promise<TAction> {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.insert({
				...actionData,
			})
			.select()
			.single();

		if (error) {
			console.error("Erreur lors de la création de l'action:", error);
			throw new Error(`Impossible de sauvegarder l'action: ${error.message}`);
		}

		return data;
	}

	public async getGameActions(gameId: string): Promise<TAction[]> {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("*")
			.eq("game_id", gameId)
			.order("created_at", { ascending: true });

		if (error) {
			console.error("Erreur lors de la récupération des actions:", error);
			throw new Error(`Impossible de récupérer les actions: ${error.message}`);
		}

		return data || [];
	}

	public async getPlayerActions(playerId: string): Promise<TAction[]> {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.select("*")
			.eq("player_id", playerId)
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Erreur lors de la récupération des actions du joueur:", error);
			throw new Error(`Impossible de récupérer les actions du joueur: ${error.message}`);
		}

		return data || [];
	}

	public async updateAction(actionId: string, updates: TUpdateActionInput): Promise<TAction> {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.update(updates)
			.eq("id", actionId)
			.select()
			.single();

		if (error) {
			console.error("Erreur lors de la mise à jour de l'action:", error);
			throw new Error(`Impossible de mettre à jour l'action: ${error.message}`);
		}

		return data;
	}

	public async deleteAction(actionId: string): Promise<void> {
		const { error } = await this.supabase.from(this.tableName).delete().eq("id", actionId);

		if (error) {
			console.error("Erreur lors de la suppression de l'action:", error);
			throw new Error(`Impossible de supprimer l'action: ${error.message}`);
		}
	}

	public async createMultipleActions(actionsData: TCreateActionInput[]): Promise<TAction[]> {
		const { data, error } = await this.supabase
			.from(this.tableName)
			.insert(actionsData)
			.select();

		if (error) {
			console.error("Erreur lors de la création multiple d'actions:", error);
			throw new Error(`Impossible de sauvegarder les actions: ${error.message}`);
		}

		return data || [];
	}
}