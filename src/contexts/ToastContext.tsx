"use client";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Toast, ToasterContainer } from "@/components/materials/Toaster";

type ToastContextType = {
	toast: {
		success: (message: string, title?: string, duration?: number) => void;
		error: (message: string, title?: string, duration?: number) => void;
		warning: (message: string, title?: string, duration?: number) => void;
		info: (message: string, title?: string, duration?: number) => void;
	};
	removeToast: (id: string, immediate?: boolean) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: PropsWithChildren) {
	const { toasts, toast, removeToast } = useToast();

	return (
		<ToastContext.Provider value={{ toast, removeToast }}>
			{children}
			<ToasterContainer toasts={toasts} onRemove={removeToast} />
		</ToastContext.Provider>
	);
}

function useToast(maxToasts: number = 5, defaultDuration: number = 3000) {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

	const removeToast = useCallback((id: string, immediate: boolean = false) => {
		const timer = timersRef.current.get(id);
		if (timer) {
			clearTimeout(timer);
			timersRef.current.delete(id);
		}

		if (immediate) {
			setToasts((prev) => prev.filter((toast) => toast.id !== id));
		} else {
			// Déclencher l'animation de sortie
			setToasts((prev) => prev.map((toast) => (toast.id === id ? { ...toast, isExiting: true } : toast)));

			// Supprimer réellement après l'animation
			const exitTimer = setTimeout(() => {
				setToasts((prev) => prev.filter((toast) => toast.id !== id));
			}, 300); // Durée de l'animation de sortie

			timersRef.current.set(`exit-${id}`, exitTimer);
		}
	}, []);

	const addToast = useCallback(
		(toast: Omit<Toast, "id">) => {
			const id = Math.random().toString(36).substr(2, 9);
			const duration = toast.duration ?? defaultDuration;
			const newToast: Toast = {
				id,
				...toast,
				duration,
			};

			setToasts((prev) => {
				const updated = [newToast, ...prev];
				return updated.slice(0, maxToasts);
			});

			if (duration > 0) {
				const timer = setTimeout(() => {
					removeToast(id);
				}, duration);
				timersRef.current.set(id, timer);
			}
		},
		[maxToasts, defaultDuration, removeToast],
	);

	const toast = {
		success: (message: string, title?: string, duration?: number) => {
			addToast({ variant: "success", message, title, duration });
		},
		error: (message: string, title?: string, duration?: number) => {
			addToast({ variant: "danger", message, title, duration });
		},
		warning: (message: string, title?: string, duration?: number) => {
			addToast({ variant: "warning", message, title, duration });
		},
		info: (message: string, title?: string, duration?: number) => {
			addToast({ variant: "info", message, title, duration });
		},
	};

	useEffect(() => {
		return () => {
			timersRef.current.forEach((timer) => {
				clearTimeout(timer);
			});
			timersRef.current.clear();
		};
	}, []);

	return { toasts, toast, removeToast };
}

export function useToastContext() {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error("useToastContext must be used within a ToastProvider");
	}
	return context;
}
