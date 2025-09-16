import { PropsWithChildren } from "react";
import classes from "./classes.module.scss";

export default function PageTemplate({ children }: PropsWithChildren) {
	return <main className={classes.root}>{children}</main>;
}
