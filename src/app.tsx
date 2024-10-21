import type { RouteSectionProps } from "@solidjs/router";
import { Nav } from "./components/nav";

export function App(props: RouteSectionProps) {
	return (
		<>
			<main class="mx-auto w-full max-w-page-width p-4">{props.children}</main>
			<Nav />
		</>
	);
}
