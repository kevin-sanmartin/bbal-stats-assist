import "@/themes";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { cookies } from "next/headers";
import Header from "@/components/materials/Header";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: "Bbal Stats Assist App",
	description: "A Next.js application",
};

async function getServerTheme(): Promise<"light" | "dark"> {
	const cookieStore = await cookies();
	const theme = cookieStore.get("theme")?.value;
	return theme === "light" || theme === "dark" ? theme : "light";
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const theme = await getServerTheme();

	return (
		<html lang="en" className={roboto.className} data-theme={theme}>
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}
