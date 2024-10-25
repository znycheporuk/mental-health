import { createAsync } from "@solidjs/router";
import { createSignal } from "solid-js";
import type { Lang } from "./types";

export const [lang, setLang] = createSignal<Lang>("uk");

export const t = createAsync(async () =>
	lang() === "en"
		? (await import("../locales/en")).dict
		: (await import("../locales/uk")).dict,
);

export const getOppositeLanguage = (lang: Lang): Lang =>
	lang === "en" ? "uk" : "en";

export const parseLang = (lang?: string): Lang => (lang === "en" ? "en" : "uk");

export const langLink = (path?: string) => {
	const slash = path ? (path.startsWith("/") ? "" : "/") : "";

	if (["", "/"].includes(path ?? "") && lang() === "uk") return "/";
	return `/${lang()}${slash}${path}`;
};
