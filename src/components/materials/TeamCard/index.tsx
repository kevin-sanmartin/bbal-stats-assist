import Card from "@/components/elements/Card";
import classes from "./classes.module.scss";
import { FaBasketball } from "react-icons/fa6";
import Badge from "@/components/elements/Badge";
import Button from "@/components/elements/Button";
import { useRouter } from "next/navigation";
import { TTeamWithPlayers } from "@/types/team";
import { MdHistory } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

type IProps = {
	team: TTeamWithPlayers;
};

export default function TeamCard({ team }: IProps) {
	const router = useRouter();

	return (
		<Card key={team.id} className={classes.teamCard} hoverable onClick={() => router.push(`/teams/${team.id}`)}>
			<div className={classes.teamHeader}>
				<div className={classes.teamTitleContainer}>
					<FaBasketball size={30} className={classes.teamIcon} />
					<div className={classes.teamTitle}>
						<h3>{team.name}</h3>
						<p>
							{team.players.length} joueur{team.players.length > 1 ? "s" : ""}
						</p>
					</div>
				</div>
				<Badge variant={getCategoryColor(team.category)}>{team.category}</Badge>
			</div>
		</Card>
	);
}

function getCategoryColor(category: string) {
	switch (category) {
		case "U13":
			return "success";
		case "U15":
			return "info";
		case "U18":
			return "warning";
		case "SENIOR":
			return "primary";
		default:
			return "default";
	}
}
