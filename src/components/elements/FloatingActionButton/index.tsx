"use client";

import { useRouter, usePathname } from "next/navigation";
import { FiTarget } from "react-icons/fi";
import Button from "@/components/elements/Button";
import classes from "./classes.module.scss";

export default function FloatingActionButton() {
	const router = useRouter();
	const pathname = usePathname();

	// Ne pas afficher sur les pages de match
	const hideOnPaths = ["/match"];
	const shouldHide = hideOnPaths.some((path) => pathname?.startsWith(path));

	if (shouldHide) {
		return null;
	}

	return (
		<div className={classes.fab}>
			<Button variant="contained" onClick={() => router.push("/match")} leftIcon={<FiTarget />}>
				Nouveau match
			</Button>
		</div>
	);
}
