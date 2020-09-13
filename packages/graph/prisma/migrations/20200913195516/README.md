# Migration `20200913195516`

This migration has been generated at 9/13/2020, 1:55:16 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Brand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL
)

CREATE TABLE "Courier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT,
    "name" TEXT
)

CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bio" TEXT,
    "userId" INTEGER NOT NULL,

FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "name" TEXT,
    "imageId" INTEGER,

FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "ItemCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
)

CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemCategoryId" INTEGER,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "noteId" INTEGER,
    "orderId" INTEGER,
    "keyCapId" INTEGER,

FOREIGN KEY ("itemCategoryId") REFERENCES "ItemCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY ("keyCapId") REFERENCES "KeyCap"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "KeyCap" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brandId" INTEGER,
    "name" TEXT NOT NULL,
    "keyCapProfileId" INTEGER,
    "itemCategoryId" INTEGER,

FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY ("keyCapProfileId") REFERENCES "KeyCapProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY ("itemCategoryId") REFERENCES "ItemCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "KeyCapProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "brandId" INTEGER,

FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT,
    "orderId" INTEGER,

FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT,
    "url" TEXT NOT NULL
)

CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "shipping" INTEGER NOT NULL,
    "userId" INTEGER,

FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE UNIQUE INDEX "Courier.name_unique" ON "Courier"("name")

CREATE UNIQUE INDEX "Profile.userId_unique" ON "Profile"("userId")

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200913195516
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,137 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource sqlite {
+  provider = "sqlite"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Brand {
+  id            Int             @default(autoincrement()) @id
+  name          String
+  logo          String
+  KeyCapProfile KeyCapProfile[]
+  KeyCap        KeyCap[]
+}
+
+model Courier {
+  id   Int     @default(autoincrement()) @id
+  code String?
+  name String? @unique
+}
+
+model Post {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  title     String
+  content   String?
+  published Boolean  @default(false)
+  User      User     @relation(fields: [authorId], references: [id])
+  authorId  Int
+}
+
+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  User   User    @relation(fields: [userId], references: [id])
+  userId Int     @unique
+}
+
+model User {
+  id       Int      @default(autoincrement()) @id
+  email    String   @unique
+  password String   @default("")
+  name     String?
+  Post     Post[]
+  Profile  Profile?
+  Image    Image?   @relation(fields: [imageId], references: [id])
+  imageId  Int?
+  Order    Order[]
+}
+
+model ItemCategory {
+  id     Int      @default(autoincrement()) @id
+  name   String
+  Item   Item[]
+  KeyCap KeyCap[]
+}
+
+model Item {
+  id             Int           @default(autoincrement()) @id
+  ItemCategory   ItemCategory? @relation(fields: [itemCategoryId], references: [id])
+  itemCategoryId Int?
+  name           String
+  price          Int
+  description    String?
+  Note           Note?         @relation(fields: [noteId], references: [id])
+  noteId         Int?
+  Order          Order?        @relation(fields: [orderId], references: [id])
+  orderId        Int?
+  OrderItem      OrderItem[]
+  KeyCap         KeyCap?       @relation(fields: [keyCapId], references: [id])
+  keyCapId       Int?
+}
+
+model KeyCap {
+  id              Int            @default(autoincrement()) @id
+  Brand           Brand?         @relation(fields: [brandId], references: [id])
+  brandId         Int?
+  name            String
+  KeyCapProfile   KeyCapProfile? @relation(fields: [keyCapProfileId], references: [id])
+  keyCapProfileId Int?
+  ItemCategory    ItemCategory?  @relation(fields: [itemCategoryId], references: [id])
+  itemCategoryId  Int?
+  Item            Item[]
+}
+
+model KeyCapProfile {
+  id      Int      @default(autoincrement()) @id
+  name    String
+  KeyCap  KeyCap[]
+  Brand   Brand?   @relation(fields: [brandId], references: [id])
+  brandId Int?
+}
+
+model Note {
+  id          Int     @default(autoincrement()) @id
+  description String?
+  item        Item[]
+  Order       Order?  @relation(fields: [orderId], references: [id])
+  orderId     Int?
+}
+
+model Image {
+  id          Int     @default(autoincrement()) @id
+  name        String?
+  description String?
+  url         String
+  user        User[]
+}
+
+model Order {
+  id             Int         @default(autoincrement()) @id
+  name           String
+  items          Item[]
+  notes          Note[]
+  trackingNumber String
+  qty            Int
+  tax            Int
+  shipping       Int
+  OrderItem      OrderItem[]
+  User           User?       @relation(fields: [userId], references: [id])
+  userId         Int?
+}
+
+model OrderItem {
+  id      Int   @default(autoincrement()) @id
+  Item    Item  @relation(fields: [itemId], references: [id])
+  itemId  Int
+  Order   Order @relation(fields: [orderId], references: [id])
+  orderId Int
+}
+
+
```


