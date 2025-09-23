import { useRouter } from "next/navigation";
import Button from "@/components/elements/Button";
import Badge from "@/components/elements/Badge";
import Table, { TableColumn } from "@/components/materials/Table";
import { TTeam } from "@/types/team";
import { ETeamCategory } from "@/enums/team";
import classes from "./classes.module.scss";

interface TeamTableProps {
	teams: TTeam[];
	onEdit: (team: TTeam) => void;
	onDelete: (team: TTeam) => void;
}

const categoryLabels: Record<ETeamCategory, string> = {
	[ETeamCategory.U13]: "U13",
	[ETeamCategory.U15]: "U15",
	[ETeamCategory.U18]: "U18",
	[ETeamCategory.SENIOR]: "Senior",
	[ETeamCategory.OTHER]: "Autre",
};

export default function TeamTable({ teams, onEdit, onDelete }: TeamTableProps) {
	const router = useRouter();

	const handleViewPlayers = (teamId: string) => {
		router.push(`/teams/${teamId}/players`);
	};

	const columns: TableColumn<TTeam>[] = [
		{
			key: "name",
			title: "Équipe",
			width: "40%",
			render: (value: string) => <span className={classes.teamName}>{value}</span>,
		},
		{
			key: "category",
			title: "Catégorie",
			width: "25%",
			render: (value: ETeamCategory) => <Badge variant="info">{categoryLabels[value]}</Badge>,
		},
		{
			key: "actions",
			title: "Actions",
			width: "35%",
			render: (_, team: TTeam) => (
				<div className={classes.actions}>
					<Button variant="primary" size="sm" fullWidth onClick={() => handleViewPlayers(team.id)}>
						Voir joueurs
					</Button>
					<Button variant="outline" size="sm" fullWidth onClick={() => onEdit(team)}>
						Modifier
					</Button>
					<Button variant="danger" size="sm" fullWidth onClick={() => onDelete(team)}>
						Supprimer
					</Button>
				</div>
			),
		},
	];

	return <Table columns={columns} data={teams} hoverable className={classes.teamTable} />;
}
