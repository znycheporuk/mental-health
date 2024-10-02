import type { RouteSectionProps } from "@solidjs/router";

export function App(props: RouteSectionProps) {
	return <main class="p-4">{props.children}</main>;
}
