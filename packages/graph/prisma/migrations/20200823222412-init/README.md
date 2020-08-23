# Migration `20200823222412-init`

This migration has been generated at 8/23/2020, 4:24:12 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "User" ADD COLUMN     "imageId" INTEGER

CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "noteId" INTEGER,

FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT
)

CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT,
    "url" TEXT NOT NULL
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200823215123-init..20200823222412-init
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource sqlite {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
@@ -33,5 +33,23 @@
 }
 model ItemCategory{
   id    Int @default(autoincrement()) @id
   name  String
+}
+model Item{
+  id          Int  @default(autoincrement()) @id 
+  name        String
+  price       Int
+  description String?
+}
+model Note{
+  id          Int  @default(autoincrement()) @id 
+  description String?
+  item        Item[]
+}
+model Image{
+  id          Int  @default(autoincrement()) @id 
+  name        String?
+  description String?
+  url         String
+  user        User[] 
 }
```


