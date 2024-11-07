export type User = {
	id: string;
	username?: string;
	isActive?: boolean;
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
	db.createObjectStore("users", { keyPath: "id" });
	db.createObjectStore("emotions", { keyPath: "id" }).createIndex(
		"userId",
		"userId",
	);
	db.createObjectStore("emotionLevels", { keyPath: ["eventId", "emotionId"] });
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

function createStorage<T extends User | Emotion | EmotionLevel | Event>(
	storeName: string,
) {
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
		async put(item: T) {
			const db = await getDb();
			return new Promise<void>((resolve, reject) => {
				const tx = db.transaction(storeName, "readwrite");
				const store = tx.objectStore(storeName);
				const request = store.put(item);
				request.onsuccess = () => {
					resolve();
				};
				request.onerror = () => {
					reject(request.error);
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
	users: createStorage<User>("users"),
	emotions: createStorage<Emotion>("emotions"),
	emotionLevels: createStorage<EmotionLevel>("emotionLevels"),
	events: createStorage<Event>("events"),
};
