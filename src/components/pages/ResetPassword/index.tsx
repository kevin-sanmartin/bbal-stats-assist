"use client";
import { useState, useEffect } from "react";
import { FiLock, FiEye, FiEyeOff, FiCheck } from "react-icons/fi";
import Link from "next/link";
import Card from "@/components/elements/Card";
import Input from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { useAuthContext } from "@/contexts/AuthContext";
import { useToastContext } from "@/contexts/ToastContext";
import classes from "./classes.module.scss";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";

export default function ResetPassword() {
	const supabase = createBrowserSupabaseClient();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(true);
	const [session, setSession] = useState<Session | null>(null);

	const { updatePassword } = useAuthContext();
	const { toast } = useToastContext();

	useEffect(() => {
		// Récupérer la session depuis l'URL
		const getSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);

			if (!session) {
				toast.error("Lien de réinitialisation invalide ou expiré.");
			}
		};

		getSession();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Les mots de passe ne correspondent pas.");
			return;
		}

		if (password.length < 6) {
			toast.error("Le mot de passe doit contenir au moins 6 caractères.");
			return;
		}

		setLoading(true);

		try {
			await updatePassword(password);
			setSuccess(true);
			toast.success("Mot de passe mis à jour avec succès !");

			// Redirection après 3 secondes
			setTimeout(() => {
				// router.push("/");
			}, 3000);
		} catch (error: any) {
			toast.error(error.message || "Erreur lors de la mise à jour du mot de passe.");
		} finally {
			setLoading(false);
		}
	};

	// Loading state pendant la vérification du token
	if (session === null) {
		return (
			<Card variant="elevated" padding="lg" className={classes.card}>
						<div className={classes.header}>
							<h1 className={classes.title}>Vérification...</h1>
							<p className={classes.subtitle}>Validation de votre lien de réinitialisation</p>
						</div>
			</Card>
		);
	}

	// Succès
	if (success) {
		return (
			<Card variant="elevated" padding="lg" className={classes.card}>
						<div className={classes.header}>
							<div className={classes.successIcon}>
								<FiCheck />
							</div>
							<h1 className={classes.title}>Mot de passe mis à jour !</h1>
							<p className={classes.subtitle}>Vous allez être redirigé automatiquement...</p>
						</div>

						<div className={classes.actions}>
							<Link href="/" className={classes.backLink}>
								Aller à l'accueil
							</Link>
						</div>
			</Card>
		);
	}

	// Formulaire de reset
	return (
		<Card variant="elevated" padding="lg" className={classes.card}>
					<div className={classes.header}>
						<h1 className={classes.title}>Nouveau mot de passe</h1>
						<p className={classes.subtitle}>Choisissez un nouveau mot de passe sécurisé</p>
					</div>

					<form onSubmit={handleSubmit} className={classes.form}>
						<Input
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
							label="Nouveau mot de passe"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							leftIcon={<FiLock />}
							rightIcon={
								<button type="button" className={classes.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? <FiEyeOff /> : <FiEye />}
								</button>
							}
							fullWidth
							required
							minLength={6}
						/>

						<Input
							type={showConfirmPassword ? "text" : "password"}
							placeholder="••••••••"
							label="Confirmer le nouveau mot de passe"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							leftIcon={<FiLock />}
							rightIcon={
								<button type="button" className={classes.passwordToggle} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
									{showConfirmPassword ? <FiEyeOff /> : <FiEye />}
								</button>
							}
							fullWidth
							required
							minLength={6}
						/>

						<Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
							Mettre à jour le mot de passe
						</Button>
					</form>

					<div className={classes.footer}>
						<Link href="/auth/login" className={classes.backLink}>
							Retour à la connexion
						</Link>
					</div>
		</Card>
	);
}
