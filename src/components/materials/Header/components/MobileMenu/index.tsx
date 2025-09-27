import Link from "next/link";
import { FiHome, FiUsers, FiTarget, FiLogOut } from "react-icons/fi";
import classes from "./classes.module.scss";

interface MobileMenuProps {
	isOpen: boolean;
	isUserLoggedIn: boolean;
	onClose: () => void;
	onLogout: () => void;
	logoutLoading: boolean;
}

export default function MobileMenu({ isOpen, isUserLoggedIn, onClose, onLogout, logoutLoading }: MobileMenuProps) {
	if (!isOpen) {
		return null;
	}

	const handleLogout = () => {
		onLogout();
		onClose();
	};

	return (
		<>
			<div className={classes.mobileOverlay} onClick={onClose} />
			<nav className={classes.mobileMenu}>
				<div className={classes.mobileMenuContent}>
					{isUserLoggedIn && (
						<>
							<Link href="/" className={classes.mobileNavLink} onClick={onClose}>
								<FiHome size={20} />
								<span>Accueil</span>
							</Link>
							<Link href="/teams" className={classes.mobileNavLink} onClick={onClose}>
								<FiUsers size={20} />
								<span>Mes Équipes</span>
							</Link>
							<Link href="/matches" className={classes.mobileNavLink} onClick={onClose}>
								<FiTarget size={20} />
								<span>Matches</span>
							</Link>
						</>
					)}
					{!isUserLoggedIn && (
						<>
							<Link href="/auth/login" className={classes.mobileNavLink} onClick={onClose}>
								<span>Se connecter</span>
							</Link>
							<Link href="/auth/register" className={classes.mobileNavLink} onClick={onClose}>
								<span>S'inscrire</span>
							</Link>
						</>
					)}

					{isUserLoggedIn && (
						<div className={classes.mobileMenuFooter}>
							<button className={classes.mobileLogoutButton} onClick={handleLogout} disabled={logoutLoading}>
								<FiLogOut size={16} />
								<span>{logoutLoading ? "Déconnexion..." : "Se déconnecter"}</span>
							</button>
						</div>
					)}
				</div>
			</nav>
		</>
	);
}