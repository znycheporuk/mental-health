import { createResource } from "solid-js";
import { storage } from "./storage";

export const [user] = createResource(() => storage.users.getAll());

export const [emotions, { mutate }] = createResource(() =>
	storage.emotions.getAll(),
);
