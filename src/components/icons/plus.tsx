export function PlusIcon(props: { class?: string }) {
	return (
		<svg class={props.class} fill="none" viewBox="0 0 24 24">
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="3"
				d="M12 5V19M5 12H19"
			/>
		</svg>
	);
}
