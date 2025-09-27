import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import Button from "@/components/elements/Button";
import classes from "./classes.module.scss";

interface DesktopActionsProps {
	isUserLoggedIn: boolean;
	onLogout: () => void;
	logoutLoading: boolean;
}

export default function DesktopActions({ isUserLoggedIn, onLogout, logoutLoading }: DesktopActionsProps) {
	const router = useRouter();

	return (
		<div className={classes.desktopActions}>
			{!isUserLoggedIn && (
				<>
					<Button variant="outline" size="sm" onClick={() => router.push("/auth/login")}>
						Connexion
					</Button>
					<Button variant="primary" size="sm" onClick={() => router.push("/auth/register")}>
						Inscription
					</Button>
				</>
			)}
			{isUserLoggedIn && (
				<Button variant="outline" size="sm" onClick={onLogout} loading={logoutLoading} leftIcon={<FiLogOut />} className={classes.logoutButton}>
					Déconnexion
				</Button>
			)}
		</div>
	);
}