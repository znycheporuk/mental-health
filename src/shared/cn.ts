export const cn = (...args: (string | number | boolean | null | undefined)[]) =>
	args.filter(Boolean).join(" ");
