import { TCreateGameInput, TGame } from "@/types/game";
import { TCreateActionInput } from "@/types/action";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export class GamesClientService {
	private static instance: GamesClientService;
	private readonly gamesTableName = "games";
	private readonly actionsTableName = "actions";

	private constructor() {}

	public static getInstance(): GamesClientService {
		if (!GamesClientService.instance) {
			GamesClientService.instance = new GamesClientService();
		}
		return GamesClientService.instance;
	}

	public async createGameWithActions(
		gameData: TCreateGameInput,
		actions: TCreateActionInput[]
	): Promise<{ game: TGame; actionsCreated: number }> {
		const supabase = createBrowserSupabaseClient();

		try {
			// 1. Créer le match
			const { data: game, error: gameError } = await supabase
				.from(this.gamesTableName)
				.insert(gameData)
				.select()
				.single();

			if (gameError) {
				console.error("Erreur lors de la création du match:", gameError);
				throw new Error(`Impossible de créer le match: ${gameError.message}`);
			}

			// 2. Créer toutes les actions avec l'ID du match
			if (actions.length > 0) {
				const actionsWithGameId = actions.map(action => ({
					...action,
					game_id: game.id
				}));

				const { error: actionsError } = await supabase
					.from(this.actionsTableName)
					.insert(actionsWithGameId);

				if (actionsError) {
					console.error("Erreur lors de la création des actions:", actionsError);
					// On pourrait décider de supprimer le match créé ici
					throw new Error(`Match créé mais erreur lors de la sauvegarde des actions: ${actionsError.message}`);
				}
			}

			return {
				game,
				actionsCreated: actions.length
			};
		} catch (error) {
			console.error("Erreur lors de la création du match complet:", error);
			throw error;
		}
	}
}