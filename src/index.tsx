/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { Suspense, render } from "solid-js/web";
import { App } from "./app";
import { Home } from "./routes/(home)";
import { Settings } from "./routes/settings";
import "./assets/index.css";

render(
	() => (
		<Suspense>
			<Router root={App}>
				<Route path="/:lang?">
					<Route path="/" component={Home} />
					<Route path="settings" component={Settings} />
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
