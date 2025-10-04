"use client";

import { TTeam } from "@/types/team";
import { TPlayer } from "@/types/player";
import { TGameWithRelations } from "@/types/game";
import { TeamStats } from "@/services/supabase/games/ServerService";
import classes from "./classes.module.scss";
import Tabs, { TabItem } from "@/components/materials/Tabs";
import TeamDetails from "./components/TeamDetails";
import Players from "./components/Players";
import TeamHistory from "./components/TeamHistory";

interface TeamManagementProps {
	team: TTeam;
	initialPlayers: TPlayer[];
	games: TGameWithRelations[];
	teamStats: TeamStats;
}

export default function TeamManagement({ team, initialPlayers, games, teamStats }: TeamManagementProps) {
	const tabs: TabItem[] = [
		{
			id: "team",
			label: "Équipe",
			content: <TeamDetails team={team} playersCount={initialPlayers.length} teamStats={teamStats} />,
		},
		{
			id: "players",
			label: "Joueurs",
			content: <Players teamId={team.id} initialPlayers={initialPlayers} teamName={team.name} />,
		},
		{
			id: "history",
			label: "Historique",
			content: <TeamHistory team={team} games={games} />,
		},
	];

	return (
		<div className={classes.root}>
			<Tabs items={tabs} defaultActiveTab="team" />
		</div>
	);
}
