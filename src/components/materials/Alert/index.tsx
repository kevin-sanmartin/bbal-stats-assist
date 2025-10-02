import { PropsWithChildren, ReactNode } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";
import { IoInformationCircleOutline, IoCheckmarkCircleOutline, IoWarningOutline, IoAlertCircleOutline, IoClose } from "react-icons/io5";

export type AlertVariant = "info" | "success" | "warning" | "danger";

interface AlertProps {
	variant?: AlertVariant;
	title?: string;
	icon?: ReactNode;
	closable?: boolean;
	onClose?: () => void;
	className?: string;
}

export default function Alert({ variant = "info", title, children, icon, closable = false, onClose, className }: PropsWithChildren<AlertProps>) {
	const alertClasses = classNames(classes.alert, classes[`variant-${variant}`], className);

	const defaultIcons = {
		info: <IoInformationCircleOutline />,
		success: <IoCheckmarkCircleOutline />,
		warning: <IoWarningOutline />,
		danger: <IoAlertCircleOutline />,
	};

	const displayIcon = icon || defaultIcons[variant];

	return (
		<div className={alertClasses} role="alert">
			{displayIcon && <div className={classes.icon}>{displayIcon}</div>}

			<div className={classes.content}>
				{title && <div className={classes.title}>{title}</div>}
				<div className={classes.message}>{children}</div>
			</div>

			{closable && onClose && (
				<button className={classes.closeButton} onClick={onClose} aria-label="Close alert">
					<IoClose />
				</button>
			)}
		</div>
	);
}
