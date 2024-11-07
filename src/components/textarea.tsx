import { type Accessor, type ComponentProps, Show, splitProps } from "solid-js";
import { cn } from "~/shared/cn";

interface TextareaProps extends ComponentProps<"textarea"> {
	label?: string;
	labelClass?: string;
	name: string;
	error?: Accessor<string | null | undefined>;
}

export function Textarea(props: TextareaProps) {
	const [local, textareaProps] = splitProps(props, [
		"label",
		"labelClass",
		"error",
	]);
	return (
		<label class={cn("grid", local.labelClass)}>
			{local.label}
			<textarea
				{...textareaProps}
				aria-invalid={!!local.error?.()}
				aria-errormessage={`${textareaProps.name}-error`}
				class={cn(
					"rounded border border-border bg-background px-2 py-1 text-text hover:border-primary disabled:cursor-not-allowed",
					textareaProps.class,
				)}
			>
				{textareaProps.value}
			</textarea>
			<Show when={local.error?.()}>
				{(error) => (
					<em id={`${textareaProps.name}-error`} class="text-error">
						{error()}
					</em>
				)}
			</Show>
		</label>
	);
}
