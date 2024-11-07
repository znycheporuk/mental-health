import { For, Match, Show, Switch, createSignal } from "solid-js";
import { Checkbox } from "~/components/checkbox";
import { DeleteIcon } from "~/components/icons/delete";
import { EditIcon } from "~/components/icons/edit";
import { Input } from "~/components/input";
import { emotions } from "~/data/dal";
import { cn } from "~/shared/cn";
import { t } from "~/shared/lang";

export function Emotions() {
	const [isAddOpened, setIsAddOpened] = createSignal(false);
	const [editedEmotion, setEditedEmotion] = createSignal<null | string>(null);
	const [showHidden, setShowHidden] = createSignal(false);
	const hasHidden = () => emotions()?.some((emotion) => emotion.hidden);

	// createEffect(() => {
	// 	submission.result && setIsAddOpened(false);
	// 	submission.result && setEditedEmotion(null);
	// });

	return (
		<>
			<h1 class="mb-4 text-3xl">{t()?.emotions}</h1>
			<Show when={hasHidden()}>
				<Checkbox
					name="showHidden"
					label={t()?.showHidden.toLowerCase()}
					labelClass="h-8 mb-2"
					class="text accent-teal"
					onChange={(e) => setShowHidden(e.target.checked)}
				/>
			</Show>
			<ul class="mt-2 grid gap-4">
				<For each={emotions()}>
					{(emotion) => (
						<Switch>
							<Match when={editedEmotion() === emotion.id}>
								<form
									method="post"
									class="grid gap-2 rounded border border-overlay0 p-2"
								>
									<input name="id" value={emotion.id} hidden />
									<Input
										name="icon"
										label={t()?.icon}
										// error={() => submission.error?.validation?.icon}
										value={emotion.icon}
									/>
									<Input
										name="name"
										label={t()?.name}
										// error={() => submission.error?.validation?.name}
										value={emotion.name}
									/>
									<div class="flex gap-2">
										<button
											type="button"
											class="w-fit rounded border border-overlay0 px-4 py-2 font-bold text-text"
											onClick={() => setEditedEmotion(null)}
										>
											{t()?.cancel}
										</button>
										<button
											type="submit"
											class="w-fit rounded bg-peach px-4 py-2 font-bold text-base"
										>
											{t()?.save}
										</button>
									</div>
								</form>
							</Match>
							<Match when={editedEmotion() !== emotion.id}>
								<li
									class={cn(
										"flex items-center gap-2 rounded-lg border border-overlay0 p-2",
										!showHidden() && emotion.hidden && "hidden",
									)}
								>
									<span class="text-3xl">{emotion.icon}</span>
									<span class="text-xl">{emotion.name}</span>
									{emotion.hidden ? (
										<form method="post" class="ml-auto">
											<button
												type="submit"
												class="rounded border border-overlay0 p-2 font-bold text-text"
												name="id"
												value={emotion.id.toString()}
											>
												{t()?.restore}
											</button>
										</form>
									) : (
										<>
											<button
												type="button"
												class="ml-auto rounded-full p-2 font-bold text-text"
												onClick={() => setEditedEmotion(emotion.id)}
											>
												<EditIcon class="size-6" />
											</button>
											<form method="post">
												<button
													type="submit"
													class="rounded-full p-2 font-bold text-red"
													name="id"
													value={emotion.id.toString()}
												>
													<DeleteIcon class="size-6" />
												</button>
											</form>
										</>
									)}
								</li>
							</Match>
						</Switch>
					)}
				</For>
				<li>
					<Show
						when={isAddOpened()}
						fallback={
							<button
								type="button"
								class="rounded bg-teal px-4 py-2 font-bold text-base"
								onClick={() => setIsAddOpened(true)}
							>
								{t()?.add}
							</button>
						}
					>
						<form
							// action={addEmotion}
							method="post"
							class="grid gap-2 rounded border border-overlay0 p-2"
						>
							<Input
								name="icon"
								label={t()?.icon}
								// error={() => submission.error?.validation?.icon}
							/>
							<Input
								name="name"
								label={t()?.name}
								// error={() => submission.error?.validation?.name}
							/>
							<div class="flex gap-2">
								<button
									type="button"
									class="w-fit rounded border border-overlay0 px-4 py-2 font-bold text-text"
									onClick={() => setIsAddOpened(false)}
								>
									{t()?.cancel}
								</button>
								<button
									type="submit"
									class="w-fit rounded bg-peach px-4 py-2 font-bold text-base"
								>
									{t()?.add}
								</button>
							</div>
						</form>
					</Show>
				</li>
			</ul>
		</>
	);
}
