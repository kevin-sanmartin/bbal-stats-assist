import ForgotPassword from "@/components/pages/ForgotPassword";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
	title: "Bbal Stats Assist App - Mot de passe oublié",
	description: "Réinitialisez votre mot de passe",
};

export default function Page() {
	return <ForgotPassword />;
}