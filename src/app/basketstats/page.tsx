import BasketStats from "@/components/pages/BasketStats";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
	title: "BasketStats Assistant - Showcase",
	description: "Showcase des composants spécialisés pour le suivi des statistiques basketball",
};

export default function Page() {
	return <BasketStats />;
}