import { FiMenu, FiX } from "react-icons/fi";
import classes from "./classes.module.scss";

interface MobileMenuButtonProps {
	isOpen: boolean;
	onToggle: () => void;
}

export default function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		onToggle();
	};

	return (
		<button className={classes.mobileMenuButton} onClick={handleClick} aria-label="Toggle menu" type="button">
			{isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
		</button>
	);
}