export type Theme = "light" | "dark";

export function getThemeFromCookie(): Theme | null {
	if (typeof document === "undefined") return null;
	
	const match = document.cookie.match(/theme=([^;]+)/);
	const value = match?.[1];
	return value === "light" || value === "dark" ? value : null;
}

export function setThemeCookie(theme: Theme): void {
	if (typeof document === "undefined") return;
	
	document.cookie = `theme=${theme}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

export function getSystemTheme(): Theme {
	if (typeof window === "undefined") return "light";
	
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}