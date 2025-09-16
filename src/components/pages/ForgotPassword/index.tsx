"use client";

import { useState, useEffect } from "react";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "@/components/elements/Card";
import Input from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { useAuthContext } from "@/contexts/AuthContext";
import { useToastContext } from "@/contexts/ToastContext";
import classes from "./classes.module.scss";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);
	const { resetPassword, user, loading: authLoading } = useAuthContext();
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
			await resetPassword(email);
			setEmailSent(true);
			toast.success("Email de réinitialisation envoyé ! Vérifiez votre boîte mail.");
		} catch (error: any) {
			toast.error(error.message || "Erreur lors de l'envoi de l'email. Veuillez réessayer.");
		} finally {
			setLoading(false);
		}
	};

	if (emailSent) {
		return (
			<main className={classes.root}>
				<div className={classes.container}>
					<Card variant="elevated" padding="lg" className={classes.card}>
						<div className={classes.header}>
							<h1 className={classes.title}>Email envoyé !</h1>
							<p className={classes.subtitle}>
								Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>
							</p>
						</div>

						<div className={classes.instructions}>
							<p>Vérifiez votre boîte mail et cliquez sur le lien pour réinitialiser votre mot de passe.</p>
							<p className={classes.note}>Le lien expirera dans 1 heure.</p>
						</div>

						<div className={classes.actions}>
							<Link href="/auth/login" className={classes.backLink}>
								<FiArrowLeft />
								Retour à la connexion
							</Link>
						</div>
					</Card>
				</div>
			</main>
		);
	}

	return (
		<main className={classes.root}>
			<div className={classes.container}>
				<Card variant="elevated" padding="lg" className={classes.card}>
					<div className={classes.header}>
						<h1 className={classes.title}>Mot de passe oublié</h1>
						<p className={classes.subtitle}>Entrez votre email pour recevoir un lien de réinitialisation</p>
					</div>

					<form onSubmit={handleSubmit} className={classes.form}>
						<Input
							type="email"
							placeholder="votre@email.com"
							label="Adresse email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							leftIcon={<FiMail />}
							fullWidth
							required
						/>

						<Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
							Envoyer le lien de réinitialisation
						</Button>
					</form>

					<div className={classes.footer}>
						<Link href="/auth/login" className={classes.backLink}>
							<FiArrowLeft />
							Retour à la connexion
						</Link>
					</div>
				</Card>
			</div>
		</main>
	);
}