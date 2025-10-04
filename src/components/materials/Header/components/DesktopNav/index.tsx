import Link from "next/link";
import { FiHome, FiTarget } from "react-icons/fi";
import classes from "./classes.module.scss";

interface DesktopNavProps {
	isUserLoggedIn: boolean;
}

export default function DesktopNav({ isUserLoggedIn }: DesktopNavProps) {
	if (!isUserLoggedIn) {
		return null;
	}

	return (
		<nav className={classes.desktopNav}>
			<Link href="/" className={classes.navLink}>
				<FiHome /> Accueil
			</Link>
			<Link href="/match" className={classes.navLink}>
				<FiTarget /> Nouveau Match
			</Link>
		</nav>
	);
}