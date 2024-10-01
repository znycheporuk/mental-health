/* @refresh reload */
import { render } from "solid-js/web";
import { App } from "./app";
import "./index.css";

render(() => <App />, document.body);

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch((e) => {
		console.error("Service worker registration failed", e);
	});
}
