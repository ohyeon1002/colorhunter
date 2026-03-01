import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

// 1. Color Enum 정의 (제공해주신 22개 색상 코드)
export const colorEnum = pgEnum("color", [
  "#e6194b",
  "#3cb44b",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#46f0f0",
  "#f032e6",
  "#bcf60c",
  "#fabebe",
  "#008080",
  "#e6beff",
  "#9a6324",
  "#fffac8",
  "#800000",
  "#aaffc3",
  "#808000",
  "#ffd8b1",
  "#000075",
  "#808080",
  "#ffffff",
  "#000000",
]);

// 1. Users 테이블 (NextAuth 컨벤션 반영)
export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  // NextAuth 기본 필드
  name: text("name").notNull(), // nickname 대신 name 사용
  email: text("email").notNull().unique(),
  image: text("image"), // pfp 대신 image 사용

  // 커스텀 필드
  password: text("password"), // Credentials 로그인용
  country: text("country"),
  city: text("city"),

  // 관리용 필드
  isDeactivated: boolean("is_deactivated").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. Photos 테이블
export const photos = pgTable("photos", {
  publicId: text("public_id").primaryKey(),
  url: text("url").notNull(),
  color: colorEnum("color").notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

// 3. Daily Colors 테이블
export const dailyColors = pgTable("daily_colors", {
  date: text("date").primaryKey(), // "2026-02-08"
  color: colorEnum("color").notNull(),
});

// 4. Relations 설정
export const usersRelations = relations(users, ({ many }) => ({
  photos: many(photos),
}));

export const photosRelations = relations(photos, ({ one }) => ({
  author: one(users, {
    fields: [photos.userId],
    references: [users.id],
  }),
}));
