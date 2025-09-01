import classes from "./classes.module.scss";
import classNames from "classnames";

export type AvatarSize = "xs" | "sm" | "md" | "lg";
export type AvatarShape = "circle" | "square";

type AvatarProps = {
	src?: string;
	alt?: string;
	name?: string;
	size?: AvatarSize;
	shape?: AvatarShape;
	className?: string;
	onClick?: () => void;
};

function getInitials(name: string): string {
	return name
		.split(" ")
		.map((word) => word.charAt(0))
		.join("")
		.substring(0, 2)
		.toUpperCase();
}

function getBackgroundColor(name: string): string {
	const colors = [
		"var(--color-primary)",
		"var(--color-success)",
		"var(--color-warning)",
		"var(--color-danger)",
		"var(--color-info)",
		"#8b5cf6", // Purple
		"#06b6d4", // Cyan
		"#84cc16", // Lime
		"#f59e0b", // Amber
		"#ec4899", // Pink
	];

	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}

	return colors[Math.abs(hash) % colors.length];
}

export default function Avatar({ src, alt, name, size = "md", shape = "circle", className, onClick }: AvatarProps) {
	const avatarClasses = classNames(classes.avatar, classes[`size-${size}`], classes[`shape-${shape}`], { [classes.clickable]: Boolean(onClick) }, className);

	const initials = name ? getInitials(name) : null;
	const backgroundColor = name ? getBackgroundColor(name) : "var(--color-gray-200)";

	const renderContent = () => {
		if (src) {
			return <img src={src} alt={alt || name || "Avatar"} className={classes.image} />;
		}

		if (initials) {
			return (
				<span className={classes.initials} style={{ backgroundColor }}>
					{initials}
				</span>
			);
		}

		return <span className={classes.fallback}>👤</span>;
	};

	return (
		<div className={avatarClasses} onClick={onClick} role={onClick ? "button" : undefined} tabIndex={onClick ? 0 : undefined}>
			{renderContent()}
		</div>
	);
}
