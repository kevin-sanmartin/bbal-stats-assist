import Login from "@/components/pages/Login";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
	title: "Bbal Stats Assist App - Login",
	description: "Connectez-vous à votre compte",
};

export default function Page() {
	return <Login />;
}
