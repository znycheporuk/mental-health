import { ulid } from "ulid";
import type { OnlyRequire } from "../shared/types";

export type User = {
	id: string;
	username: string;
	password: string;
	email?: string;
	salt: string;
	createdAt: string;
	updatedAt: string;
};

export type Emotion = {
	id: string;
	userId: string;
	name: string;
	icon: string;
	hidden?: boolean;
	createdAt: string;
	updatedAt: string;
};

export type EmotionLevel = {
	eventId: string;
	emotionId: string;
	level: number;
	createdAt: string;
	updatedAt: string;
};

export type Event = {
	id: string;
	userId: string;
	description: string;
	notes: string;
	createdAt: string;
	updatedAt: string;
};

const openRequest = indexedDB.open("mental-health-db", 1);
openRequest.onerror = () => {
	console.error("Error opening indexedDB");
};

let db: IDBDatabase | null = null;

openRequest.onupgradeneeded = () => {
	const db = openRequest.result;
	db.createObjectStore("users", { keyPath: "id" }).createIndex(
		"createdAt",
		"createdAt",
	);
	db.createObjectStore("emotions", { keyPath: "id" }).createIndex(
		"createdAt",
		"createdAt",
	);
	db.createObjectStore("emotionLevels", {
		keyPath: ["eventId", "emotionId"],
	}).createIndex("createdAt", "createdAt");
	db.createObjectStore("events", { keyPath: "id" }).createIndex(
		"createdAt",
		"createdAt",
	);
};

openRequest.onsuccess = () => {
	db = openRequest.result;
};

function getDb(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		if (db) {
			resolve(db);
		} else {
			openRequest.onsuccess = () => {
				db = openRequest.result;
				resolve(db);
			};
			openRequest.onerror = () => {
				reject(openRequest.error);
			};
		}
	});
}

function createStorage<
	T extends User | Emotion | EmotionLevel | Event,
	P extends string | string[] = string | string[],
>(storeName: string, keyPath: P) {
	return {
		async getAll(): Promise<T[]> {
			const db = await getDb();
			return new Promise((resolve, reject) => {
				const tx = db.transaction(storeName, "readonly");
				const store = tx.objectStore(storeName);
				const request = store.getAll();
				request.onsuccess = () => {
					resolve(request.result);
				};
				request.onerror = () => {
					reject(request.error);
				};
			});
		},
		async get(key: string | string[]): Promise<T> {
			const db = await getDb();
			return new Promise((resolve, reject) => {
				const tx = db.transaction(storeName, "readonly");
				const store = tx.objectStore(storeName);
				const request = store.get(key);
				request.onsuccess = () => {
					resolve(request.result);
				};
				request.onerror = () => {
					reject(request.error);
				};
			});
		},
		async add(item: Omit<T, "id" | "createdAt" | "updatedAt">) {
			const db = await getDb();
			return new Promise<void>((resolve, reject) => {
				const tx = db.transaction(storeName, "readwrite");
				const store = tx.objectStore(storeName);
				const request = store.add({
					...item,
					id: keyPath === "id" ? ulid() : undefined,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				});
				request.onsuccess = () => {
					resolve();
				};
				request.onerror = () => {
					reject(request.error);
				};
			});
		},
		async update(
			item: T extends EmotionLevel
				? OnlyRequire<T, "eventId" | "emotionId">
				: // @ts-expect-error
					OnlyRequire<T, "id">,
		) {
			const db = await getDb();
			return new Promise<void>((resolve, reject) => {
				const tx = db.transaction(storeName, "readwrite");
				const store = tx.objectStore(storeName);

				const key = Array.isArray(keyPath)
					? // @ts-expect-error
						keyPath.map((k) => item[k])
					: // @ts-expect-error
						item.id;
				store.get(key).onsuccess = (event) => {
					// @ts-expect-error
					const existing = event.target.result;
					if (!existing) {
						reject(new Error(`${storeName} not found`));
						return;
					}
					const request = store.put({
						...existing,
						...item,
						updatedAt: new Date().toISOString(),
					});
					request.onsuccess = () => {
						resolve();
					};
					request.onerror = () => {
						reject(request.error);
					};
				};
			});
		},
		/** id or [eventId, emotionId] */
		async remove(key: string | string[]) {
			const db = await getDb();
			return new Promise<void>((resolve, reject) => {
				const tx = db.transaction(storeName, "readwrite");
				const store = tx.objectStore(storeName);
				const request = store.delete(key);
				request.onsuccess = () => {
					resolve();
				};
				request.onerror = () => {
					reject(request.error);
				};
			});
		},
	};
}

export const storage = {
	users: createStorage<User>("users", "id"),
	emotions: createStorage<Emotion>("emotions", "id"),
	emotionLevels: createStorage<EmotionLevel>("emotionLevels", [
		"eventId",
		"emotionId",
	]),
	events: createStorage<Event>("events", "id"),
};
