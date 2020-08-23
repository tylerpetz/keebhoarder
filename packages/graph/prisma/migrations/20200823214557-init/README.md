# Migration `20200823214557-init`

This migration has been generated at 8/23/2020, 3:45:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
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
    "name" TEXT
)

CREATE UNIQUE INDEX "Profile.userId_unique" ON "Profile"("userId")

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

PRAGMA foreign_keys=off;
DROP TABLE "untitled_table_2";
PRAGMA foreign_keys=on

PRAGMA foreign_keys=off;
DROP TABLE "user";
PRAGMA foreign_keys=on
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200823214557-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,33 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource sqlite {
+  provider = "sqlite"
+  url = "***"
+}
+generator client {
+  provider = "prisma-client-js"
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
+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  User   User    @relation(fields: [userId], references: [id])
+  userId Int     @unique
+}
+model User {
+  id      Int      @default(autoincrement()) @id
+  email   String   @unique
+  name    String?
+  Post    Post[]
+  Profile Profile?
+}
```


