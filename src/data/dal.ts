import { createResource } from "solid-js";
import { storage } from "./storage";

export const [rawEmotions, { mutate }] = createResource(() =>
	storage.emotions.getAll(),
);
