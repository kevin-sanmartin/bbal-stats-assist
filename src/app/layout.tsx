import "@/themes";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { cookies } from "next/headers";
import Header from "@/components/materials/Header";
import PageTemplate from "@/components/elements/PageTemplate";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { createServerSupabaseClient } from "@/utils/supabase/server";

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

async function getInitialUser() {
	const supabase = await createServerSupabaseClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const theme = await getServerTheme();
	const initialUser = await getInitialUser();

	return (
		<html lang="en" className={roboto.className} data-theme={theme} data-scroll-behavior="smooth">
			<body>
				<AuthProvider initialUser={initialUser}>
					<ToastProvider>
						<Header />
						<PageTemplate>{children}</PageTemplate>
					</ToastProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
