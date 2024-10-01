import { createSignal } from "solid-js";

export function App() {
	const [count, setCount] = createSignal(0);

	return (
		<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100">
			<div class="rounded-lg bg-white p-6 shadow-lg">
				<h1 class="mb-4 font-bold text-2xl">Counter</h1>
				<div class="mb-4 font-semibold text-4xl">{count()}</div>
				<div class="flex space-x-4">
					<button
						type="button"
						class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						onClick={() => setCount(count() + 1)}
					>
						Increment
					</button>
					<button
						type="button"
						class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
						onClick={() => setCount(count() - 1)}
					>
						Decrement
					</button>
				</div>
			</div>
		</div>
	);
}
