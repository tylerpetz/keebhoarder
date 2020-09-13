# Migration `20200827011228`

This migration has been generated at 8/26/2020, 7:12:28 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Courier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT,
    "name" TEXT
)

CREATE UNIQUE INDEX "Courier.name_unique" ON "Courier"("name")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200827011228
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,100 @@
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
+model Courier {
+  id   Int      @default(autoincrement()) @id
+  code String?
+  name String?      @unique
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
+  id      Int      @default(autoincrement()) @id
+  email   String   @unique
+  name    String?
+  Post    Post[]
+  Profile Profile?
+  Image   Image?   @relation(fields: [imageId], references: [id])
+  imageId Int?
+}
+
+model ItemCategory {
+  id   Int    @default(autoincrement()) @id
+  name String
+}
+
+model Item {
+  id          Int          @default(autoincrement()) @id
+  name        String
+  price       Int
+  description String?
+  Note        Note?        @relation(fields: [noteId], references: [id])
+  noteId      Int?
+  Order       Order?       @relation(fields: [orderId], references: [id])
+  orderId     Int?
+  OrderItem  OrderItem[]
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
+  id             Int          @default(autoincrement()) @id
+  name           String
+  items          Item[]
+  notes          Note[]
+  trackingNumber String
+  qty            Int
+  tax            Int
+  shipping       Int
+  OrderItem      OrderItem[]
+  User           User?  @relation(fields: [userId], references: [id])
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
```


