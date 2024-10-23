import { langLink } from "../shared/lang";
import { useTranslation } from "../shared/use-translation";

export function Settings() {
	const { t, lang } = useTranslation();
	return (
		<div>
			<h1 class="mb-4 text-2xl">{t()?.settings}</h1>
			<div class="rounded-2xl bg-crust p-4">
				<a href={langLink(lang(), "login")} class="mb-1 block">
					{t()?.login}
				</a>
				<a href={langLink(lang(), "register")} class="block">
					{t()?.register}
				</a>
			</div>
		</div>
	);
}
