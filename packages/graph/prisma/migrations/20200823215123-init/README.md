# Migration `20200823215123-init`

This migration has been generated at 8/23/2020, 3:51:23 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "ItemCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200823214557-init..20200823215123-init
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
@@ -29,5 +29,9 @@
   email   String   @unique
   name    String?
   Post    Post[]
   Profile Profile?
+}
+model ItemCategory{
+  id    Int @default(autoincrement()) @id
+  name  String
 }
```


