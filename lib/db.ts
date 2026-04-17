import { readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function readData<T>(filename: string): Promise<T> {
  const filepath = path.join(DATA_DIR, filename);
  const raw = await readFile(filepath, "utf-8");
  return JSON.parse(raw) as T;
}

export async function writeData<T>(filename: string, data: T): Promise<void> {
  const filepath = path.join(DATA_DIR, filename);
  await writeFile(filepath, JSON.stringify(data, null, 2), "utf-8");
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
