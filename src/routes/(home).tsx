import { useTranslation } from "../shared/use-translation";

export function Home() {
	const { t } = useTranslation();
	return <>{t()?.mood}</>;
}
