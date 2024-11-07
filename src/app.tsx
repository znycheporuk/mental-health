import type { RouteSectionProps } from "@solidjs/router";
import { Show, createEffect } from "solid-js";
import { Nav } from "./components/nav";
import { useOnboardingRedirect } from "./features/auth/use-onboarding-redirect";
import { parseLang, setLang } from "./shared/lang";

export function App(props: RouteSectionProps) {
	// hack to create reactive lang state
	createEffect(() => setLang(parseLang(props.location.pathname.split("/")[1])));
	useOnboardingRedirect();

	return (
		<>
			<main class="mx-auto mb-nav w-full p-4">{props.children}</main>
			<Show when={!props.location.pathname.includes("onboarding")}>
				<Nav />
			</Show>
		</>
	);
}
