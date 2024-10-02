/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { Suspense, render } from "solid-js/web";
import { App } from "./app";
import { Home } from "./routes/(home)";
import "./index.css";

render(
	() => (
		<Suspense>
			<Router root={App}>
				<Route path="/:lang?">
					<Route path="/" component={Home} />
				</Route>
			</Router>
		</Suspense>
	),
	document.body,
);

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch((e) => {
		console.error("Service worker registration failed", e);
	});
}
