import { createAsync, useLocation } from "@solidjs/router";
import { parseLang } from "./lang";

export function useTranslation() {
	const lang = () => parseLang(useLocation().pathname.split("/")[1]);
	const t = createAsync(async () =>
		lang() === "en"
			? (await import("../locales/en")).dict
			: (await import("../locales/uk")).dict,
	);

	return { t, lang };
}
