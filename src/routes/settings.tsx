import { A } from "@solidjs/router";
import { langLink, t } from "~/shared/lang";

export function Settings() {
	return (
		<>
			<h1 class="mb-4 text-2xl">{t()?.settings}</h1>
			<div class="rounded-2xl bg-crust p-4">
				<a href={langLink("login")} class="mb-1 block">
					{t()?.login}
				</a>
				<a href={langLink("register")} class="block">
					{t()?.createAccount}
				</a>
			</div>
			<div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 rounded-2xl bg-crust p-4">
				<A href="/uk/settings" activeClass="underline">
					Українська
				</A>
				<A href="/en/settings" activeClass="underline">
					English
				</A>
			</div>
		</>
	);
}
