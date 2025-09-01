import Components from "@/components/pages/Components";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
	title: "Bbal Stats Assist App - Components",
	description: "Welcome to the Bbal Stats Assist App components page",
};

// Respect the coding style, inside /app it's always "Page" and import <*YourPage*> from "@/components/pages"
export default function Page() {
	return <Components />;
}
