import Alert, { AlertVariant } from "@/components/materials/Alert";
import classes from "./classes.module.scss";

export interface Toast {
	id: string;
	variant: AlertVariant;
	title?: string;
	message: string;
	duration?: number;
	isExiting?: boolean;
}

interface ToasterProps {
	maxToasts?: number;
}

interface ToasterContainerProps extends ToasterProps {
	toasts: Toast[];
	onRemove: (id: string) => void;
}

export function ToasterContainer({ toasts, onRemove }: ToasterContainerProps) {
	return (
		<div className={classes.toaster}>
			{toasts.map((toast) => (
				<div key={toast.id} className={`${classes.toast} ${toast.isExiting ? classes.exiting : ""}`}>
					<Alert variant={toast.variant} title={toast.title} closable onClose={() => onRemove(toast.id)} size="md">
						{toast.message}
					</Alert>
				</div>
			))}
		</div>
	);
}
