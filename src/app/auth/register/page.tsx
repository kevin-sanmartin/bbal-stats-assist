import Register from "@/components/pages/Register";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
	title: "Bbal Stats Assist App - Register",
	description: "Créez votre compte gratuitement",
};

export default function Page() {
	return <Register />;
}
