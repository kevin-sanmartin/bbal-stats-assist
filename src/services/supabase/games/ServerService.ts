import { TGame, TGameWithRelations } from "@/types/game";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export interface UserStats {
	totalGames: number;
	totalWins: number;
	totalPlayers: number;
	winRate: number;
}

export interface TeamStats {
	totalGames: number;
	wins: number;
	losses: number;
	draws: number;
	winRate: number;
	avgPointsPerGame: number;
	totalPointsFor: number;
	totalPointsAgainst: number;
}

export class GamesServerService {
	private static instance: GamesServerService;
	private readonly gamesTableName = "games";
	private readonly playersTableName = "players";

	private constructor() {}

	public static getInstance(): GamesServerService {
		if (!GamesServerService.instance) {
			GamesServerService.instance = new GamesServerService();
		}
		return GamesServerService.instance;
	}

	public async getUserGames(): Promise<TGameWithRelations[]> {
		const supabase = await createServerSupabaseClient();
		const { data, error } = await supabase
			.from(this.gamesTableName)
			.select(
				`
				*,
				team:team_id (name, category),
				competition:competition_id (name)
			`,
			)
			.order("date", { ascending: false });

		if (error) {
			console.error("Erreur lors de la récupération des matchs:", error);
			return [];
		}

		return data || [];
	}

	public async getGameById(gameId: string): Promise<TGameWithRelations | null> {
		const supabase = await createServerSupabaseClient();
		const { data, error } = await supabase
			.from(this.gamesTableName)
			.select(
				`
				*,
				team:team_id (name, category),
				competition:competition_id (name)
			`,
			)
			.eq("id", gameId)
			.single();

		if (error) {
			console.error("Erreur lors de la récupération du match:", error);
			return null;
		}

		return data;
	}

	public async getUserStats(): Promise<UserStats> {
		const supabase = await createServerSupabaseClient();

		try {
			// Récupérer tous les matchs
			const { data: games, error: gamesError } = await supabase.from(this.gamesTableName).select("score, opponent_score");

			if (gamesError) {
				console.error("Erreur lors de la récupération des matchs:", gamesError);
				throw gamesError;
			}

			// Compter les joueurs
			const { count: playersCount, error: playersError } = await supabase.from(this.playersTableName).select("*", { count: "exact", head: true });

			if (playersError) {
				console.error("Erreur lors du comptage des joueurs:", playersError);
				throw playersError;
			}

			// Calculer les statistiques
			const totalGames = games?.length || 0;
			const totalWins = games?.filter((game) => game.score > game.opponent_score).length || 0;
			const totalPlayers = playersCount || 0;
			const winRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;

			return {
				totalGames,
				totalWins,
				totalPlayers,
				winRate,
			};
		} catch (error) {
			console.error("Erreur lors du calcul des statistiques:", error);
			return {
				totalGames: 0,
				totalWins: 0,
				totalPlayers: 0,
				winRate: 0,
			};
		}
	}

	public async getTeamGames(teamId: string): Promise<TGameWithRelations[]> {
		const supabase = await createServerSupabaseClient();
		const { data, error } = await supabase
			.from(this.gamesTableName)
			.select(
				`
				*,
				team:team_id (name, category),
				competition:competition_id (name)
			`,
			)
			.eq("team_id", teamId)
			.order("date", { ascending: false });

		if (error) {
			console.error("Erreur lors de la récupération des matchs de l'équipe:", error);
			return [];
		}

		return data || [];
	}

	public async getTeamGamesCount(teamId: string): Promise<number> {
		const supabase = await createServerSupabaseClient();
		const { count, error } = await supabase.from(this.gamesTableName).select("*", { count: "exact", head: true }).eq("team_id", teamId);

		if (error) {
			console.error("Erreur lors du comptage des matchs de l'équipe:", error);
			return 0;
		}

		return count || 0;
	}

	public async getTeamStats(teamId: string): Promise<TeamStats> {
		const supabase = await createServerSupabaseClient();

		try {
			const { data: games, error } = await supabase.from(this.gamesTableName).select("score, opponent_score").eq("team_id", teamId);

			if (error) {
				console.error("Erreur lors de la récupération des matchs pour les stats:", error);
				throw error;
			}

			const totalGames = games?.length || 0;
			const wins = games?.filter((game) => game.score > game.opponent_score).length || 0;
			const losses = games?.filter((game) => game.score < game.opponent_score).length || 0;
			const draws = games?.filter((game) => game.score === game.opponent_score).length || 0;
			const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
			const totalPointsFor = games?.reduce((sum, game) => sum + game.score, 0) || 0;
			const totalPointsAgainst = games?.reduce((sum, game) => sum + game.opponent_score, 0) || 0;
			const avgPointsPerGame = totalGames > 0 ? Math.round(totalPointsFor / totalGames) : 0;

			return {
				totalGames,
				wins,
				losses,
				draws,
				winRate,
				avgPointsPerGame,
				totalPointsFor,
				totalPointsAgainst,
			};
		} catch (error) {
			console.error("Erreur lors du calcul des statistiques de l'équipe:", error);
			return {
				totalGames: 0,
				wins: 0,
				losses: 0,
				draws: 0,
				winRate: 0,
				avgPointsPerGame: 0,
				totalPointsFor: 0,
				totalPointsAgainst: 0,
			};
		}
	}
}

// Exports pour l'utilisation dans les pages
const service = GamesServerService.getInstance();

export const getUserGames = () => service.getUserGames();
export const getGameById = (gameId: string) => service.getGameById(gameId);
export const getUserStats = () => service.getUserStats();
export const getTeamGames = (teamId: string) => service.getTeamGames(teamId);
export const getTeamGamesCount = (teamId: string) => service.getTeamGamesCount(teamId);
export const getTeamStats = (teamId: string) => service.getTeamStats(teamId);
