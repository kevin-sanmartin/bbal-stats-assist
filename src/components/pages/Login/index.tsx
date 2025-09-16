"use client";

import { useState, useEffect } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "@/components/elements/Card";
import Input from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { useAuthContext } from "@/contexts/AuthContext";
import { useToastContext } from "@/contexts/ToastContext";
import classes from "./classes.module.scss";
import ConnectWithGoogleButton from "@/components/elements/ConnectWithGoogleButton";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { signIn, user, loading: authLoading } = useAuthContext();
	const { toast } = useToastContext();
	const router = useRouter();

	// Redirection si déjà connecté
	useEffect(() => {
		if (!authLoading && user) {
			router.replace("/");
		}
	}, [user, authLoading, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await signIn(email, password);
			toast.success("Connexion réussie ! Bienvenue.");
			router.push("/");
		} catch (error) {
			toast.error("Erreur lors de la connexion. Veuillez vérifier vos identifiants et réessayer.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className={classes.root}>
			<div className={classes.container}>
				<Card variant="elevated" padding="lg" className={classes.card}>
					<div className={classes.header}>
						<h1 className={classes.title}>Connexion</h1>
						<p className={classes.subtitle}>Connectez-vous à votre compte</p>
					</div>

					<form onSubmit={handleSubmit} className={classes.form}>
						<Input
							type="email"
							placeholder="votre@email.com"
							label="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							leftIcon={<FiMail />}
							fullWidth
							required
						/>

						<Input
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
							label="Mot de passe"
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
						/>

						<div className={classes.actions}>
							<Link href="/auth/forgot-password" className={classes.forgotPassword}>
								Mot de passe oublié ?
							</Link>
						</div>

						<div className={classes.buttonContainer}>
							<Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
								Se connecter
							</Button>
							<div className={classes.divider} />
							<ConnectWithGoogleButton />
						</div>
					</form>

					<div className={classes.footer}>
						<p className={classes.footerText}>
							Pas encore de compte ?&nbsp;
							<Link href="/auth/register" className={classes.link}>
								Créer un compte
							</Link>
						</p>
					</div>
				</Card>
			</div>
		</main>
	);
}
