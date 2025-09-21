"use client";
import { createContext, PropsWithChildren, useContext } from "react";
import { useToast } from "@/hooks/useToast";
import { ToasterContainer } from "@/components/materials/Toaster";

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

export function useToastContext() {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error("useToastContext must be used within a ToastProvider");
	}
	return context;
}
