import Button from "@/components/elements/Button";
import Badge from "@/components/elements/Badge";
import Table, { TableColumn } from "@/components/materials/Table";
import { TPlayer } from "@/types/player";
import { EPlayerPosition } from "@/enums/player";
import classes from "./classes.module.scss";

interface PlayerTableProps {
	players: TPlayer[];
	onEdit: (player: TPlayer) => void;
	onDelete: (player: TPlayer) => void;
}

const positionLabels: Record<EPlayerPosition, string> = {
	[EPlayerPosition.PG]: "Meneur",
	[EPlayerPosition.SG]: "Arrière",
	[EPlayerPosition.SF]: "Ailier",
	[EPlayerPosition.PF]: "Ailier fort",
	[EPlayerPosition.C]: "Pivot",
	[EPlayerPosition.OTHER]: "Autre",
};

export default function PlayerTable({ players, onEdit, onDelete }: PlayerTableProps) {
	const columns: TableColumn<TPlayer>[] = [
		{
			key: "name",
			title: "Nom",
			width: "25%",
			render: (value: string) => <span className={classes.playerName}>{value}</span>,
		},
		{
			key: "number",
			title: "N°",
			width: "25%",
			render: (value: number) => <span className={classes.playerNumber}>#{value}</span>,
		},
		{
			key: "position",
			title: "Poste",
			width: "25%",
			render: (value: EPlayerPosition) => <Badge variant="info">{positionLabels[value]}</Badge>,
		},
		{
			key: "actions",
			title: "Actions",
			width: "25%",
			render: (_, player: TPlayer) => (
				<div className={classes.actions}>
					<Button variant="outline" size="sm" fullWidth onClick={() => onEdit(player)}>
						Modifier
					</Button>
					<Button variant="danger" size="sm" fullWidth onClick={() => onDelete(player)}>
						Supprimer
					</Button>
				</div>
			),
		},
	];

	return <Table columns={columns} data={players} hoverable className={classes.playerTable} />;
}
