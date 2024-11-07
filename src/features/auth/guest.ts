import { ulid } from "ulid";
import { storage } from "~/data/storage";
import { t } from "~/shared/lang";

export async function createGuest() {
	const now = new Date().toISOString();
	const id = ulid();
	await storage.users.put({
		id,
		isActive: true,
		createdAt: now,
		updatedAt: now,
	});
	await initializeEmotions(id);
}

async function initializeEmotions(userId: string) {
	const emoji = {
		anger: "😡",
		curiosity: "🤔",
		joy: "😄",
		surprise: "😲",
		sadness: "😢",
		shame: "😳",
		disgust: "🤮",
		fear: "😱",
		guilt: "😔",
	};

	const now = new Date().toISOString();
	await Promise.all(
		Object.entries(emoji).map(async ([key, icon]) => {
			await storage.emotions.put({
				id: ulid(),
				userId,
				name: t()?.defaultEmotions[key as keyof typeof emoji] ?? key,
				icon,
				createdAt: now,
				updatedAt: now,
			});
		}),
	);
}
