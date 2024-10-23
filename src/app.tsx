import type { RouteSectionProps } from "@solidjs/router";
import { Nav } from "./components/nav";
export function App(props: RouteSectionProps) {
	return (
		<>
			<main class="mx-auto w-full p-4">{props.children}</main>
			<Nav />
		</>
	);
}
