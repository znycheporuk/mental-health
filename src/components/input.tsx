import { type Accessor, type ComponentProps, Show, splitProps } from "solid-js";
import { cn } from "~/shared/cn";

interface InputProps extends ComponentProps<"input"> {
	label?: string;
	labelClass?: string;
	name: string;
	error?: Accessor<string | null | undefined>;
}

export function Input(props: InputProps) {
	const [local, inputProps] = splitProps(props, [
		"label",
		"labelClass",
		"error",
	]);
	return (
		<label class={cn("grid", local.labelClass)}>
			{local.label}
			<input
				{...inputProps}
				aria-invalid={!!local.error?.()}
				aria-errormessage={`${inputProps.name}-error`}
				class={cn(
					"h-8 rounded border bg-base px-2 text-text hover:border-teal disabled:cursor-not-allowed",
					inputProps.class,
				)}
			/>
			<Show when={local.error?.()}>
				{(error) => (
					<em id={`${inputProps.name}-error`} class="text-red">
						{error()}
					</em>
				)}
			</Show>
		</label>
	);
}
