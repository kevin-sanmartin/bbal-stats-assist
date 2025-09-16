import ResetPassword from "@/components/pages/ResetPassword";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
	title: "Bbal Stats Assist App - Réinitialiser le mot de passe",
	description: "Définissez votre nouveau mot de passe",
};

export default function Page() {
	return <ResetPassword />;
}