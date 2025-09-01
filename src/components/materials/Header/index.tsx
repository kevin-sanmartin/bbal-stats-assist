import Link from "next/link";
import ThemeToggle from "@/components/elements/ThemeToggle";
import classes from "./classes.module.scss";

export default function Header() {
	return (
		<header className={classes.header}>
			<div className={classes.container}>
				<div className={classes.content}>
					<Link href="/" className={classes.logo}>
						<h1>Bbal Stats Assist App</h1>
					</Link>

					<nav className={classes.nav}>
						<Link href="/" className={classes.navLink}>
							Accueil
						</Link>
						<Link href="/components" className={classes.navLink}>
							Composants
						</Link>
						<Link href="/login" className={classes.navLink}>
							Connexion
						</Link>
						<Link href="/register" className={classes.navLink}>
							Inscription
						</Link>
					</nav>
				</div>

				<ThemeToggle showLabel />
			</div>
		</header>
	);
}
