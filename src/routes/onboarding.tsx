import { type RouteSectionProps, useNavigate } from "@solidjs/router";
import { Match, Switch } from "solid-js";
import { createGuest } from "~/features/auth/guest";
import { langLink, t } from "~/shared/lang";

export function Onboarding(props: RouteSectionProps) {
	const step = () => props.location.query.step;
	const navigate = useNavigate();
	return (
		<Switch>
			<Match when={step() === "1" || !step()}>
				<h1 class="mb-4 text-3xl">{t()?.selectLanguage}</h1>
				<div class="grid gap-2">
					<a href="/en/onboarding?step=2">English</a>
					<a href="/uk/onboarding?step=2">Українська</a>
				</div>
			</Match>
			<Match when={step() === "2"}>
				<h1 class="mb-4 text-3xl">{t()?.loginOrCreateAccount}</h1>
				<div class="relative grid gap-2 [&>*]:rounded [&>*]:bg-crust [&>*]:p-2 [&>*]:after:absolute [&>*]:after:right-4 [&>*]:after:content-['>']">
					<a href={langLink("login")}>{t()?.login}</a>
					<a href={langLink("register")}>{t()?.createAccount}</a>
					<button
						type="button"
						class="text-left"
						onClick={async () => {
							await createGuest();
							navigate(langLink("/"));
						}}
					>
						{t()?.continueAsGuest}
					</button>
				</div>
				<p class="mt-4 text-sm">{t()?.loginInfo}</p>
			</Match>
		</Switch>
	);
}
