"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import ThemeToggle from "@/components/elements/ThemeToggle";
import Button from "@/components/elements/Button";
import { useAuthContext } from "@/contexts/AuthContext";
import { useToastContext } from "@/contexts/ToastContext";
import classes from "./classes.module.scss";

export default function Header() {
	const [logoutLoading, setLogoutLoading] = useState(false);
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

	return (
		<header className={classes.header}>
			<div className={classes.container}>
				<div className={classes.content}>
					<Link href="/" className={classes.logo}>
						<h1>BSA</h1>
					</Link>

					<nav className={classes.nav}>
						<Link href="/basketstats" className={classes.navLink}>
							Stats
						</Link>
						<Link href="/components" className={classes.navLink}>
							Composants
						</Link>
						{!loading && !user && (
							<>
								<Link href="/auth/login" className={classes.navLink}>
									Connexion
								</Link>
								<Link href="/auth/register" className={classes.navLink}>
									Inscription
								</Link>
							</>
						)}
					</nav>
				</div>

				<div className={classes.actions}>
					{!loading && user && (
						<Button
							variant="secondary"
							size="sm"
							onClick={handleLogout}
							loading={logoutLoading}
							leftIcon={<FiLogOut />}
							className={classes.logoutButton}
						>
							Se déconnecter
						</Button>
					)}
					<ThemeToggle showLabel />
				</div>
			</div>
		</header>
	);
}
