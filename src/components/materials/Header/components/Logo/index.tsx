import Link from "next/link";
import classes from "./classes.module.scss";

interface LogoProps {
	onMobileMenuClose?: () => void;
}

export default function Logo({ onMobileMenuClose }: LogoProps) {
	return (
		<Link href="/" className={classes.logo} onClick={onMobileMenuClose}>
			<span className={classes.logoIcon}>🏀</span>
			<h1>BasketStats</h1>
		</Link>
	);
}