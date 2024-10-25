import { A } from "@solidjs/router";
import { langLink, t } from "../shared/lang";
import { CalendarIcon } from "./icons/calendar";
import { ChartIcon } from "./icons/chart";
import { FaceContentIcon } from "./icons/face-content";
import { PlusIcon } from "./icons/plus";
import { SettingsIcon } from "./icons/settings";

export function Nav() {
	return (
		<nav class="-translate-x-1/2 fixed bottom-0 left-1/2 h-nav w-full bg-base px-4">
			<ul class="flex justify-between">
				<li class="flex">
					<A
						activeClass="text-text"
						inactiveClass="text-subtext0"
						href={langLink("calendar")}
						class="rounded-full p-2 text-xs"
						aria-label={t()?.calendar}
					>
						<CalendarIcon class="m-auto h-8" />
					</A>
				</li>
				<li class="flex">
					<A
						activeClass="text-text"
						inactiveClass="text-subtext0"
						href={langLink("emotions")}
						class="rounded-full p-2 text-xs"
						aria-label={t()?.emotions}
					>
						<FaceContentIcon class="m-auto h-8" />
					</A>
				</li>
				<li class="flex">
					<a
						href={langLink("add-event")}
						class="-translate-y-2 flex size-12 scale-120 items-center justify-center rounded-full bg-mauve"
					>
						<PlusIcon class="w-[50%] text-base" />
					</a>
				</li>
				<li class="flex">
					<A
						activeClass="text-text"
						inactiveClass="text-subtext0"
						href={langLink("insights")}
						class="rounded-full p-2 text-xs"
						aria-label={t()?.insights}
					>
						<ChartIcon class="m-auto h-8" />
					</A>
				</li>
				<li class="flex">
					<A
						activeClass="text-text"
						inactiveClass="text-subtext0"
						href={langLink("settings")}
						class="rounded-full p-2 text-xs"
						aria-label={t()?.settings}
					>
						<SettingsIcon class="m-auto h-8" />
					</A>
				</li>
			</ul>
		</nav>
	);
}
