import { useLocation, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import { user } from "~/data/dal";
import { langLink } from "~/shared/lang";

export function useOnboardingRedirect() {
	const location = useLocation();
	const navigate = useNavigate();

	createEffect(() => {
		if (user()) return;
		if (
			!location.pathname.includes("onboarding") ||
			!location.pathname.includes("login") ||
			!location.pathname.includes("register")
		) {
			navigate(langLink("onboarding"));
		}
	});
}
