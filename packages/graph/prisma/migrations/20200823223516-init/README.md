# Migration `20200823223516-init`

This migration has been generated at 8/23/2020, 4:35:16 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Item" ADD COLUMN     "orderId" INTEGER

ALTER TABLE "Note" ADD COLUMN     "orderId" INTEGER

CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "shipping" INTEGER NOT NULL
)

CREATE TABLE "OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200823222412-init..20200823223516-init
--- datamodel.dml
+++ datamodel.dml
@@ -2,10 +2,11 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource sqlite {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
+
 generator client {
   provider = "prisma-client-js"
 }
@@ -17,39 +18,74 @@
   published Boolean  @default(false)
   User      User     @relation(fields: [authorId], references: [id])
   authorId  Int
 }
+
 model Profile {
   id     Int     @default(autoincrement()) @id
   bio    String?
   User   User    @relation(fields: [userId], references: [id])
   userId Int     @unique
 }
+
 model User {
   id      Int      @default(autoincrement()) @id
   email   String   @unique
   name    String?
   Post    Post[]
   Profile Profile?
+  Image   Image?   @relation(fields: [imageId], references: [id])
+  imageId Int?
 }
-model ItemCategory{
-  id    Int @default(autoincrement()) @id
-  name  String
+
+model ItemCategory {
+  id   Int    @default(autoincrement()) @id
+  name String
 }
-model Item{
-  id          Int  @default(autoincrement()) @id 
+
+model Item {
+  id          Int          @default(autoincrement()) @id
   name        String
   price       Int
   description String?
+  Note        Note?        @relation(fields: [noteId], references: [id])
+  noteId      Int?
+  Order       Order?       @relation(fields: [orderId], references: [id])
+  orderId     Int?
+  OrderItem  OrderItem[]
 }
-model Note{
-  id          Int  @default(autoincrement()) @id 
+
+model Note {
+  id          Int     @default(autoincrement()) @id
   description String?
   item        Item[]
+  Order       Order?  @relation(fields: [orderId], references: [id])
+  orderId     Int?
 }
-model Image{
-  id          Int  @default(autoincrement()) @id 
+
+model Image {
+  id          Int     @default(autoincrement()) @id
   name        String?
   description String?
   url         String
-  user        User[] 
-}
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
+  OrderItem     OrderItem[]
+}
+
+model OrderItem {
+  id      Int   @default(autoincrement()) @id
+  Item    Item  @relation(fields: [itemId], references: [id])
+  itemId  Int
+  Order   Order @relation(fields: [orderId], references: [id])
+  orderId Int
+}
```


