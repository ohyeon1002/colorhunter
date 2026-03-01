import { drizzle } from "drizzle-orm/postgres-js";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error(".env 설정 재고 요망");
export const db = drizzle(DATABASE_URL);
