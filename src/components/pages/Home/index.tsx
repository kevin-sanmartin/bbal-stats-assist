"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import classes from "./classes.module.scss";

export default function Home() {
	const { user } = useAuthContext();
	return (
		<main className={classes.root}>
			<h1>Home Page</h1>
			{user ? <p>Welcome, {user.email}</p> : <p>Please log in.</p>}
		</main>
	);
}
