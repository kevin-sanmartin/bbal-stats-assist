"use client";

import { useState, useEffect } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "@/components/elements/Card";
import Input from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import Checkbox from "@/components/elements/Checkbox";
import { useAuthContext } from "@/contexts/AuthContext";
import { useToastContext } from "@/contexts/ToastContext";
import ConnectWithGoogleButton from "@/components/elements/ConnectWithGoogleButton";
import classes from "./classes.module.scss";

export default function Register() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);
	const { signUp, user, loading: authLoading } = useAuthContext();
	const { toast } = useToastContext();
	const router = useRouter();

	// Redirection si déjà connecté
	useEffect(() => {
		if (!authLoading && user) {
			router.replace("/");
		}
	}, [user, authLoading, router]);

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validation
		if (formData.password !== formData.confirmPassword) {
			toast.error("Les mots de passe ne correspondent pas.");
			return;
		}

		if (!acceptTerms) {
			toast.error("Vous devez accepter les conditions d'utilisation.");
			return;
		}

		setLoading(true);

		try {
			await signUp(formData.email, formData.password);
			toast.success("Compte créé avec succès !");
			router.push("/");
		} catch (error: any) {
			toast.error(error.message || "Erreur lors de la création du compte. Veuillez réessayer.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className={classes.root}>
			<div className={classes.container}>
				<Card variant="elevated" padding="lg" className={classes.card}>
					<div className={classes.header}>
						<h1 className={classes.title}>Créer un compte</h1>
						<p className={classes.subtitle}>Rejoignez-nous dès aujourd'hui</p>
					</div>

					<form onSubmit={handleSubmit} className={classes.form}>
						<div className={classes.nameFields}>
							<Input
								type="text"
								placeholder="Prénom"
								label="Prénom"
								value={formData.firstName}
								onChange={(e) => handleInputChange("firstName", e.target.value)}
								leftIcon={<FiUser />}
								fullWidth
								required
							/>
							<Input
								type="text"
								placeholder="Nom"
								label="Nom"
								value={formData.lastName}
								onChange={(e) => handleInputChange("lastName", e.target.value)}
								leftIcon={<FiUser />}
								fullWidth
								required
							/>
						</div>

						<Input
							type="email"
							placeholder="votre@email.com"
							label="Email"
							value={formData.email}
							onChange={(e) => handleInputChange("email", e.target.value)}
							leftIcon={<FiMail />}
							fullWidth
							required
						/>

						<Input
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
							label="Mot de passe"
							value={formData.password}
							onChange={(e) => handleInputChange("password", e.target.value)}
							leftIcon={<FiLock />}
							rightIcon={
								<button type="button" className={classes.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? <FiEyeOff /> : <FiEye />}
								</button>
							}
							fullWidth
							required
						/>

						<Input
							type={showConfirmPassword ? "text" : "password"}
							placeholder="••••••••"
							label="Confirmer le mot de passe"
							value={formData.confirmPassword}
							onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
							leftIcon={<FiLock />}
							rightIcon={
								<button type="button" className={classes.passwordToggle} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
									{showConfirmPassword ? <FiEyeOff /> : <FiEye />}
								</button>
							}
							fullWidth
							required
						/>

						<div className={classes.terms}>
							<Checkbox
								checked={acceptTerms}
								onChange={(e) => setAcceptTerms(e.target.checked)}
								required
								label={
									<span>
										J'accepte les{" "}
										<Link href="#" className={classes.link}>
											conditions d'utilisation
										</Link>{" "}
										et la{" "}
										<Link href="#" className={classes.link}>
											politique de confidentialité
										</Link>
									</span>
								}
							/>
						</div>

						<div className={classes.buttonContainer}>
							<Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
								Créer mon compte
							</Button>
							<div className={classes.divider} />
							<ConnectWithGoogleButton />
						</div>
					</form>

					<div className={classes.footer}>
						<p className={classes.footerText}>
							Déjà un compte ?{" "}
							<Link href="/login" className={classes.link}>
								Se connecter
							</Link>
						</p>
					</div>
				</Card>
			</div>
		</main>
	);
}
