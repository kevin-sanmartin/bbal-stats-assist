"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

type IAuthContext = {
	user: User | null;
	loading: boolean;
	signUp: (email: string, password: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	signInWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
	updatePassword: (password: string) => Promise<void>;
};

type IProps = {
	children: React.ReactNode;
	initialUser: User | null;
};

const AuthContext = createContext<IAuthContext>(undefined!);
const supabase = createBrowserSupabaseClient();

export function AuthProvider(props: IProps) {
	const { user, loading, signUp, signIn, signInWithGoogle, signOut, resetPassword, updatePassword } = useAuth(props.initialUser);

	return <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, signOut, resetPassword, updatePassword }}>{props.children}</AuthContext.Provider>;
}

const useAuth = (initialUser: User | null) => {
	const [user, setUser] = useState<User | null>(initialUser ?? null);
	const [loading, setLoading] = useState(!initialUser);

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_event, session) => {
			setUser(session?.user ?? null);
			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	const signUp = useCallback(async (email: string, password: string) => {
		const { error } = await supabase.auth.signUp({
			email,
			password,
		});
		if (error) throw error;
	}, []);

	const signIn = useCallback(async (email: string, password: string) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) throw error;
	}, []);

	const signInWithGoogle = useCallback(async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		});
		if (error) throw error;
	}, []);

	const signOut = useCallback(async () => {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
		setUser(null);
	}, []);

	const resetPassword = useCallback(async (email: string) => {
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/reset-password`,
		});
		if (error) throw error;
	}, []);

	const updatePassword = useCallback(async (password: string) => {
		const { error } = await supabase.auth.updateUser({ password });
		if (error) throw error;
	}, []);

	return { user, loading, signUp, signIn, signInWithGoogle, signOut, resetPassword, updatePassword };
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};
