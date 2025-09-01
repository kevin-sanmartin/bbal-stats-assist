import { useEffect, useState } from "react";
import { getThemeFromCookie, setThemeCookie, getSystemTheme, type Theme } from "@/utils/cookies";

export interface UseThemeReturn {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
	systemTheme: Theme;
}

export function useTheme(): UseThemeReturn {
	// Pour éviter le mismatch SSR, toujours démarrer avec "light"
	const [theme, setThemeState] = useState<Theme>("light");
	const [systemTheme, setSystemTheme] = useState<Theme>("light");

	// Hydratation côté client - une seule fois au mount
	useEffect(() => {
		// Déterminer le thème système
		const systemPreference = getSystemTheme();
		setSystemTheme(systemPreference);

		// Lire les préférences et appliquer le bon thème
		const cookieTheme = getThemeFromCookie();
		const initialTheme = cookieTheme || systemPreference;

		// Sauvegarder dans le cookie si pas encore fait
		if (!cookieTheme) {
			setThemeCookie(initialTheme);
		}

		// Appliquer immédiatement au DOM
		document.documentElement.setAttribute("data-theme", initialTheme);
		setThemeState(initialTheme);
	}, []);

	// Écoute des changements du thème système
	useEffect(() => {
		if (typeof window === "undefined") return;

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = (event: MediaQueryListEvent) => {
			setSystemTheme(event.matches ? "dark" : "light");
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	// Application du thème quand il change
	useEffect(() => {
		if (typeof window === "undefined") return;

		// Appliquer au DOM
		document.documentElement.setAttribute("data-theme", theme);

		// Sauvegarder dans le cookie
		setThemeCookie(theme);
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
	};

	const toggleTheme = () => {
		setThemeState((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
	};

	return {
		theme,
		setTheme,
		toggleTheme,
		systemTheme,
	};
}
