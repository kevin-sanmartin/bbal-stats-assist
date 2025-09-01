"use client";

import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import Card from "@/components/elements/Card";
import Input from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import classes from "./classes.module.scss";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		await new Promise((resolve) => setTimeout(resolve, 1500));

		setLoading(false);
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
							<Link href="#" className={classes.forgotPassword}>
								Mot de passe oublié ?
							</Link>
						</div>

						<Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
							Se connecter
						</Button>
					</form>

					<div className={classes.footer}>
						<p className={classes.footerText}>
							Pas encore de compte ?{" "}
							<Link href="/register" className={classes.link}>
								Créer un compte
							</Link>
						</p>
					</div>
				</Card>
			</div>
		</main>
	);
}
