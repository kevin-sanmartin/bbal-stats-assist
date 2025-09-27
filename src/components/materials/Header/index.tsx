"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { useToastContext } from "@/contexts/ToastContext";
import ThemeToggle from "@/components/elements/ThemeToggle";
import { Logo, DesktopNav, DesktopActions, MobileMenu, MobileMenuButton } from "./components";
import classes from "./classes.module.scss";

export default function Header() {
	const [logoutLoading, setLogoutLoading] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { user, signOut, loading } = useAuthContext();
	const { toast } = useToastContext();
	const router = useRouter();

	const handleLogout = async () => {
		setLogoutLoading(true);
		try {
			await signOut();
			toast.success("Déconnexion réussie !");
			router.push("/");
		} catch (error: any) {
			toast.error("Erreur lors de la déconnexion.");
			console.error("Logout error:", error);
		} finally {
			setLogoutLoading(false);
		}
	};

	const closeMobileMenu = () => setMobileMenuOpen(false);
	const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

	const isUserLoggedIn = !loading && !!user;

	return (
		<>
			<header className={classes.header}>
				<div className={classes.container}>
					<div className={classes.leftSection}>
						<Logo onMobileMenuClose={closeMobileMenu} />
					</div>

					<DesktopNav isUserLoggedIn={isUserLoggedIn} />

					<div className={classes.rightSection}>
						<DesktopActions isUserLoggedIn={isUserLoggedIn} onLogout={handleLogout} logoutLoading={logoutLoading} />
						<ThemeToggle />
						<MobileMenuButton isOpen={mobileMenuOpen} onToggle={toggleMobileMenu} />
					</div>
				</div>
			</header>

			<MobileMenu isOpen={mobileMenuOpen} isUserLoggedIn={isUserLoggedIn} onClose={closeMobileMenu} onLogout={handleLogout} logoutLoading={logoutLoading} />
		</>
	);
}
