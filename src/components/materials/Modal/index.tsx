import { PropsWithChildren, ReactNode, useEffect } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	footer?: ReactNode;
	size?: ModalSize;
}

export default function Modal({ isOpen, onClose, title, children, footer, size = "md" }: PropsWithChildren<ModalProps>) {
	const modalClasses = classNames(classes.modal, classes[`size-${size}`]);

	const handleOverlayClick = (event: React.MouseEvent) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	useEffect(() => {
		if (isOpen) {
			const handleEscape = (event: KeyboardEvent) => {
				if (event.key === "Escape") {
					onClose();
				}
			};

			document.addEventListener("keydown", handleEscape);
			return () => document.removeEventListener("keydown", handleEscape);
		}
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className={classes.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby={title ? "modal-title" : undefined}>
			<div className={modalClasses}>
				<div className={classes.main}>
					{title && (
						<div className={classes.header}>
							<h2 id="modal-title" className={classes.title}>
								{title}
							</h2>

							<button type="button" className={classes.closeButton} onClick={onClose} aria-label="Close modal">
								×
							</button>
						</div>
					)}

					<div className={classes.content}>{children}</div>
				</div>

				{footer && <div className={classes.footer}>{footer}</div>}
			</div>
		</div>
	);
}
