import type { RouteSectionProps } from "@solidjs/router";
import { createEffect } from "solid-js";
import { Nav } from "./components/nav";
import { parseLang, setLang } from "./shared/lang";

export function App(props: RouteSectionProps) {
	// hack to create reactive lang state
	createEffect(() => setLang(parseLang(props.location.pathname.split("/")[1])));

	return (
		<>
			<main class="mx-auto mb-nav w-full p-4">{props.children}</main>
			<Nav />
		</>
	);
}
